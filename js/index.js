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
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('[receivedEvent: ' +  id + ']');

        // disable 300ms click delay on mobile apps
        $(function() {
            FastClick.attach(document.body);
        });

        jQuery.mobile.changePage('#loginPage');

        $("#loginForm").on("submit",this.handleLogin);

        // populate machine cups totals list view
        $(document).on("pagecreate", "#machineCupsPage", app.fetchMachineCupTotals);

        $(document).on("pagebeforeshow", "#machineFlavorsPage", app.fetchMachineFlavors);

    },

    "servers": {
        "query": function (url, type, data, callback) { console.log("[query "+url+"]");
            $.ajax(url, {
                "type": type,
                "dataType": "json",
                "data": data,
                "contentType": (type==="GET" ? "application/json" : "application/x-www-form-urlencoded"),
                "success": callback,
                "error": function (request, status, error) {
                    console.log("[ajax error:" + request.responseText + "]");
                }
            });
        },
        "public": {
            "URL":  "http://u-vend.dayawebdevelopment.com/app/request",
            // perform unauthenticated query
            "query": function (action, data, callback) { console.log("[public.query]");
                app.servers.query(app.servers.public.URL+action, "GET", data, callback);
            }
        },
        "private": {
            "URL": "http://u-vend.dayawebdevelopment.com/app/request",
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
    handleLogin: function() {

        console.log('[handlLogin]');

        var form = $("#loginForm");    
        //disable the button so we can't resubmit while we wait
        $("#submitButton",form).attr("disabled","disabled");
        var e = $("#email", form).val();
        var p = $("#password", form).val();

        if(e != '' && p!= '') {
            console.log("[Sending email and password.]");

            app.servers.public.query("login", {
                "email":e,
                "password":p
            }, app.callbacks.handleLogin, true);   
        }
        else {
            console.log("[Login failed.]", function() {});
            $("#submitButton").removeAttr("disabled");
        }
        return false;
    },
    logout: function() {
        
        console.log["logout"];

        if (localStorage) {
            //console.log("[Public key before clearning localStorage:" + localStorage.getItem("token_public") + "]");
            localStorage.clear();
            //console.log("[Public key after clearning localStorage:" + localStorage.getItem("token_public") + "]");
        }

        console.log("[Redirecting to login.]");
        jQuery.mobile.changePage('#loginPage');

    },
    fetchBrands: function() {
        
        console.log["fetchBrands"];

        app.servers.private.query('fetchbrands', {}, app.callbacks.fetchBrands);
    },
    fetchMachineCupTotals: function() {
        
        console.log["fetchMachineCupTotals"];

        app.servers.private.query('fetchmachinecuptotals', {}, app.callbacks.fetchMachineCupTotals);
    },
    fetchMachineFlavors: function() {
        
        console.log["fetchMachineFlavors"];

        //populated when the list item was clicked in previous page
        var info = $('#machineFlavorsPage').data("info");
        var mId = info['id'];

        app.servers.private.query('fetchmachineflavors', {machineId:mId}, app.callbacks.fetchMachineFlavors);
    },
    "callbacks": {
        "handleLogin": function(r) {
            console.log("[callback: handleLogin");
            console.log("[" + r.token_public + "]");
            if(r && r.code && r.code === "SUCCESS" && r.token_private && r.token_public) {
                console.log("[Login succeeded.]");
                //store
                localStorage["token_private"] = r.token_private;
                localStorage["token_public"] = r.token_public;
                // redirect brands
                console.log("[Redirecting to home.]");
                $("#submitButton").removeAttr("disabled");
                jQuery.mobile.changePage('#homePage');
                // clear the form
                $("#loginForm")[0].reset();    

            } else {
                console.log("[Login failed.]", function() {});
                $("#submitButton").removeAttr("disabled");
            }
        },
        "fetchBrands": function(r) { 

            console.log("[fetchBrands callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchBrands SUCCESS]");
                $("#brandsDisplay").html( r.brands );
            }
            else {
                console.log("[fetchBrands ERROR]");
                console.log("[fetchBrands message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
        "fetchMachineCupTotals": function(r) { 

            console.log("[fetchMachineCupTotals callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupTotals SUCCESS]");

                var output = '';
                $.each(r.machines, function(index, value){                   

                    var mId = value.machineId;
                    var mType = value.machineType;
                    var mCups = value.machineCupsTotal;

                    output += '<li id="'+ mId +'"><a href="#machineFlavorsPage">' + mType + '-' + mId + '<span class="ui-li-count">' + mCups + '</span></a></li>';
                });

                //append list to ul
                $("#machineCupsPageList").html(output).promise().done(function () {
                    //use a promise() to wait for append to finish 
                    //done() will run after append is done
                    //add the click event for the redirection to happen to #machineFlavorsPage
                    $(this).on("click", "li", function (e) {
                        // override default event action
                        e.preventDefault();
                        //store the information in the next page's data
                        $("#machineFlavorsPage").data("info", { id: this.id });
                        // redirect
                        console.log("[machineCupsPageList forwarding to machineFlavorsPage]");
                        $.mobile.changePage("#machineFlavorsPage");
                    });

                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchMachineCupTotals ERROR]");
                console.log("[fetchMachineCupTotals message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
        "fetchMachineFlavors": function(r) { 

            console.log("[fetchMachineFlavors callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineFlavors SUCCESS]");

                var output = '';
                $.each(r.machineFlavors, function(index, value){                   

                    var mId = value.machineId;
                    var mfId = value.machineFlavorId;
                    var fId = value.flavorId;
                    var fName = value.flavorName;
                    var fQuantity = value.flavorQuantity;

                    console.log("[fetchMachineFlavors mId:" + mId + "]");
                    console.log("[fetchMachineFlavors mfId:" + mfId + "]");
                    console.log("[fetchMachineFlavors fName:" + fName + "]");
                    console.log("[fetchMachineFlavors fQuantity:" + fQuantity + "]");
                    console.log("[fetchMachineFlavors ------------------]");

                    output += '<li id="'+ mfId +'"><a href="#machineFlavorEditPage">' + fName + '<span class="ui-li-count">' + fQuantity + '</span></a></li>';
                });

                //append list to ul
                $("#machineFlavorsPageList").html(output).promise().done(function () {
                    //use a promise() to wait for append to finish 
                    //done() will run after append is done
                    //add the click event for the redirection to happen to #machineFlavorsPage
                    $(this).on("click", "li", function (e) {
                        e.preventDefault();
                        //store the information in the next page's data
                        $("#machineFlavorEditPage").data("info", { id: this.id });
                        // redirect
                        $.mobile.changePage("#machineFlavorEditPage");
                    });

                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchMachineFlavors ERROR]");
                console.log("[fetchMachineFlavors message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
    }, // end callbacks


};



