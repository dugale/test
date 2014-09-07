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

        jQuery.mobile.changePage('#loginPage');

        $("#loginForm").on("submit",this.handleLogin);

        // disable for now
        // $("#flavorAddForm").on("submit",this.machineFlavorAddSubmit);
        $("#flavorAddSubmitButton").attr("disabled","disabled");
        $("#flavorEditUpdateSubmitButton").attr("disabled","disabled");
        $("#flavorEditDeleteSubmitButton").attr("disabled","disabled");
        $("#rollsOfCoinEditSubmitButton").attr("disabled","disabled");

        // bind the "on vclick" event listner only once during initial page else will get added multiple times when "back" button is used
        $(document).on("pagecreate", "#machineCupsPage", app.machineCupTotalsAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsPage", app.fetchMachineCupTotals);

        // bind the "on vclick" event listner only once during initial page else will get added multiple times when "back" button is used
        $(document).on("pagecreate", "#machineFlavorsPage", app.machineFlavorsAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineFlavorsPage", app.fetchMachineFlavors);

        // populate form every time page is visited
        $(document).on("pagebeforeshow", "#machineFlavorEditPage", app.machineFlavorEdit);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineFlavorAddPage", app.machineFlavorAdd);
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

    /*
    // login stuff
    */

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

    /*
    // bound to events
    */

    fetchMachineCupTotals: function() {
        
        console.log["fetchMachineCupTotals"];

        app.servers.private.query('fetchmachinecuptotals', {}, app.callbacks.fetchMachineCupTotals);

    },
    machineCupTotalsAttachClickListner: function() {

        console.log["machineCupTotalsAttachClickListner"];

        // attach "on vclick" event listener to all list items
        $("#machineCupsPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineId"] = this.id;

            // redirect
            console.log("[machineCupsPageList forwarding to machineFlavorsPage]");
            $.mobile.changePage("#machineFlavorsPage", {transition: "slide"});
        });

    },
    fetchMachineFlavors: function() {
        
        console.log["fetchMachineFlavors"];

        var mId = localStorage.getItem("machineId");

        app.servers.private.query('fetchmachineflavors', {machineId:mId}, app.callbacks.fetchMachineFlavors);
    },
    machineFlavorsAttachClickListner: function() {

        console.log["machineFlavorsAttachClickListner"];

        $("#machineFlavorsPageList").on("vclick", "li", function (e) {
            e.preventDefault();

            localStorage["machineFlavorId"] = this.id;

            // redirect
            $.mobile.changePage("#machineFlavorEditPage", {transition: "slide"});
        });
    },

    machineFlavorEdit: function() {
        
        console.log["machineFlavorEdit"];

        var mfId = localStorage.getItem("machineFlavorId");

        app.servers.private.query('fetchmachineflavor', {machineFlavorId:mfId}, app.callbacks.machineFlavorEdit);
    },


    machineFlavorAdd: function() {
        
        console.log["machineFlavorAdd"];

        var mId = localStorage.getItem("machineId");

        // fetch machine name (type and id)
        // fetch flavor options
        app.servers.private.query('fetchmachineavailableflavors', {machineId:mId}, app.callbacks.machineFlavorAdd);

    },

    machineFlavorAddSubmit: function() {

        console.log('[machineFlavorAddSubmit]');

        var form = $("#flavorAddForm");    
        //disable the button so we can't resubmit while we wait
        $("#flavorAddSubmitButton",form).attr("disabled","disabled");

        var mId = localStorage.getItem("machineId");
        var fId = $("#flavorAddFlavor", form).val();
        var cups = $("#flavorAddCupsCount", form).val();

        // add form validation 
        if(1) {
            console.log("[Sending add flavor info.]");

            app.servers.private.query('addmachineflavor', {machineId:mId,flavorId:fId,}, app.callbacks.machineFlavorAdd);
        }
        else {
            console.log("[Login failed.]", function() {});
            $("#submitButton").removeAttr("disabled");
        }
        return false;
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
                $("#submitButton").removeAttr("disabled");
                jQuery.mobile.changePage('#homePage');
                // clear the form
                $("#loginForm")[0].reset();    

            } else {
                console.log("[Login failed.]", function() {});
                $("#submitButton").removeAttr("disabled");
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

            // auth success
            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineFlavors SUCCESS]");

                // data error - customize modal dialog and return
                if (r.result === false) {
                    console.log("[fetchMachineFlavors: " + r.message + "]");
                    console.log("[fetchMachineFlavors redirecting to #machineCupsPage]");

                    $('#modalDialogMessage').html(r.message);
                    $('#modalDialogRedirect').attr('href','#machineCupsPage');

                    jQuery.mobile.changePage('#modalDialogTest');

                    return;
                }

                var output = '';
                $.each(r.machineFlavors, function(index, value){                   

                    var mId = value.machineId;
                    var mfId = value.machineFlavorId;
                    var fId = value.flavorId;
                    var fName = value.flavorName;
                    var fQuantity = value.flavorQuantity;

                    output += '<li id="'+ mfId +'"><a href="#machineFlavorEditPage">' + fName + '<span class="ui-li-count">' + fQuantity + '</span></a></li>';
                });

                //append list to ul
                $("#machineFlavorsPageList").html(output).promise().done(function () {

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
        "machineFlavorEdit": function(r) { 

            console.log("[machineFlavorEdit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[machineFlavorEdit SUCCESS]");

                mf = r.machineFlavor;

                var machineId = mf.machineId;
                var machineType = mf.machineType;
                var machineFlavorId = mf.machineFlavorId;
                var flavorId = mf.flavorId;
                var flavorName = mf.flavorName;
                var flavorQuantity = mf.flavorQuantity;

                $("#flavoredit-machine").val(machineType + '-' + machineId);
                $("#flavoredit-flavor").val(flavorName);
                $("#flavoredit-count").val(flavorQuantity);

            }
            else {
                console.log("[machineFlavorEdit ERROR]");
                console.log("[machineFlavorEdit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
        "machineFlavorAdd": function(r) { 

            console.log("[machineFlavorAdd callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[machineFlavorAdd SUCCESS]");

                // data error - customize modal dialog and return
                if (r.result === false) {
                    console.log("[fetchMachineFlavors: " + r.message + "]");
                    console.log("[fetchMachineFlavors redirecting to #machineCupsPage]");

                    $('#modalDialogMessage').html(r.message);
                    $('#modalDialogRedirect').attr('href','#machineCupsPage');

                    jQuery.mobile.changePage('#modalDialogTest');

                    return;
                }

                all = r.machineAvailableFlavors;

                var machineId = all.machineId;
                var machineType = all.machineType;
                var brandId = all.brandId;
                var flavors = all.flavors;

                $("#flavorAddMachine").val(machineType + '-' + machineId);

                var output = '';
                $.each(flavors, function(index, value){                   

                    var fId = value.flavorId;
                    var fName = value.flavorName;

                    output += '<option value="'+ fId +'">' + fName + '</option>';
                });

                //update dropdown
                $("#flavorAddFlavor").html(output)


            }
            else {
                console.log("[machineFlavorEdit ERROR]");
                console.log("[machineFlavorEdit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
    }, 


};



