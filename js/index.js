/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        console.log('[initialize]');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('[bindEvents]');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('[onDeviceReady]');
        app.receivedEvent('deviceready');
    },

    /*
    // bind events
    */

    receivedEvent: function(id) {
        console.log('[receivedEvent: ' +  id + ']');




        // redirect to login page
        $("#loginForm").on("submit",this.handleLogin);
        jQuery.mobile.changePage('#loginPage');

        /* route cups */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#routeCupsRoutesPage", app.routeCupsRoutesAttachClickListner);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCupsRoutesPage", app.fetchRouteCupsRoutes);

        // bind the "on vclick" event listner only once during initial page 
        $(document).on("pagecreate", "#routeCupsMachinesPage", app.routeCupsMachinesAttachClickListner);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCupsMachinesPage", app.fetchRouteCupsMachines);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCupsMachinesPage", app.fetchRouteCupsMachinesBreadcrumbs);



    },

    /*
    // json helpers
    */

    "servers": {
        "query": function (url, type, data, callback) { console.log("[query "+url+"]");
            $.ajax(url, {
                "type": type,
                "dataType": "json",
                "data": data,
                "contentType": (type==="GET" ? "application/json" : "application/x-www-form-urlencoded"),
                "success": callback,
                "beforeSend": function(){
                    // display spinner during ajax call
                    // have to wrap it in setInterval for it to work
                    /*
                    var interval = setInterval(function(){
                        $.mobile.loading('show');
                        clearInterval(interval);
                    },1);   
                    */
                },
                "complete": function(){
                    /*
                    var interval = setInterval(function(){
                        $.mobile.loading('hide');
                        clearInterval(interval);
                    },1);   
                    */
                },
                "error": function (request, status, error) {
                    console.log("[ajax error:" + request.responseText + "]");
                }
            });
        },
        "public": {
            "URL":  "http://u-vend.dayawebdevelopment.com/app/",
            // perform unauthenticated query
            "query": function (action, data, callback) { console.log("[public.query]");
                app.servers.query(app.servers.public.URL+action, "GET", data, callback);
            }
        },
        "private": {
            "URL": "http://u-vend.dayawebdevelopment.com/app/",
            // perform authenticated query
            "query": function (action, data, callback) { console.log("[private.query]");
                if (!localStorage || !localStorage.getItem("token_public") || !localStorage.getItem("token_private")) {
                    console.log("can't do private query: empty private/public tokens!");
                    return;
                }
                // used as seed for hashing the private token
                var timestamp = Math.round(+new Date()/1000);
                app.servers.query(app.servers.private.URL+action, "POST", {
                        "timestamp": timestamp,
                        "token_public": localStorage.getItem("token_public"),
                        //"hash": sha1(timestamp+localStorage.getItem("token_private")),
                        "hash": sha1(localStorage.getItem("token_private")),
                        "data": data
                }, callback);
            }
        }
    },

    /*
    // login stuff
    */

    handleLogin: function() {

        console.log('[handlLogin]');

        var form = $("#loginForm");    
        //disable the button so we can't resubmit while we wait
        $("#submitButton",form).button("disable");
        var e = $("#email", form).val();
        var p = $("#password", form).val();

        console.log("[Sending email and password.]");

        app.servers.public.query("login", {
            "email":e,
            "password":p
        }, app.callbacks.handleLogin, true);   

        return false;
    },
    logout: function() {
        
        console.log("[logout]");

        if (localStorage) {
            //console.log("[Public key before clearning localStorage:" + localStorage.getItem("token_public") + "]");
            localStorage.clear();
            //console.log("[Public key after clearning localStorage:" + localStorage.getItem("token_public") + "]");
        }

        console.log("[Redirecting to login.]");
        jQuery.mobile.changePage('#loginPage');

    },

    /*
    // bound to events - any function that starts with "fetch" does an ajax call and has at least one callback
    */

    fetchRouteCupsRoutes: function() {
        
        console.log("[fetchRouteCupsRoutes]");


        app.servers.private.query('routes', {}, app.callbacks.fetchRouteCupsRoutes);

    },
    routeCupsRoutesAttachClickListner: function() {

        console.log("[routeCupsRoutesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#routeCupsRoutesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["routeCupsRouteId"] = this.id;

            // redirect
            console.log("[routeCupsRoutesList forwarding to routeCupsMachinesPage]");
            $.mobile.changePage("#routeCupsMachinesPage", {transition: "pop"});
        });

    },

    fetchRouteCupsMachines: function() {
        
        console.log("[fetchRouteCupsMachines]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");

        app.servers.private.query('routecupsmachines', {routeId:routeCupsRouteId}, app.callbacks.fetchRouteCupsMachines);

    },
    fetchRouteCupsMachinesBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchRouteCupsMachinesBreadcrumbs]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");

        app.servers.private.query('routeinfo', {routeId:routeCupsRouteId}, app.callbacks.fetchRouteCupsMachinesBreadcrumbs);

    },

    routeCupsMachinesAttachClickListner: function() {

        console.log("[routeCupsMachinesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#routeCupsMachinesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["routeCupsMachineId"] = this.id;

            // redirect
            console.log("[routeCupsMachinesList forwarding to routeCupsFlavorsPage]");
            $.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
        });

    },



    /*
    //  json callbacks 
    */

    "callbacks": {
        "handleLogin": function(r) {
            console.log("[handleLogin callback");
            console.log("[" + r.token_public + "]");
            if(r && r.code && r.code === "SUCCESS" && r.token_private && r.token_public) {
                console.log("[Login succeeded.]");
                //store
                localStorage["token_private"] = r.token_private;
                localStorage["token_public"] = r.token_public;
                // redirect brands
                console.log("[Redirecting to home.]");
                $("#submitButton").button("enable");
                jQuery.mobile.changePage('#homePage');
                // clear the form
                $("#loginForm")[0].reset();    

            } else {
                console.log("[handleLogin - Login failed.]");
                $("#submitButton").button("enable");
                $("#password").val('');

                $('#modalDialogMessage').html('Incorrect login.');
                $('#modalDialogRedirect').attr('href','#loginPage');
                $('#modalDialog').popup("open");

                return;
            }
        },

        "fetchRouteCupsRoutes": function(r) { 

            console.log("[fetchRouteCupsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsRoutes SUCCESS]");

                console.log("[fetchRouteCupsRoutes routes length:" + r.routes.length + "]");

                if (r.routes.length == 0) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;

                    output += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + ' (' +status + ')</a></li>';
                });

                //append list to ul
                $("#routeCupsRoutesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });

            }
            else {
                console.log("[fetchRouteCupsRoutes ERROR]");
                console.log("[fetchRouteCupsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCupsMachines": function(r) { 

            console.log("[fetchRouteCupsMachines callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsMachines SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsMachines redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsMachines redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.routeMachines.length == 0) {
                    $('#modalDialogBackMessage').html("No machines available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                $.each(r.routeMachines, function(index, value){                   

                    var machineId = value.machineId;
                    var type = value.type;
                    var brandName = value.brandName;
                    var flavorQuantityTotal = value.flavorQuantityTotal;

                    output += '<li id="'+ machineId +'"><a href="#routeCupsFlavorsPage">' + type + ' - ' + brandName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                });

                //append list to ul
                $("#routeCupsMachinesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchRouteCupsMachines ERROR]");
                console.log("[fetchRouteCupsMachines message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCupsMachinesBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchRouteCupsMachinesBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsMachinesBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsMachinesBreadcrumbs redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchRouteCupsMachinesBreadcrumbs redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["routeCupsRouteId"] = r.routeId;
                localStorage["routeCupsDate"] = r.date;
                localStorage["routeCupsVanName"] = r.vanName;

                // write breadcrumbs
                $('#routeCupsMachinesDateHeader').html(r.date);
                $('#routeCupsMachinesVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchRouteCupsMachinesBreadcrumbs ERROR]");
                console.log("[fetchRouteCupsMachinesBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },





    }, 



};



