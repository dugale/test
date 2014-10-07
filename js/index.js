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

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCupsFlavorsPage", app.fetchRouteCupsFlavors);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCupsFlavorsPage", app.fetchRouteCupsFlavorsBreadcrumbs);

        // bind the "on vclick" event listner only once during initial page 
        $(document).on("pagecreate", "#routeCupsFlavorsPage", app.routeCupsFlavorsAttachClickListner);


        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCupsFlavorAddPage", app.fetchRouteCupsFlavorAdd);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCupsFlavorAddPage", app.routeCupsFlavorAddBreadcrumbs);

        // default form action
        $("#routeCupsFlavorAddForm").on("submit",this.fetchRouteCupsFlavorAddSubmit);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCupsFlavorEditPage", app.fetchRouteCupsFlavorEdit);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCupsFlavorEditPage", app.routeCupsFlavorEditBreadcrumbs);

        // default form action
        $("#routeCupsFlavorEditForm").on("submit",this.fetchRouteCupsFlavorEditSubmit);
        /* route cups end */

        /* route coins */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#routeCoinsRoutesPage", app.routeCoinsRoutesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCoinsRoutesPage", app.fetchRouteCoinsRoutes);

        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#routeCoinsMachinesPage", app.routeCoinsMachinesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCoinsMachinesPage", app.fetchRouteCoinsMachines);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCoinsMachinesPage", app.fetchRouteCoinsMachinesBreadcrumbs);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#routeCoinsLoadPage", app.fetchRouteCoinsLoad);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#routeCoinsLoadPage", app.fetchRouteCoinsLoadBreadcrumbs);

        // default form action
        $("#routeCoinsLoadForm").on("submit",this.fetchRouteCoinsLoadSubmit);


        /* route coins end */

        /* van cups */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#vanCupsRoutesPage", app.vanCupsRoutesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#vanCupsRoutesPage", app.fetchVanCupsRoutes);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#vanCupsFlavorsPage", app.fetchVanCupsFlavors);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#vanCupsFlavorsPage", app.fetchVanCupsFlavorsBreadcrumbs);
        // unlock confirm button 
        $(document).on("pagebeforeshow", "#vanCupsFlavorsPage", app.fetchVanCupsFlavorsUnlockConfirmButton);
        // default form action
        $("#vanCupsFlavorsForm").on("submit",this.fetchVanCupsFlavorsConfirmSubmit);

        // confirm load popup
        $('#vanCupsFlavorsLoadConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            // do this to distinguish between two different form submit buttons
            $('#vanCupsFlavorsSubmitClicked').val('confirm');
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#vanCupsFlavorsForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });

        // confirm driver load popup
        $('#vanCupsFlavorsLoadDriverConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            // do this to distinguish between two different form submit buttons
            $('#vanCupsFlavorsSubmitClicked').val('driverconfirm')
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#vanCupsFlavorsForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });

        /* van cups end */




        /* van coins */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#vanCoinsRoutesPage", app.vanCoinsRoutesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#vanCoinsRoutesPage", app.fetchVanCoinsRoutes);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#vanCoinsLoadPage", app.fetchVanCoinsLoad);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#vanCoinsLoadPage", app.fetchVanCoinsLoadBreadcrumbs);

        // unlock confirm button 
        $(document).on("pagebeforeshow", "#vanCoinsLoadPage", app.fetchVanCoinsLoadUnlockConfirmButton);

        // default form action
        $("#vanCoinsLoadForm").on("submit",this.fetchVanCoinsLoadConfirmSubmit);

        // confirm load popup
        $('#vanCoinsLoadConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            // do this to distinguish between two different form submit buttons
            $('#vanCoinsLoadSubmitClicked').val('confirm');
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#vanCoinsLoadForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });

        // confirm driver load popup
        $('#vanCoinsLoadDriverConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            // do this to distinguish between two different form submit buttons
            $('#vanCoinsLoadSubmitClicked').val('driverconfirm')
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#vanCoinsLoadForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });
        /* van coins end */



        /* machine cups start */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#machineCupsRoutesPage", app.machineCupsRoutesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsRoutesPage", app.fetchMachineCupsRoutes);

        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#machineCupsLocationsPage", app.machineCupsLocationsAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsLocationsPage", app.fetchMachineCupsLocations);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCupsLocationsPage", app.fetchMachineCupsLocationsBreadcrumbs);

        // bind the "on vclick" event listner only once during initial page 
        $(document).on("pagecreate", "#machineCupsMachinesPage", app.machineCupsMachinesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsMachinesPage", app.fetchMachineCupsMachines);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCupsMachinesPage", app.fetchMachineCupsMachinesBreadcrumbs);


        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsFlavorsPage", app.fetchMachineCupsFlavors);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCupsFlavorsPage", app.fetchMachineCupsFlavorsBreadcrumbs);
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        $(document).on("pagebeforeshow", "#machineCupsFlavorsPage", app.fetchMachineCupsFlavorsUnlockConfirmButton);

        $("#machineCupsFlavorsForm").on("submit",this.fetchMachineCupsFlavorsConfirmSubmit);

        // confirm popup
        $('#machineCupsFlavorsConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            $('#modalDialogCancelMessage').html('Are you sure, sir?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#machineCupsFlavorsForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });
        /* machine cups end */



        /* machine coins start */
        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#machineCoinsRoutesPage", app.machineCoinsRoutesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCoinsRoutesPage", app.fetchMachineCoinsRoutes);

        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#machineCoinsLocationsPage", app.machineCoinsLocationsAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCoinsLocationsPage", app.fetchMachineCoinsLocations);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCoinsLocationsPage", app.fetchMachineCoinsLocationsBreadcrumbs);

        // bind the "on vclick" event listner only once during initial page
        $(document).on("pagecreate", "#machineCoinsMachinesPage", app.machineCoinsMachinesAttachClickListner);
        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCoinsMachinesPage", app.fetchMachineCoinsMachines);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCoinsMachinesPage", app.fetchMachineCoinsMachinesBreadcrumbs);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCoinsLoadPickupOptionsPage", app.fetchMachineCoinsLoadPickupOptionsBreadcrumbs);

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCoinsLoadPage", app.fetchMachineCoinsLoad);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCoinsLoadPage", app.machineCoinsLoadBreadcrumbs);
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        $(document).on("pagebeforeshow", "#machineCoinsLoadPage", app.fetchMachineCoinsLoadUnlockConfirmButton);
        // default form action
        $("#machineCoinsLoadForm").on("submit",this.fetchMachineCoinsLoadConfirmSubmit);

        // confirm popup
        $('#machineCoinsLoadConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#machineCoinsLoadForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });

        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCoinsPickupPage", app.fetchMachineCoinsPickup);
        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCoinsPickupPage", app.machineCoinsPickupBreadcrumbs);
        // unlock confirm button if machine load status is not 'Machine Pickup Complete'
        $(document).on("pagebeforeshow", "#machineCoinsPickupPage", app.fetchMachineCoinsPickupUnlockConfirmButton);
        // default form action
        $("#machineCoinsPickupForm").on("submit",this.fetchMachineCoinsPickupConfirmSubmit);

        // confirm popup
        $('#machineCoinsPickupConfirmSubmitButton').on('click', function(e){
            e.preventDefault();
            $('#modalDialogCancelMessage').html('Are you sure?');
            // off removes previously assigned click events
            $('#modalDialogCancelRedirect').off("click").click( function(e){
                $('#modalDialogCancel').popup('close');
                $('#machineCoinsPickupForm').submit();
            });
            $('#modalDialogCancel').popup('open');
        });
        /* machine coins end */


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
                    var interval = setInterval(function(){
                        $.mobile.loading('show');
                        clearInterval(interval);
                    },1);   
                },
                "complete": function(){
                    var interval = setInterval(function(){
                        $.mobile.loading('hide');
                        clearInterval(interval);
                    },1);   
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
            $.mobile.changePage("#routeCupsMachinesPage", {transition: "slide"});
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

        listViews = ['routeCupsMachinesPageHoldList', 'routeCupsMachinesPageVanReadyList'];

        // attach click handler for each list on the page
        $.each(listViews, function(index,value){

            // attach "on vclick" event listener to all list items
            $("#" + value ).on("vclick", "li", function (e) {
                // override default event action
                e.preventDefault();

                localStorage["routeCupsMachineId"] = this.id;

                // redirect
                console.log("["+ value +" forwarding to routeCupsFlavorsPage]");
                $.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
            });
        });

    },

    fetchRouteCupsFlavors: function() {
        
        console.log("[fetchRouteCupsFlavors]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsMachineId = localStorage.getItem("routeCupsMachineId");

        app.servers.private.query('routecupsflavors', {routeId:routeCupsRouteId,machineId:routeCupsMachineId}, app.callbacks.fetchRouteCupsFlavors);

    },

    fetchRouteCupsFlavorsBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[fetchRouteCupsFlavorsBreadcrumbs]");

        var routeCupsMachineId = localStorage.getItem("routeCupsMachineId");
        app.servers.private.query('machineinfo', {machineId:routeCupsMachineId}, app.callbacks.fetchRouteCupsFlavorsBreadcrumbs);

    },

    routeCupsFlavorsAttachClickListner: function() {

        console.log("[routeCupsMachinesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#routeCupsFlavorsPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            // pass the id along to the next screen
            localStorage["routeCupsMachineFlavorLoadId"] = this.id;

            // redirect
            console.log("[routeCupsFlavorsList forwarding to routeCupsFlavorEditPage]");
            $.mobile.changePage("#routeCupsFlavorEditPage", {transition: "slide"});
        });

    },

    fetchRouteCupsFlavorAdd: function() {
        
        console.log["fetchRouteCupsFlavorAdd"];

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsMachineId = localStorage.getItem("routeCupsMachineId");

        // fetch flavor options
        app.servers.private.query('routecupsflavoradd', {routeId:routeCupsRouteId, machineId:routeCupsMachineId}, app.callbacks.fetchRouteCupsFlavorAdd);

    },

    routeCupsFlavorAddBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[fetchRouteCupsFlavorAddBreadcrumbs]");

        var routeCupsDate = localStorage.getItem("routeCupsDate");
        var routeCupsVanName = localStorage.getItem("routeCupsVanName");
        var routeCupsMachineName = localStorage.getItem("routeCupsMachineName");

        // write breadcrumbs
        $('#routeCupsFlavorAddDateHeader').html(routeCupsDate);
        $('#routeCupsFlavorAddVanNameHeader').html(routeCupsVanName);
        $('#routeCupsFlavorAddMachineNameHeader').html(routeCupsMachineName);

    },
    fetchRouteCupsFlavorAddSubmit: function() {

        console.log('[fetchRouteCupsFlavorAddSubmit]');

        var form = $("#routeCupsFlavorAddForm");    
        //disable the button so we can't resubmit while we wait
        $("#routeCupsFlavorAddSubmitButton").button("disable");

        var rId = localStorage.getItem("routeCupsRouteId");
        var mId = localStorage.getItem("routeCupsMachineId");
        var fId = $("#routeCupsFlavorAddFlavorName", form).val();
        var fQuantity = $("#routeCupsFlavorAddCupsCount", form).val();

        console.log("[Submitting route machine flavor add info.]");
        app.servers.private.query('routecupsflavoraddsubmit', {routeId:rId,machineId:mId,flavorId:fId,flavorQuantity:fQuantity}, app.callbacks.fetchRouteCupsFlavorAddSubmit);
        $("#routeCupsFlavorAddSubmitButton").button("enable");

        // stop form from submitting 'get' request by returning false
        return false;
    },        

    fetchRouteCupsFlavorEdit: function() {
        
        console.log["fetchRouteCupsFlavorEdit"];

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsMachineId = localStorage.getItem("routeCupsMachineId");
        var routeCupsMachineFlavorLoadId = localStorage.getItem("routeCupsMachineFlavorLoadId");

        // fetch flavor options
        app.servers.private.query('routecupsflavoredit', {routeId:routeCupsRouteId, machineId:routeCupsMachineId, machineFlavorLoadId:routeCupsMachineFlavorLoadId}, app.callbacks.fetchRouteCupsFlavorEdit);

    },

    routeCupsFlavorEditBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[routeCupsFlavorEditBreadcrumbs]");

        var routeCupsDate = localStorage.getItem("routeCupsDate");
        var routeCupsVanName = localStorage.getItem("routeCupsVanName");
        var routeCupsMachineName = localStorage.getItem("routeCupsMachineName");

        // write breadcrumbs
        $('#routeCupsFlavorEditDateHeader').html(routeCupsDate);
        $('#routeCupsFlavorEditVanNameHeader').html(routeCupsVanName);
        $('#routeCupsFlavorEditMachineNameHeader').html(routeCupsMachineName);

    },
    fetchRouteCupsFlavorEditSubmit: function() {

        console.log('[fetchRouteCupsFlavorEditSubmit]');

        var form = $("#routeCupsFlavorEditForm");    
        var formType = $("#routeCupsFlavorEditSubmitClicked", form).val();

        //disable the button so we can't resubmit while we wait
        $("#routeCupsFlavorEditUpdateSubmitButton").button("disable");
        $("#routeCupsFlavorEditDeleteSubmitButton").button("disable");

        var rId = localStorage.getItem("routeCupsRouteId");
        var mId = localStorage.getItem("routeCupsMachineId");
        var mflId = localStorage.getItem("routeCupsMachineFlavorLoadId");
        var fQuantity = $("#routeCupsFlavorEditFlavorQuantity", form).val();



        if (formType === "update") {
            console.log("[Submitting route machine flavor update.]");
            app.servers.private.query('routecupsflavorupdatesubmit', {routeId:rId,machineId:mId,machineFlavorLoadId:mflId,flavorQuantity:fQuantity}, app.callbacks.fetchRouteCupsFlavorUpdateSubmit);
        }
        else {
            console.log("[Submitting route machine flavor delete.]");
            app.servers.private.query('routecupsflavordeletesubmit', {routeId:rId,machineId:mId,machineFlavorLoadId:mflId}, app.callbacks.fetchRouteCupsFlavorDeleteSubmit);
        }

        //disable the button so we can't resubmit while we wait
        $("#routeCupsFlavorEditUpdateSubmitButton").button("enable");
        $("#routeCupsFlavorEditDeleteSubmitButton").button("enable");

        // stop form from submitting 'get' request by returning false
        return false;
    },        




    fetchRouteCoinsMachines: function() {
        
        console.log("[fetchRouteCoinsMachines]");

        var routeCoinsRouteId = localStorage.getItem("routeCoinsRouteId");

        app.servers.private.query('routecoinsmachines', {routeId:routeCoinsRouteId}, app.callbacks.fetchRouteCoinsMachines);

    },
    fetchRouteCoinsMachinesBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchRouteCoinsMachinesBreadcrumbs]");

        var routeCoinsRouteId = localStorage.getItem("routeCoinsRouteId");

        app.servers.private.query('routeinfo', {routeId:routeCoinsRouteId}, app.callbacks.fetchRouteCoinsMachinesBreadcrumbs);

    },

    routeCoinsMachinesAttachClickListner: function() {

        console.log("[routeCoinsMachinesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#routeCoinsMachinesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["routeCoinsMachineId"] = this.id;

            // redirect
            console.log("[routeCoinsMachinesList forwarding to routeCoinsLoadPage]");
            $.mobile.changePage("#routeCoinsLoadPage", {transition: "slide"});
        });

    },

    fetchRouteCoinsRoutes: function() {
        
        console.log("[fetchRouteCoinsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchRouteCoinsRoutes);

    },
    routeCoinsRoutesAttachClickListner: function() {

        console.log("[routeCoinsRoutesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#routeCoinsRoutesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["routeCoinsRouteId"] = this.id;

            // redirect
            console.log("[routeCoinsRoutesList forwarding to routeCoinsMachinesPage]");
            $.mobile.changePage("#routeCoinsMachinesPage", {transition: "slide"});
        });

    },

    fetchRouteCoinsLoad: function() {
        
        console.log("[fetchRouteCoinsLoad]");

        var routeCoinsRouteId = localStorage.getItem("routeCoinsRouteId");
        var routeCoinsMachineId = localStorage.getItem("routeCoinsMachineId");

        app.servers.private.query('routecoinsload', {routeId:routeCoinsRouteId,machineId:routeCoinsMachineId}, app.callbacks.fetchRouteCoinsLoad);

    },

    fetchRouteCoinsLoadBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[fetchRouteCoinsLoadBreadcrumbs]");

        var routeCoinsMachineId = localStorage.getItem("routeCoinsMachineId");
        app.servers.private.query('machineinfo', {machineId:routeCoinsMachineId}, app.callbacks.fetchRouteCoinsLoadBreadcrumbs);

    },


   fetchRouteCoinsLoadSubmit: function() {

        console.log('[fetchRouteCoinsLoadSubmit]');

        var form = $("#routeCoinsLoadForm");    
        //disable the button so we can't resubmit while we wait
        $("#routeCoinsLoadFormSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var routeCoinsRouteId = localStorage.getItem("routeCoinsRouteId");
        var routeCoinsMachineId = localStorage.getItem("routeCoinsMachineId");

        coinsToLoad = []; 
        $("#routeCoinsLoadForm input[type=number]").each(function() {

                var rollTypeUCFirst = this.id.match(/routeCoinsLoad([a-z]+)/i);
                console.log('[fetchRouteCoinsLoadSubmit rollType:'+ rollTypeUCFirst[1] +']');

                var rollTypeLCFirst = rollTypeUCFirst[1].charAt(0).toLowerCase() + rollTypeUCFirst[1].slice(1);
                var rollType = rollTypeLCFirst;

                var rollQuantity = this.value;

                if(rollType) {
                    coinsToLoad.push({'rollType':rollType,'rollQuantity':rollQuantity});
                }

            });

        console.log("[Submitting machine coins to load request.]");
        app.servers.private.query('routecoinsloadsubmit', {routeId:routeCoinsRouteId, machineId:routeCoinsMachineId, routeCoinsToLoad:coinsToLoad}, app.callbacks.fetchRouteCoinsLoadSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },


    fetchVanCupsRoutes: function() {
        
        console.log("[fetchVanCupsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchVanCupsRoutes);

    },
    vanCupsRoutesAttachClickListner: function() {

        console.log("[vanCupsRoutesAttachClickListner]");

        var listViews = ['vanCupsRoutesPageConfirmationList', 'vanCupsRoutesPageVerificationList', 'vanCupsRoutesPageVerifiedList' ];

        // attach click handler for each list on the page
        $.each(listViews, function(index,value){

            // attach "on vclick" event listener to all list items
            $("#"+ value ).on("vclick", "li", function (e) {
                // override default event action
                e.preventDefault();

                localStorage["vanCupsRouteId"] = this.id;

                // redirect
                console.log("["+ value +" forwarding to vanCupsFlavorsPage]");
                $.mobile.changePage("#vanCupsFlavorsPage", {transition: "slide"});
            });
        });


    },

    fetchVanCupsFlavors: function() {
        
        console.log("[fetchVanCupsFlavors]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        console.log("[fetchVanCupsFlavors vanCupsRouteId:" + vanCupsRouteId +"]");


        app.servers.private.query('vancupsflavors', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCupsFlavors);

    },
    fetchVanCupsFlavorsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchVanCupsFlavorsBreadcrumbs]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        app.servers.private.query('routeinfo', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCupsFlavorsBreadcrumbs);

    },

    fetchVanCupsFlavorsUnlockConfirmButton: function() {
        
        // unlock confirm buttons based on vanLoadStatus table state
        console.log("[fetchVanCupsFlavorsUnlockConfirmButton]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        // get latest vanLoadStatus
        // if vanLoadStatus is 'Van Load Requested', then unlock both confirm buttons: vanCupsFlavorsLoadConfirmSubmitButton
        // if vanLoadStatus is 'Van Load Complete', then unlock just driver confirm button: vanCupsFlavorsLoadDriverConfirmSubmitButton
        app.servers.private.query('vanloadstatus', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCupsFlavorsUnlockConfirmButton);
    },




    fetchVanCupsFlavorsConfirmSubmit: function() {

        console.log('[fetchVanCupsFlavorsConfirmSubmit]');

        var form = $("#vanCupsFlavorsForm");    
        var formType = $("#vanCupsFlavorsSubmitClicked", form).val();

        //disable both button so we can't resubmit while we wait
        $("#vanCupsFlavorsLoadConfirmSubmitButton").button("disable");
        $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        if (formType === "confirm") {

            console.log("[test test test.]");
            $('#modalDialogMessage').html('Are you sure?.');
            $('#modalDialogRedirect').attr('href','#vanCupsFlavorsPage');
            $('#modalDialog').popup("open");

            console.log("[Submitting van cups load confirm.]");
            app.servers.private.query('vancupsflavorsconfirmsubmit', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCupsFlavorsConfirmSubmit);
        }
        else {
            // it's a driver confirm request
            console.log("[Submitting van cups driver load confirm.]");
            app.servers.private.query('vancupsflavorsdriverconfirmsubmit', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCupsFlavorsDriverConfirmSubmit);
        }

        // stop form from submitting 'get' request by returning false
        return false;
    },

    fetchVanCoinsRoutes: function() {
        
        console.log("[fetchVanCoinsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchVanCoinsRoutes);

    },
    vanCoinsRoutesAttachClickListner: function() {

        console.log("[vanCoinsRoutesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#vanCoinsRoutesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["vanCoinsRouteId"] = this.id;

            // redirect
            console.log("[vanCoinsRoutesList forwarding to vanCoinsLoadPage]");
            $.mobile.changePage("#vanCoinsLoadPage", {transition: "slide"});
        });

    },


    fetchVanCoinsLoadConfirmSubmit: function() {

        console.log('[fetchVanCoinsLoadConfirmSubmit]');

        var form = $("#vanCoinsLoadForm");    
        var formType = $("#vanCoinsLoadSubmitClicked", form).val();

        //disable both button so we can't resubmit while we wait
        $("#vanCoinsLoadConfirmSubmitButton").button("disable");
        $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var vanCoinsRouteId = localStorage.getItem("vanCoinsRouteId");

        if (formType === "confirm") {
            console.log("[Submitting van coins load confirm.]");
            app.servers.private.query('vancoinsloadconfirmsubmit', {routeId:vanCoinsRouteId}, app.callbacks.fetchVanCoinsLoadConfirmSubmit);
        }
        else {
            // it's a driver confirm request
            console.log("[Submitting van coins driver load confirm.]");
            app.servers.private.query('vancoinsloaddriverconfirmsubmit', {routeId:vanCoinsRouteId}, app.callbacks.fetchVanCoinsLoadDriverConfirmSubmit);
        }

        // stop form from submitting 'get' request by returning false
        return false;
    },



    fetchVanCoinsLoad: function() {
        
        console.log("[fetchVanCoinsLoad]");

        var vanCoinsRouteId = localStorage.getItem("vanCoinsRouteId");

        app.servers.private.query('vancoinsload', {routeId:vanCoinsRouteId}, app.callbacks.fetchVanCoinsLoad);

    },

    fetchVanCoinsLoadBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchVanCoinsLoadBreadcrumbs]");

        var vanCoinsRouteId = localStorage.getItem("vanCoinsRouteId");

        app.servers.private.query('routeinfo', {routeId:vanCoinsRouteId}, app.callbacks.fetchVanCoinsLoadBreadcrumbs);

    },

    fetchVanCoinsLoadUnlockConfirmButton: function() {
        
        // unlock confirm buttons based on vanLoadCoinsStatus table state
        console.log("[fetchVanCoinsLoadUnlockConfirmButton]");

        var vanCoinsRouteId = localStorage.getItem("vanCoinsRouteId");

        // get latest vanLoadCoinsStatus
        // if vanLoadStatus is 'Van Load Requested', then unlock both confirm buttons
        // if vanLoadStatus is 'Van Load Complete', then unlock just driver confirm button
        app.servers.private.query('vanloadcoinsstatus', {routeId:vanCoinsRouteId}, app.callbacks.fetchVanCoinsLoadUnlockConfirmButton);
    },




    fetchMachineCupsRoutes: function() {
        
        console.log("[fetchMachineCupsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchMachineCupsRoutes);

    },
    machineCupsRoutesAttachClickListner: function() {

        console.log("[machineCupsRoutesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCupsRoutesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCupsRouteId"] = this.id;

            // redirect
            console.log("[machineCupsRoutesList forwarding to machineCupsLocationsPage]");
            $.mobile.changePage("#machineCupsLocationsPage", {transition: "slide"});
        });

    },

    fetchMachineCupsLocations: function() {
        
        console.log("[fetchMachineCupsLocations]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");

        app.servers.private.query('machinecupslocations', {routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsLocations);


    },
    fetchMachineCupsLocationsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCupsLocationsBreadcrumbs]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");

        app.servers.private.query('routeinfo', {routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsLocationsBreadcrumbs);


    },
    machineCupsLocationsAttachClickListner: function() {

        console.log("[machineCupsLocationsAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCupsLocationsPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCupsRouteLocationId"] = this.id;

            // redirect
            console.log("[machineCupsLocationsList forwarding to machineCupsMachinesPage]");
            $.mobile.changePage("#machineCupsMachinesPage", {transition: "slide"});
        });

    },

    fetchMachineCupsMachines: function() {
        
        console.log("[fetchMachineCupsMachines]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

        app.servers.private.query('machinecupsmachines', {routeLocationId:machineCupsRouteLocationId}, app.callbacks.fetchMachineCupsMachines);


    },
    fetchMachineCupsMachinesBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCupsMachinesBreadcrumbs]");

        var machineCupsRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

        app.servers.private.query('routelocationinfo', {routeLocationId:machineCupsRouteLocationId}, app.callbacks.fetchMachineCupsMachinesBreadcrumbs);


    },
    machineCupsMachinesAttachClickListner: function() {

        console.log("[machineCupsMachinesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCupsMachinesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCupsMachineId"] = this.id;

            // redirect
            console.log("[machineCupsMachinesList forwarding to machineCupsFlavorsPage]");
            $.mobile.changePage("#machineCupsFlavorsPage", {transition: "slide"});
        });

    },
    fetchMachineCupsFlavors: function() {
        
        console.log("[fetchMachineCupsFlavors]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsMachineId = localStorage.getItem("machineCupsMachineId");
        var machineCupsRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

        app.servers.private.query('machinecupsflavors', {routeId:machineCupsRouteId,routeLocationId:machineCupsRouteLocationId,machineId:machineCupsMachineId}, app.callbacks.fetchMachineCupsFlavors);

    },
    fetchMachineCupsFlavorsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCupsFlavorsBreadcrumbs]");

        var machineCupsMachineId = localStorage.getItem("machineCupsMachineId");
        app.servers.private.query('machineinfo', {machineId:machineCupsMachineId}, app.callbacks.fetchMachineCupsFlavorsBreadcrumbs);

    },

    fetchMachineCupsFlavorsUnlockConfirmButton: function() {
        
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        console.log("[fetchMachineCupsFlavorsUnlockConfirmButton]");

        var machineCupsMachineId = localStorage.getItem("machineCupsMachineId");
        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        app.servers.private.query('machineloadstatus', {machineId:machineCupsMachineId,routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsFlavorsUnlockConfirmButton);
    },


    fetchMachineCupsFlavorsConfirmSubmit: function() {

        console.log('[fetchMachineCupsFlavorsConfirmSubmit]');

        var form = $("#machineCupsFlavorsForm");    
        //disable the button so we can't resubmit while we wait
        $("#machineCupsFlavorsConfirmSubmitButton").button("disable");


        // machineId, routeId, flavorId, flavorQuantity, loadType
        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsMachineId = localStorage.getItem("machineCupsMachineId");
        var machineCupsRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

        var flavorsLoaded = new Array(); 
        $("#machineCupsFlavorsForm input[type=number]").each(function() {
                var flavorId = this.id.match(/flavor([0-9]+)/);
                var flavorQuantity = this.value;

                if(flavorId) {
                    flavorsLoaded.push({'flavorId':flavorId[1],'flavorQuantity':flavorQuantity});
                }
            });

        console.log("[Submitting machine cups flavors confirm.]");
        app.servers.private.query('machinecupsflavorsconfirmsubmit', {routeLocationId: machineCupsRouteLocationId, routeId:machineCupsRouteId, machineId:machineCupsMachineId, machineFlavorsLoaded:flavorsLoaded}, app.callbacks.fetchMachineCupsFlavorsConfirmSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },



    fetchMachineCoinsRoutes: function() {
        
        console.log("[fetchMachineCoinsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchMachineCoinsRoutes);

    },
    machineCoinsRoutesAttachClickListner: function() {

        console.log("[machineCoinsRoutesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCoinsRoutesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCoinsRouteId"] = this.id;

            // redirect
            console.log("[machineCoinsRoutesList forwarding to machineCoinsLocationsPage]");
            $.mobile.changePage("#machineCoinsLocationsPage", {transition: "slide"});
        });

    },

    fetchMachineCoinsLocations: function() {
        
        console.log("[fetchMachineCoinsLocations]");

        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");

        app.servers.private.query('machinecoinslocations', {routeId:machineCoinsRouteId}, app.callbacks.fetchMachineCoinsLocations);


    },
    fetchMachineCoinsLocationsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCoinsLocationsBreadcrumbs]");

        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");

        app.servers.private.query('routeinfo', {routeId:machineCoinsRouteId}, app.callbacks.fetchMachineCoinsLocationsBreadcrumbs);


    },
    machineCoinsLocationsAttachClickListner: function() {

        console.log("[machineCoinsLocationsAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCoinsLocationsPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCoinsRouteLocationId"] = this.id;

            // redirect
            console.log("[machineCoinsLocationsList forwarding to machineCoinsMachinesPage]");
            $.mobile.changePage("#machineCoinsMachinesPage", {transition: "slide"});
        });

    },

    fetchMachineCoinsMachines: function() {
        
        console.log("[fetchMachineCoinsMachines]");

        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        app.servers.private.query('machinecoinsmachines', {routeLocationId:machineCoinsRouteLocationId}, app.callbacks.fetchMachineCoinsMachines);


    },
    fetchMachineCoinsMachinesBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCoinsMachinesBreadcrumbs]");

        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        app.servers.private.query('routelocationinfo', {routeLocationId:machineCoinsRouteLocationId}, app.callbacks.fetchMachineCoinsMachinesBreadcrumbs);


    },
    machineCoinsMachinesAttachClickListner: function() {

        console.log("[machineCoinsMachinesAttachClickListner]");

        // attach "on vclick" event listener to all list items
        $("#machineCoinsMachinesPageList").on("vclick", "li", function (e) {
            // override default event action
            e.preventDefault();

            localStorage["machineCoinsMachineId"] = this.id;

            // redirect
            console.log("[machineCoinsMachinesList forwarding to machineCoinsLoadPickupOptionsPage]");
            $.mobile.changePage("#machineCoinsLoadPickupOptionsPage", {transition: "slide"});
        });

    },

    fetchMachineCoinsLoadPickupOptionsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs]");

        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        app.servers.private.query('machineinfo', {machineId:machineCoinsMachineId}, app.callbacks.fetchMachineCoinsLoadPickupOptionsBreadcrumbs);

    },

    machineCoinsLoadBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[machineCoinsLoadBreadcrumbs]");

        // get from local storage
        var machineCoinsLoadDateHeader = localStorage.getItem("machineCoinsDate");
        var machineCoinsLoadVanNameHeader = localStorage.getItem("machineCoinsVanName");
        var machineCoinsLoadAddressAbbrevHeader = localStorage.getItem("machineCoinsAddressAbbrev"); 
        var machineCoinsLoadMachineName = localStorage.getItem("machineCoinsMachineName"); 

        // write breadcrumbs
        $('#machineCoinsLoadDateHeader').html(machineCoinsLoadDateHeader);
        $('#machineCoinsLoadVanNameHeader').html(machineCoinsLoadVanNameHeader);
        $('#machineCoinsLoadAddressAbbrevHeader').html(machineCoinsLoadAddressAbbrevHeader);
        $('#machineCoinsLoadMachineNameHeader').html(machineCoinsLoadMachineName);
    },


    fetchMachineCoinsLoad: function() {
        
        console.log("[fetchMachineCoinsLoad]");

        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        app.servers.private.query('machinecoinsload', {routeId:machineCoinsRouteId,machineId:machineCoinsMachineId}, app.callbacks.fetchMachineCoinsLoad);

    },

    fetchMachineCoinsLoadConfirmSubmit: function() {

        console.log('[fetchMachineCoinsLoadConfirmSubmit]');

        var form = $("#machineCoinsLoadForm");    
        //disable the button so we can't resubmit while we wait
        $("#machineCoinsLoadConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        coinsLoaded = []; 
        $("#machineCoinsLoadForm input[type=number]").each(function() {

                var rollTypeUCFirst = this.id.match(/machineCoinsLoad([a-z]+)/i);
                console.log('[fetchMachineCoinsLoadConfirmSubmit rollType:'+ rollTypeUCFirst[1] +']');

                var rollTypeLCFirst = rollTypeUCFirst[1].charAt(0).toLowerCase() + rollTypeUCFirst[1].slice(1);
                var rollType = rollTypeLCFirst;

                var rollQuantity = this.value;

                if(rollType) {
                    coinsLoaded.push({'rollType':rollType,'rollQuantity':rollQuantity});
                }

            });

        console.log("[Submitting machine coins load confirm.]");
        app.servers.private.query('machinecoinsloadconfirmsubmit', {routeLocationId: machineCoinsRouteLocationId, routeId:machineCoinsRouteId, machineId:machineCoinsMachineId, machineCoinsLoaded:coinsLoaded}, app.callbacks.fetchMachineCoinsLoadConfirmSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },

    fetchMachineCoinsLoadUnlockConfirmButton: function() {
        
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        console.log("[fetchMachineCoinsLoadUnlockConfirmButton]");

        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        app.servers.private.query('machinecoinsloadstatus', {machineId:machineCoinsMachineId,routeId:machineCoinsRouteId}, app.callbacks.fetchMachineCoinsLoadUnlockConfirmButton);
    },




    fetchMachineCoinsPickup: function() {
        
        console.log("[fetchMachineCoinsPickup]");

        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        app.servers.private.query('machinecoinspickup', {routeId:machineCoinsRouteId,routeLocationId:machineCoinsRouteLocationId,machineId:machineCoinsMachineId}, app.callbacks.fetchMachineCoinsPickup);

    },

    machineCoinsPickupBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[machineCoinsPickupBreadcrumbs]");

        // get from local storage
        var machineCoinsPickupDateHeader = localStorage.getItem("machineCoinsDate");
        var machineCoinsPickupVanNameHeader = localStorage.getItem("machineCoinsVanName");
        var machineCoinsPickupAddressAbbrevHeader = localStorage.getItem("machineCoinsAddressAbbrev"); 
        var machineCoinsPickupMachineName = localStorage.getItem("machineCoinsMachineName"); 

        // write breadcrumbs
        $('#machineCoinsPickupDateHeader').html(machineCoinsPickupDateHeader);
        $('#machineCoinsPickupVanNameHeader').html(machineCoinsPickupVanNameHeader);
        $('#machineCoinsPickupAddressAbbrevHeader').html(machineCoinsPickupAddressAbbrevHeader);
        $('#machineCoinsPickupMachineNameHeader').html(machineCoinsPickupMachineName);
    },

    fetchMachineCoinsPickupConfirmSubmit: function() {

        console.log('[fetchMachineCoinsPickupConfirmSubmit]');

        var form = $("#machineCoinsPickupForm");    
        //disable the button so we can't resubmit while we wait
        $("#machineCoinsPickupConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteLocationId = localStorage.getItem("machineCoinsRouteLocationId");

        coinsPickedUp = []; 
        $("#machineCoinsPickupForm input[type=number]").each(function() {

                var rollTypeUCFirst = this.id.match(/machineCoinsPickup([a-z]+)/i);

                var rollTypeLCFirst = rollTypeUCFirst[1].charAt(0).toLowerCase() + rollTypeUCFirst[1].slice(1);
                var rollType = rollTypeLCFirst;

                var rollQuantity = this.value;

                if(rollType) {
                    coinsPickedUp.push({'rollType':rollType,'rollQuantity':rollQuantity});
                }

            });

        console.log("[Submitting machine coins pickup confirm.]");
        app.servers.private.query('machinecoinspickupconfirmsubmit', {routeLocationId: machineCoinsRouteLocationId, routeId:machineCoinsRouteId, machineId:machineCoinsMachineId, machineCoinsPickedUp:coinsPickedUp}, app.callbacks.fetchMachineCoinsPickupConfirmSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },

    fetchMachineCoinsPickupUnlockConfirmButton: function() {
        
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        console.log("[fetchMachineCoinsPickupUnlockConfirmButton]");

        var machineCoinsMachineId = localStorage.getItem("machineCoinsMachineId");
        var machineCoinsRouteId = localStorage.getItem("machineCoinsRouteId");
        app.servers.private.query('machinecoinspickupstatus', {machineId:machineCoinsMachineId,routeId:machineCoinsRouteId}, app.callbacks.fetchMachineCoinsPickupUnlockConfirmButton);
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

                var holdOutput = '';
                var vanReadyOutput = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;

                    if (status=="Hold") {
                        holdOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + ' (' +status + ')</a></li>';
                    }
                    else {
                        vanReadyOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + ' (' +status + ')</a></li>';
                    }
                });



                //append list to ul
                if (holdOutput) {
                    $('#routeCupsMachinesPageHoldListHeader').html("Not Sent for Van Load:");
                    $("#routeCupsMachinesPageHoldList").html(holdOutput).promise().done(function () {
                        // refresh listview so that jq mobile applies styles to added li elements
                        $(this).listview("refresh");
                    });
                }

                if (vanReadyOutput) {
                    $('#routeCupsMachinesPageVanReadyListHeader').html("Sent for Van Load:");
                    $("#routeCupsMachinesPageVanReadyList").html(vanReadyOutput).promise().done(function () {
                        // refresh listview so that jq mobile applies styles to added li elements
                        $(this).listview("refresh");
                    });
                }



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

       "fetchRouteCupsFlavors": function(r) { 

            console.log("[fetchRouteCupsFlavors callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavors SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavors redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavors redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavors redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.machineFlavors.length == 0) {
                    $('#modalDialogBackMessage').html("No flavors available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var vanLoadStatus = r.vanLoadStatus;

                var inputIds = [];
                var output = '';
                $.each(r.machineFlavors, function(index, value){                   

                    var machineFlavorLoadId = value.machineFlavorLoadId;
                    var flavorId = value.flavorId;
                    var flavorName = value.flavorName;
                    var flavorQuantity = value.flavorQuantity;
                    var flavorQuantityLoaded = value.flavorQuantityLoaded;

                    if (vanLoadStatus == "Hold") {
                        // edit is link active while route has a van load status of "hold"
                        output += '<li id="'+machineFlavorLoadId+'"><a href="#routeCupsFlavorEditPage" data-transition="slide">' + flavorName + '<span class="ui-li-count">' + flavorQuantity + '</span></a></li>';
                    } 
                    else {
                        // any other status, add ui-disabled class to li
                        output += '<li id="'+machineFlavorLoadId+'" class="ui-disabled"><a href="#routeCupsFlavorEditPage" data-transition="slide">' + flavorName + '<span class="ui-li-count">' + flavorQuantity + '</span></a></li>';
                    }

                });

                // this ul has an onclick event listner that writes the machineFlavorLoadId to local storage
                $("#routeCupsFlavorsPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });




                // flavor add link is active while route has a van load status of "hold" only
                if (vanLoadStatus != "Hold") {
                    $('#routeCupsFlavorAddLink').prop('disabled',true).addClass('ui-disabled');
                }
                else {
                    $('#routeCupsFlavorAddLink').prop('disabled',false).removeClass('ui-disabled');
                }



            }
            else {
                console.log("[fetchRouteCupsFlavors ERROR]");
                console.log("[fetchRouteCupsFlavors message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchRouteCupsFlavorsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchRouteCupsFlavorsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorsBreadcrumbs redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchRouteCupsFlavorsBreadcrumbs redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // get from local storage
                var routeCupsFlavorsDateHeader = localStorage.getItem("routeCupsDate");
                var routeCupsFlavorsVanNameHeader = localStorage.getItem("routeCupsVanName");

                localStorage["routeCupsMachineId"] = r.machineId;
                localStorage["routeCupsMachineName"] = r.type + ' - ' + r.brandName;

                // write breadcrumbs
                $('#routeCupsFlavorsDateHeader').html(routeCupsFlavorsDateHeader);
                $('#routeCupsFlavorsVanNameHeader').html(routeCupsFlavorsVanNameHeader);
                $('#routeCupsFlavorsMachineNameHeader').html(r.type + ' - ' + r.brandName);


            }
            else {
                console.log("[fetchRouteCupsFlavorsBreadcrumbs ERROR]");
                console.log("[fetchRouteCupsFlavorsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchRouteCupsFlavorAdd": function(r) { 

            console.log("[fetchRouteCupsFlavorAdd callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorAdd SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorAdd redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorAdd redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavorAdd redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log("machine available flavors:" + r.machineAvailableFlavors.flavors.length);

                if (r.machineAvailableFlavors.flavors.length == 0) {
                    $('#modalDialogMessage').html('No flavors left to add.');
                    $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                    $('#modalDialog').popup("open");
                    return;
                }



                all = r.machineAvailableFlavors;
                var flavors = all.flavors;

                var output = '';
                $.each(flavors, function(index, value){                   

                    var fId = value.flavorId;
                    var fName = value.flavorName;

                    output += '<option value="'+ fId +'">' + fName + '</option>';
                });



                //update dropdown
                $("#routeCupsFlavorAddFlavorName").html(output);
                $("#routeCupsFlavorAddFlavorName").selectmenu('refresh');


            }
            else {
                console.log("[fetchRouteCupsFlavorAdd ERROR]");
                console.log("[fetchRouteCupsFlavorAdd message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchRouteCupsFlavorAddSubmit": function(r) { 

            console.log("[fetchRouteCupsFlavorAddSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorAddSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    // first check if the route is editable
                    if (r.resultcode === "ROUTE IS LOCKED") {

                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Route is locked - no changes can be made.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else if (r.resultcode === "FLAVOR DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Flavor no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else if (r.resultcode === "FLAVOR EXISTS FOR ROUTE MACHINE") {

                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsFlavorAddPage]");
                        $('#modalDialogMessage').html('Flavor no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorAddPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 

                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchRouteCupsFlavorAddSubmit redirecting to #routeCupsFlavorsPage]");
                $('#modalDialogMessage').html('Flavor added.');
                $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                $('#modalDialog').popup("open");

            }
            else {
                console.log("[fetchRouteCupsFlavorAddSubmit ERROR]");
                console.log("[fetchRouteCupsFlavorAddSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCupsFlavorEdit": function(r) { 

            console.log("[fetchRouteCupsFlavorEdit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorEdit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorEdit redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorEdit redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else if (r.resultcode === "FLAVOR NO LONGER ASSIGNED TO MACHINE") {

                        console.log("[fetchRouteCupsFlavorEdit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Flavor no longer assigned to machine.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavorEdit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                var flavorName = r.flavorName;
                var flavorQuantity = r.flavorQuantity;

                //update form inputs
                $("#routeCupsFlavorEditFlavorName").val(flavorName);
                $("#routeCupsFlavorEditFlavorQuantity").val(flavorQuantity);


            }
            else {
                console.log("[fetchRouteCupsFlavorEdit ERROR]");
                console.log("[fetchRouteCupsFlavorEdit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchRouteCupsFlavorUpdateSubmit": function(r) { 

            console.log("[fetchRouteCupsFlavorUpdateSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorUpdateSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    // first check if the route is editable
                    if (r.resultcode === "ROUTE IS LOCKED") {

                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Route is locked - no changes can be made.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 


                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else if (r.resultcode === "FLAVOR NO LONGER ASSIGNED TO MACHINE") {

                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsFlavorsPage]");
                $('#modalDialogMessage').html('Flavor updated.');
                $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                $('#modalDialog').popup("open");

            }
            else {
                console.log("[fetchRouteCupsFlavorUpdateSubmit ERROR]");
                console.log("[fetchRouteCupsFlavorUpdateSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchRouteCupsFlavorDeleteSubmit": function(r) { 

            console.log("[fetchRouteCupsFlavorDeleteSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCupsFlavorDeleteSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    // first check if the route is editable
                    if (r.resultcode === "ROUTE IS LOCKED") {

                        console.log("[fetchRouteCupsFlavorUpdateSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Route is locked - no changes can be made.');
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorDeleteSubmit redirecting to #routeCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCupsFlavorDeleteSubmit redirecting to #routeCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else if (r.resultcode === "FLAVOR NO LONGER ASSIGNED TO MACHINE") {

                        console.log("[fetchRouteCupsFlavorDeleteSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCupsFlavorDeleteSubmit redirecting to #routeCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchRouteCupsFlavorDeleteSubmit redirecting to #routeCupsFlavorsPage]");
                $('#modalDialogMessage').html('Flavor deleted.');
                $('#modalDialogRedirect').attr('href','#routeCupsFlavorsPage');
                $('#modalDialog').popup("open");

            }
            else {
                console.log("[fetchRouteCupsFlavorDeleteSubmit ERROR]");
                console.log("[fetchRouteCupsFlavorDeleteSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchRouteCoinsMachines": function(r) { 

            console.log("[fetchRouteCoinsMachines callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsMachines SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsMachines redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCoinsMachines redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
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

                    output += '<li id="'+ machineId +'"><a href="#routeCoinsLoadPage">' + type + ' - ' + brandName + '</a></li>';
                });

                //append list to ul
                $("#routeCoinsMachinesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchRouteCoinsMachines ERROR]");
                console.log("[fetchRouteCoinsMachines message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCoinsMachinesBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchRouteCoinsMachinesBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsMachinesBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsMachinesBreadcrumbs redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchRouteCoinsMachinesBreadcrumbs redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                localStorage["routeCoinsDate"] = r.date;
                localStorage["routeCoinsVanName"] = r.vanName;

                // write breadcrumbs
                $('#routeCoinsMachinesDateHeader').html(r.date);
                $('#routeCoinsMachinesVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchRouteCoinsMachinesBreadcrumbs ERROR]");
                console.log("[fetchRouteCoinsMachinesBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchRouteCoinsRoutes": function(r) { 

            console.log("[fetchRouteCoinsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsRoutes SUCCESS]");

                if (r.routes.length == 0) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var coinsStatus = value.coinsStatus;
                    var date = value.date;

                    output += '<li id="'+ rId +'"><a href="#routeCoinsMachinesPage">' +  date + ' - ' + vanName + ' (' +coinsStatus + ')</a></li>';

                });

                //append list to ul
                $("#routeCoinsRoutesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchRouteCoinsRoutes ERROR]");
                console.log("[fetchRouteCoinsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCoinsLoad": function(r) { 

            console.log("[fetchRouteCoinsLoad callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsLoad SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsLoad redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsLoad redirecting to #routeCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCoinsLoad redirecting to #routeCoinsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                var vanLoadCoinsStatus = r.vanLoadCoinsStatus;

                var inputIds = [];
                var output = '';

                var rollTypes = ['quarters','dimes','nickels','pennies'];

                console.log("[fetchRouteCoinsLoad vanLoadCoinsStatus:"+vanLoadCoinsStatus+"]");

                $.each(rollTypes, function(index,value){
                    if (value in r.machineCoins) {
                        console.log("[fetchRouteCoinsLoad:"+value+"]");
                        var rollQuantity = r.machineCoins[value].rollQuantity;
                        valueFirstLetterUppercased = value.charAt(0).toUpperCase() + value.slice(1);
                        $('#routeCoinsLoad' + valueFirstLetterUppercased ).val(rollQuantity);

                        // disable list item based on machine load status
                        if (vanLoadCoinsStatus == "Hold") {
                            $('#routeCoinsLoad' + valueFirstLetterUppercased + 'ListItem').prop('disabled',false).removeClass('ui-disabled');
                        }
                        else {
                            $('#routeCoinsLoad' + valueFirstLetterUppercased + 'ListItem').prop('disabled',true).addClass('ui-disabled');
                        }
                    }
                });

                // toggle update button based on van load status
                if(vanLoadCoinsStatus=="Hold") {
                    $("#routeCoinsLoadFormSubmitButton").button("enable");
                } 
                else {
                    $("#routeCoinsLoadFormSubmitButton").button("disable");
                }



            }
            else {
                console.log("[fetchRouteCoinsLoad ERROR]");
                console.log("[fetchRouteCoinsLoad message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchRouteCoinsLoadBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchRouteCoinsLoadBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsLoadBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsLoadBreadcrumbs redirecting to #routeCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchRouteCoinsLoadBreadcrumbs redirecting to #routeCoinsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // get from local storage
                var routeCoinsDateHeader = localStorage.getItem("routeCoinsDate");
                var routeCoinsVanNameHeader = localStorage.getItem("routeCoinsVanName");

                localStorage["routeCoinsMachineId"] = r.machineId;
                localStorage["routeCoinsMachineName"] = r.type + ' - ' + r.brandName;

                // write breadcrumbs
                $('#routeCoinsLoadDateHeader').html(routeCoinsDateHeader);
                $('#routeCoinsLoadVanNameHeader').html(routeCoinsVanNameHeader);
                $('#routeCoinsLoadMachineNameHeader').html(r.type + ' - ' + r.brandName);


            }
            else {
                console.log("[fetchRouteCoinsLoadBreadcrumbs ERROR]");
                console.log("[fetchRouteCoinsLoadBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchRouteCoinsLoadSubmit": function(r) { 

            console.log("[fetchRouteCoinsLoadSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsLoadSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsLoadSubmit redirecting to #routeCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchRouteCoinsLoadSubmit redirecting to #routeCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchRouteCoinsLoadSubmit redirecting to #routeCoinsLoadPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#routeCoinsLoadPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // enable submit button for future updates
                $("#routeCoinsLoadFormSubmitButton").button("enable");

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchRouteCoinsLoadSubmit redirecting to #routeCoinsMachinesPage]");
                $('#modalDialogMessage').html('Coin Load updated.');
                $('#modalDialogRedirect').attr('href','#routeCoinsMachinesPage');
                $('#modalDialog').popup("open");

            }
            else {
                console.log("[fetchRouteCoinsLoadSubmit ERROR]");
                console.log("[fetchRouteCoinsLoadSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },



        "fetchVanCupsRoutes": function(r) { 

            console.log("[fetchVanCupsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsRoutes SUCCESS]");

                if (r.routes.length == 0) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var confirmationOutput = '';
                var verificationOutput = '';
                var verifiedOutput = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;
                    console.log("[status:"+status +"]");

                    // don't list hold status routes
                    if(status == "Hold") {
                        // don't show it
                    }
                    else if(status == "Van Load Requested") {
                        confirmationOutput += '<li id="'+ rId +'"><a href="#vanCupsFlavorsPage">' +  date + ' - ' + vanName + '</a></li>';
                    }
                    else if (status == "Van Load Complete") {
                        verificationOutput += '<li id="'+ rId +'"><a href="#vanCupsFlavorsPage">' +  date + ' - ' + vanName + '</a></li>';
                    }
                    else {
                        verifiedOutput += '<li id="'+ rId +'"><a href="#vanCupsFlavorsPage">' +  date + ' - ' + vanName + '</a></li>';
                    }
                });

                

                //append list to ul
                if (confirmationOutput) {
                    $('#vanCupsRoutesPageConfirmationListHeader').html("Confirmation Requested:");
                    $("#vanCupsRoutesPageConfirmationList").html(confirmationOutput).promise().done(function () {
                        // refresh listview so that jq mobile applies styles to added li elements
                        $(this).listview("refresh");
                    });
                }
                //append list to ul
                if (verificationOutput) {
                    $('#vanCupsRoutesPageVerifictionListHeader').html("Verification Requested:");
                    $("#vanCupsRoutesPageVerificationList").html(verificationOutput).promise().done(function () {
                        // refresh listview so that jq mobile applies styles to added li elements
                        $(this).listview("refresh");
                    });
                }
                //append list to ul
                if (verifiedOutput) {
                    $('#vanCupsRoutesPageVerifiedListHeader').html("Confirmed & Verified:");
                    $("#vanCupsRoutesPageVerifiedList").html(verifiedOutput).promise().done(function () {
                        // refresh listview so that jq mobile applies styles to added li elements
                        $(this).listview("refresh");
                    });
                }


            }
            else {
                console.log("[fetchVanCupsRoutes ERROR]");
                console.log("[fetchVanCupsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchVanCupsFlavors": function(r) { 

            console.log("[fetchVanCupsFlavors callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsFlavors SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchVanCupsFlavors redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCupsFlavors redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.vanFlavors.length == 0) {
                    $('#modalDialogBackMessage').html("No flavors available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var vanLoadStatus = r.vanLoadStatus;

                var inputIds = [];
                var output = '';
                $.each(r.vanFlavors, function(index, value){                   

                    var flavorId = index;
                    var flavorName = value.flavorName;
                    var flavorQuantity = value.flavorQuantity;
                    var brandName = value.brandName;

                    if (vanLoadStatus == "Van Load Requested") {
                        // this field should never be editable, but at least make the list item active
                        output += '<li> <label for="flavor' + flavorId + '">' + brandName + ' - ' + flavorName + ':</label>' +
                                        '<input class="ui-disabled" type="number" name="flavor' + flavorId + '" id="flavor' + flavorId + '" value="' +
                                        flavorQuantity + '" required digits readonly/> </li>';
                    }
                    else {
                        // disable the entire list element based on van load status
                        output += '<li class="ui-disabled"> <label for="flavor' + flavorId + '">' + brandName + ' - ' + flavorName + ':</label>' +
                                        '<input type="number" name="flavor' + flavorId + '" id="flavor' + flavorId + '" value="' +
                                        flavorQuantity + '" required digits readonly/> </li>';
                    }

                    // loop over these later to refresh jquery mobile text box styling
                    inputIds.push( "flavor" + flavorId );

                });

                //append list to ul
                $("#vanCupsFlavorsFormList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");

                    // jquery refresh each form input
                    for ( i=0;i<inputIds.length;++i ) {
                        $('#'+inputIds[i]).textinput();
                    }

                });



            }
            else {
                console.log("[fetchVanCupsFlavors ERROR]");
                console.log("[fetchVanCupsFlavors message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchVanCupsFlavorsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchVanCupsFlavorsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsFlavorsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchVanCupsFlavorsBreadcrumbs redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to vanCupsRoutesPage
                        console.log("[fetchVanCupsFlavorsBreadcrumbs redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // no other pages after this, so no need to write to local storage

                // breadcrumbs
                $('#vanCupsFlavorsDateHeader').html(r.date);
                $('#vanCupsFlavorsVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchVanCupsFlavorsBreadcrumbs ERROR]");
                console.log("[fetchVanCupsFlavorsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchVanCupsFlavorsUnlockConfirmButton": function(r) { 

            console.log("[fetchVanCupsFlavorsUnlockConfirmButton callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsFlavorsUnlockConfirmButton SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchVanCupsFlavorsUnlockConfirmButton redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to vanCupsRoutesPage
                        console.log("[fetchVanCupsFlavorsUnlockConfirmButton redirecting to #vanCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log('[Van Load Status:'+ r.status +']');

                // get latest vanLoadStatus
                // if vanLoadStatus is 'Van Load Requested', then unlock both confirm buttons: vanCupsFlavorsLoadConfirmSubmitButton
                // if vanLoadStatus is 'Van Load Complete', then unlock just driver confirm button: vanCupsFlavorsLoadDriverConfirmSubmitButton

                // shouldn't be able to get to this form if hold status, but account for it anyway
                if (r.status == 'Hold') {
                    // update status 
                    $('#vanCupsFlavorsVanLoadStatus').html('Not Confirmed');
                    $('#vanCupsFlavorsVanLoadStatusDriver').html('Not Confirmed');
                    // disable both
                    $("#vanCupsFlavorsLoadConfirmSubmitButton").button("disable");
                    $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("disable");
                    return;
                }
                // unlock both buttons
                else if (r.status == 'Van Load Requested') {
                    // update status 
                    $('#vanCupsFlavorsVanLoadStatus').html('Not Confirmed');
                    $('#vanCupsFlavorsVanLoadStatusDriver').html('Not Confirmed');
                    // enable button
                    $("#vanCupsFlavorsLoadConfirmSubmitButton").button("enable");
                    $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("disable");
                    return;
                }
                // unlock one button
                else if (r.status == 'Van Load Complete') {
                    // update status 
                    $('#vanCupsFlavorsVanLoadStatus').html('Confirmed');
                    $('#vanCupsFlavorsVanLoadStatusDriver').html('Not Confirmed');
                    // enable one disable the other
                    $("#vanCupsFlavorsLoadConfirmSubmitButton").button("disable");
                    $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("enable");
                    return;
                }
                else if (r.status == 'Van Load Verified') {
                    // update status 
                    $('#vanCupsFlavorsVanLoadStatus').html('Confirmed');
                    $('#vanCupsFlavorsVanLoadStatusDriver').html('Confirmed');
                    // both disabled
                    $("#vanCupsFlavorsLoadConfirmSubmitButton").button("disable");
                    $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("disable");
                }
                else {
                    // update status 
                    $('#vanCupsFlavorsVanLoadStatus').html('Unknown');
                    $('#vanCupsFlavorsVanLoadStatusDriver').html('Unknown');
                    // both disabled
                    $("#vanCupsFlavorsLoadConfirmSubmitButton").button("disable");
                    $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("disable");
                }


            }
            else {
                console.log("[fetchVanCupsFlavorsUnlockConfirmButton ERROR]");
                console.log("[fetchVanCupsFlavorsUnlockConfirmButton message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


        "fetchVanCupsFlavorsConfirmSubmit": function(r) { 

            console.log("[fetchVanCupsFlavorsConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsFlavorsConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchVanCupsFlavorsConfirmSubmit redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCupsFlavorsConfirmSubmit redirecting to #vanCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to same page page
                console.log("[fetchVanCupsFlavorsConfirmSubmit redirecting to #vanCupsFlavorsPage]");
                $('#modalDialogMessage').html('Van Load confirmed.');
                $('#modalDialogRedirect').attr('href','#vanCupsFlavorsPage');
                $('#modalDialog').popup("open");

                // update status div and re-enable driver confirm button
                $('#vanCupsFlavorsVanLoadStatus').html('Confirmed');
                $("#vanCupsFlavorsLoadDriverConfirmSubmitButton").button("enable");

            }
            else {
                console.log("[fetchVanCupsFlavorsConfirmSubmit ERROR]");
                console.log("[fetchVanCupsFlavorsConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchVanCupsFlavorsDriverConfirmSubmit": function(r) { 

            console.log("[fetchVanCupsFlavorsDriverConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchVanCupsFlavorsDriverConfirmSubmit redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCupsFlavorsDriverConfirmSubmit redirecting to #vanCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to same page page
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit redirecting to #vanCupsFlavorsPage]");
                $('#modalDialogMessage').html('Driver Confirm Van Load Complete.');
                $('#modalDialogRedirect').attr('href','#vanCupsFlavorsPage');
                $('#modalDialog').popup("open");

                // update flash message status
                $('#vanCupsFlavorsVanLoadStatusDriver').html('Confirmed');

            }
            else {
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit ERROR]");
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


        "fetchVanCoinsRoutes": function(r) { 

            console.log("[fetchVanCoinsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsRoutes SUCCESS]");

                if (r.routes.length == 0) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var coinsStatus = value.coinsStatus;
                    var date = value.date;

                    // disable link if the route is "hold" status
                    if(coinsStatus == 'Hold') {
                        output += '<li class="ui-disabled" id="'+ rId +'"><a href="#vanCoinsLoadPage">' +  date + ' - ' + vanName + ' (' +coinsStatus + ')</a></li>';
                    }
                    else {
                        output += '<li id="'+ rId +'"><a href="#vanCoinsLoadPage">' +  date + ' - ' + vanName + ' (' +coinsStatus + ')</a></li>';
                    }
                });

                //append list to ul
                $("#vanCoinsRoutesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchVanCoinsRoutes ERROR]");
                console.log("[fetchVanCoinsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchVanCoinsLoad": function(r) { 

            console.log("[fetchVanCoinsLoad callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsLoad SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchVanCoinsLoad redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCoinsLoad redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // toggle form field visibility based on van load status
                var vanLoadCoinsStatus = r.vanLoadCoinsStatus;

                var inputIds = [];
                var output = '';

                var rollTypes = ['quarters','dimes','nickels','pennies'];

                $.each(rollTypes, function(index,value){
                    if (value in r.vanCoins) {
                        console.log("[fetchVanCoinsLoad:"+value+"]");
                        var rollQuantity = r.vanCoins[value].rollQuantity;
                        valueFirstLetterUppercased = value.charAt(0).toUpperCase() + value.slice(1);

                        $('#vanCoinsLoad' + valueFirstLetterUppercased ).val(rollQuantity);

                        // disable list items based on van load status
                        if(vanLoadCoinsStatus=="Van Load Requested") {
                            $('#vanCoinsLoad' + valueFirstLetterUppercased + 'ListItem' ).prop('disabled',false).removeClass('ui-disabled');
                            // input field for van load ui is read only
                             $('#vanCoinsLoad' + valueFirstLetterUppercased ).prop('disabled',true).addClass('ui-disabled');
                        }
                        else {
                            $('#vanCoinsLoad' + valueFirstLetterUppercased + 'ListItem' ).prop('disabled',true).addClass('ui-disabled');
                        }
                    }
                });

                //$(this).listview("refresh");



            }
            else {
                console.log("[fetchVanCoinsLoad ERROR]");
                console.log("[fetchVanCoinsLoad message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchVanCoinsLoadBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchVanCoinsLoadBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsLoadBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchVanCoinsLoadBreadcrumbs redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to vanCupsRoutesPage
                        console.log("[fetchVanCoinsLoadBreadcrumbs redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // no other pages after this, so no need to write to local storage

                // breadcrumbs
                $('#vanCoinsLoadDateHeader').html(r.date);
                $('#vanCoinsLoadVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchVanCoinsLoadBreadcrumbs ERROR]");
                console.log("[fetchVanCoinsLoadBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchVanCoinsLoadUnlockConfirmButton": function(r) { 

            console.log("[fetchVanCoinsLoadUnlockConfirmButton callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsLoadUnlockConfirmButton SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchVanCoinsLoadUnlockConfirmButton redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to vanCoinsRoutesPage
                        console.log("[fetchVanCoinsLoadUnlockConfirmButton redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log('[Van Coins Load Status:'+ r.coinsStatus +']');

                // get latest vanLoadStatus
                // if vanLoadStatus is 'Van Load Requested', then unlock both confirm buttons: vanCoinsLoadConfirmSubmitButton
                // if vanLoadStatus is 'Van Load Complete', then unlock just driver confirm button: vanCoinsLoadDriverConfirmSubmitButton

                // shouldn't be able to get to this form if hold status, but account for it anyway
                if (r.coinsStatus == 'Hold') {
                    // update status 
                    $('#vanCoinsLoadVanLoadStatus').html('Not Confirmed');
                    $('#vanCoinsLoadVanLoadStatusDriver').html('Not Confirmed');
                    // disable both
                    $("#vanCoinsLoadConfirmSubmitButton").button("disable");
                    $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");
                    return;
                }
                // unlock both buttons
                else if (r.coinsStatus == 'Van Load Requested') {
                    // update status 
                    $('#vanCoinsLoadVanLoadStatus').html('Not Confirmed');
                    $('#vanCoinsLoadVanLoadStatusDriver').html('Not Confirmed');
                    // enable button
                    $("#vanCoinsLoadConfirmSubmitButton").button("enable");
                    $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");
                    return;
                }
                // unlock one button
                else if (r.coinsStatus == 'Van Load Complete') {
                    // update status 
                    $('#vanCoinsLoadVanLoadStatus').html('Confirmed');
                    $('#vanCoinsLoadVanLoadStatusDriver').html('Not Confirmed');
                    // enable one disable the other
                    $("#vanCoinsLoadConfirmSubmitButton").button("disable");
                    $("#vanCoinsLoadDriverConfirmSubmitButton").button("enable");
                    return;
                }
                else if (r.coinsStatus == 'Van Load Verified') {
                    // update status 
                    $('#vanCoinsLoadVanLoadStatus').html('Confirmed');
                    $('#vanCoinsLoadVanLoadStatusDriver').html('Confirmed');
                    // both disabled
                    $("#vanCoinsLoadConfirmSubmitButton").button("disable");
                    $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");
                }
                else {
                    // update status 
                    $('#vanCoinsLoadVanLoadStatus').html('Unknown');
                    $('#vanCoinsLoadVanLoadStatusDriver').html('Unknown');
                    // both disabled
                    $("#vanCoinsLoadConfirmSubmitButton").button("disable");
                    $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");
                }


            }
            else {
                console.log("[fetchVanCoinsUnlockConfirmButton ERROR]");
                console.log("[fetchVanCoinsUnlockConfirmButton message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


        "fetchVanCoinsLoadConfirmSubmit": function(r) { 

            console.log("[fetchVanCoinsLoadConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsLoadConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchVanCoinsLoadConfirmSubmit redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCoinsLoadConfirmSubmit redirecting to #vanCoinsLoadPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCoinsLoadPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // confirmed coins loaded in van - show modal dialog and send to same page page
                console.log("[fetchVanCoinsLoadConfirmSubmit redirecting to #vanCoinsLoadPage]");
                $('#modalDialogMessage').html('Van Load confirmed.');
                $('#modalDialogRedirect').attr('href','#vanCoinsLoadPage');
                $('#modalDialog').popup("open");

                // update flash message and enable driver confirm submit button
                $('#vanCoinsLoadVanLoadStatus').html('Confirmed');
                $("#vanCoinsLoadDriverConfirmSubmitButton").button("enable");


            }
            else {
                console.log("[fetchVanCoinsLoadConfirmSubmit ERROR]");
                console.log("[fetchVanCoinsLoadConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchVanCoinsLoadDriverConfirmSubmit": function(r) { 

            console.log("[fetchVanCoinsLoadDriverConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchVanCoinsLoadDriverConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchVanCoinsLoadDriverConfirmSubmit redirecting to #vanCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#vanCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchVanCoinsLoadDriverConfirmSubmit redirecting to #vanCoinsLoadPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#vanCoinsLoadPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // verified coins loaded in van - show modal dialog and send to same page page
                console.log("[fetchVanCoinsLoadDriverConfirmSubmit redirecting to #vanCoinsLoadPage]");
                $('#modalDialogMessage').html('Driver Confirm Van Load Complete.');
                $('#modalDialogRedirect').attr('href','#vanCoinsLoadPage');
                $('#modalDialog').popup("open");

                // update flash message and disable driver confirm button
                $('#vanCoinsLoadVanLoadStatusDriver').html('Confirmed');
                $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");

            }
            else {
                console.log("[fetchVanCoinsLoadDriverConfirmSubmit ERROR]");
                console.log("[fetchVanCoinsLoadDriverConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },



        "fetchMachineCupsRoutes": function(r) { 

            console.log("[fetchMachineCupsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsRoutes SUCCESS]");

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

                    // disable viewing and editing of routes that are in status hold
                    if (status=="Hold") {
                        output += '<li class="ui-disabled" id="'+ rId +'"><a href="#machineCupsLocationsPage">' +  date + ' - ' + vanName + ' (' +status + ')</a></li>';
                    }
                    else {
                        output += '<li id="'+ rId +'"><a href="#machineCupsLocationsPage">' +  date + ' - ' + vanName + ' (' +status + ')</a></li>';
                    }
                });

                //append list to ul
                $("#machineCupsRoutesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchMachineCupsRoutes ERROR]");
                console.log("[fetchMachineCupsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsLocations": function(r) { 

            console.log("[fetchMachineCupsLocations callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsLocations SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsLocations redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to machineCupsRoutesPage
                        console.log("[fetchMachineCupsLocations redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.routeLocations.length == 0) {
                    $('#modalDialogBackMessage').html("No locations available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                var vanLoadStatus = r.vanLoadStatus;
                $.each(r.routeLocations, function(index, value){                   

                    var routeLocationId = value.routeLocationId;
                    var addressAbbrev = value.addressAbbrev;

                    // disable viewing/editing machine info if van load has not been verified
                    if(vanLoadStatus == "Van Load Verified") {
                        output += '<li id="'+ routeLocationId +'"><a href="#machineCupsMachinesPage">' + addressAbbrev + '</a></li>';
                    }
                    else {
                        output += '<li class="ui-disabled" id="'+ routeLocationId +'"><a href="#machineCupsMachinesPage">' + addressAbbrev + '</a></li>';
                    }

                });

                //append list to ul
                $("#machineCupsLocationsPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchMachineCupsLocations ERROR]");
                console.log("[fetchMachineCupsLocations message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsLocationsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCupsLocationsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsLocationsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsLocationsBreadcrumbs redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to machineCupsRoutesPage
                        console.log("[fetchMachineCupsLocationsBreadcrumbs redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["machineCupsDate"] = r.date;
                localStorage["machineCupsVanName"] = r.vanName;

                // breadcrumbs
                $('#machineCupsLocationDateHeader').html(r.date);
                $('#machineCupsLocationVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchMachineCupsLocationsBreadcrumbs ERROR]");
                console.log("[fetchMachineCupsLocationsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchMachineCupsMachines": function(r) { 

            console.log("[fetchMachineCupsMachines callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsMachines SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCupsMachines redirecting to #machineCupsLocationsPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsLocationsPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCupsMachines redirecting to #machineCupsLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsLocationsPage');
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

                    output += '<li id="'+ machineId +'"><a href="#machineCupsFlavorsPage">' + type + ' - ' + brandName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                });

                //append list to ul
                $("#machineCupsMachinesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchMachineCupsMachines ERROR]");
                console.log("[fetchMachineCupsMachines message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsMachinesBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCupsMachinesBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsMachinesBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCupsMachinesBreadcrumbs redirecting to #machineCupsRouteLocationsPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRouteLocationsPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCupsMachinesBreadcrumbs redirecting to #machineCupsRouteLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsRouteLocationsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["machineCupsAddressAbbrev"] = r.addressAbbrev;
                var machineCupsMachinesAddressAbbrevHeader = r.addressAbbrev;

                // get from local storage
                var machineCupsMachinesDateHeader = localStorage.getItem("machineCupsDate");
                var machineCupsMachinesVanNameHeader = localStorage.getItem("machineCupsVanName");

                // write breadcrumbs
                $('#machineCupsMachinesDateHeader').html(machineCupsMachinesDateHeader);
                $('#machineCupsMachinesVanNameHeader').html(machineCupsMachinesVanNameHeader);
                $('#machineCupsMachinesAddressAbbrevHeader').html(machineCupsMachinesAddressAbbrevHeader);


            }
            else {
                console.log("[fetchMachineCupsMachinesBreadcrumbs ERROR]");
                console.log("[fetchMachineCupsMachinesBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsFlavors": function(r) { 

            console.log("[fetchMachineCupsFlavors callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsFlavors SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavors redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavors redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCupsFlavors redirecting to #machineCupsLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsLocationsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.machineFlavors.length == 0) {
                    $('#modalDialogBackMessage').html("No flavors available to display.");
                    $('#modalDialogBack').popup("open");
                }

                // value determines whether form fields are editable or not
                var machineFlavorsLoadStatus = r.machineFlavorsLoadStatus;

                var inputIds = [];
                var output = '';
                $.each(r.machineFlavors, function(index, value){                   

                    var machineFlavorLoadId = value.machineFlavorLoadId;
                    var flavorId = value.flavorId;
                    var flavorName = value.flavorName;
                    var flavorQuantity = value.flavorQuantity;
                    var flavorQuantityLoaded = value.flavorQuantityLoaded;

                    // lock form inputs
                    if (machineFlavorsLoadStatus == "Machine Load Complete") {
                        output += '<li class="ui-disabled"> <label for="flavor' + flavorId + '">' + flavorName + ' ('+flavorQuantity+'):</label>' +
                                    '<input type="number" name="flavor' + flavorId + '" id="flavor' + flavorId + '" value="' +
                                    flavorQuantityLoaded + '" required digits/> </li>';
                    }
                    // don't lock them
                    else {
                        output += '<li> <label for="flavor' + flavorId + '">' + flavorName + ' ('+flavorQuantity+'):</label>' +
                                    '<input type="number" name="flavor' + flavorId + '" id="flavor' + flavorId + '" value="' +
                                    flavorQuantityLoaded + '" required digits/> </li>';
                    }

                    // loop over these later to refresh jquery mobile text box styling
                    inputIds.push( "flavor" + flavorId );

                });

                //append list to ul
                $("#machineCupsFlavorsFormList").html(output).promise().done(function () {

                    // jquery refresh each form input
                    for ( i=0;i<inputIds.length;++i ) {
                        $('#'+inputIds[i]).textinput();
                    }

                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");

                });



            }
            else {
                console.log("[fetchMachineCupsFlavors ERROR]");
                console.log("[fetchMachineCupsFlavors message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsFlavorsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCupsFlavorsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsFlavorsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavorsBreadcrumbs redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCupsFlavorsBreadcrumbs redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                //localStorage["machineCupsAddressAbbrev"] = r.addressAbbrev;

                // get from local storage
                var machineCupsFlavorsDateHeader = localStorage.getItem("machineCupsDate");
                var machineCupsFlavorsVanNameHeader = localStorage.getItem("machineCupsVanName");
                var machineCupsFlavorsAddressAbbrevHeader = localStorage.getItem("machineCupsAddressAbbrev"); 

                // write breadcrumbs
                $('#machineCupsFlavorsDateHeader').html(machineCupsFlavorsDateHeader);
                $('#machineCupsFlavorsVanNameHeader').html(machineCupsFlavorsVanNameHeader);
                $('#machineCupsFlavorsAddressAbbrevHeader').html(machineCupsFlavorsAddressAbbrevHeader);
                $('#machineCupsFlavorsMachineNameHeader').html(r.type + ' - ' + r.brandName);


            }
            else {
                console.log("[fetchMachineCupsFlavorsBreadcrumbs ERROR]");
                console.log("[fetchMachineCupsFlavorsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCupsFlavorsUnlockConfirmButton": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCupsFlavorsUnlockConfirmButton callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsFlavorsUnlockConfirmButton SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavorsUnlockConfirmButton redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCupsFlavorsUnlockConfirmButton redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log('[Machine Load Status:'+ r.status +']');


                // if status is Machine Load Complete, do nothing
                if (r.status == 'Machine Load Complete') {
                    // update status 
                    $('#machineCupsFlavorsMachineLoadStatus').html(r.status);
                    // make sure button is disabled
                    $("#machineCupsFlavorsConfirmSubmitButton").button("disable");
                    return;
                }

                // unlock machineCupsFlavorsConfirmSubmitButton 
                $('#machineCupsFlavorsMachineLoadStatus').html('Machine Not Loaded');
                console.log('[fetchMachineCupsFlavorsUnlockConfirmButton - unlocking submit button]');
                $("#machineCupsFlavorsConfirmSubmitButton").button('enable');

            }
            else {
                console.log("[fetchMachineCupsFlavorsUnlockConfirmButton ERROR]");
                console.log("[fetchMachineCupsFlavorsUnlockConfirmButton message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },
        "fetchMachineCupsFlavorsConfirmSubmit": function(r) { 

            console.log("[fetchMachineCupsFlavorsConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsFlavorsConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavorsConfirmSubmit redirecting to #machineCupsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCupsFlavorsConfirmSubmit redirecting to #machineCupsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCupsFlavorsConfirmSubmit redirecting to #machineCupsFlavorsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCupsFlavorsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchMachineCupsFlavorsConfirmSubmit redirecting to #machineCupsFlavorsPage]");
                $('#modalDialogMessage').html('Flavor Load confirmed.');
                $('#modalDialogRedirect').attr('href','#machineCupsFlavorsPage');
                $('#modalDialog').popup("open");

                // update flash message
                $('#machineCupsFlavorsMachineLoadStatus').html('Machine Load Complete');

            }
            else {
                console.log("[fetchMachineCupsFlavorsConfirmSubmit ERROR]");
                console.log("[fetchMachineCupsFlavorsConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchMachineCoinsRoutes": function(r) { 

            console.log("[fetchMachineCoinsRoutes callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsRoutes SUCCESS]");

                if (r.routes.length == 0) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var output = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var coinsStatus = value.coinsStatus;
                    var date = value.date;

                    // disable viewing and editing of any route with "van load coins status" of hold
                    if (coinsStatus=="Hold") {
                        output += '<li class="ui-disabled" id="'+ rId +'"><a href="#machineCoinsLocationsPage">' +  date + ' - ' + vanName + ' (' +coinsStatus + ')</a></li>';
                    }
                    else {
                        output += '<li id="'+ rId +'"><a href="#machineCoinsLocationsPage">' +  date + ' - ' + vanName + ' (' +coinsStatus + ')</a></li>';
                    }
                });

                //append list to ul
                $("#machineCoinsRoutesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });


            }
            else {
                console.log("[fetchMachineCoinsRoutes ERROR]");
                console.log("[fetchMachineCoinsRoutes message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsLocations": function(r) { 

            console.log("[fetchMachineCoinsLocations callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLocations SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLocations redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to machineCoinsRoutesPage
                        console.log("[fetchMachineCoinsLocations redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                if (r.routeLocations.length == 0) {
                    $('#modalDialogBackMessage').html("No locations available to display.");
                    $('#modalDialogBack').popup("open");
                }

                // use this to turn route viewing/editing on or off
                var vanLoadStatus = r.vanLoadStatus;

                var output = '';
                $.each(r.routeLocations, function(index, value){                   

                    var routeLocationId = value.routeLocationId;
                    var addressAbbrev = value.addressAbbrev;

                    // use this to turn route viewing/editing on or off 
                    if(vanLoadStatus == "Van Load Verified") {
                        output += '<li id="'+ routeLocationId +'"><a href="#machineCoinsMachinesPage">' + addressAbbrev + '</a></li>';
                    }
                    else {
                        output += '<li class="ui-disabled" id="'+ routeLocationId +'"><a href="#machineCoinsMachinesPage">' + addressAbbrev + '</a></li>';
                    }
                });

                //append list to ul
                $("#machineCoinsLocationsPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchMachineCoinsLocations ERROR]");
                console.log("[fetchMachineCoinsLocations message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsLocationsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCoinsLocationsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLocationsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLocationsBreadcrumbs redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward to machineCoinsRoutesPage
                        console.log("[fetchMachineCoinsLocationsBreadcrumbs redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["machineCoinsDate"] = r.date;
                localStorage["machineCoinsVanName"] = r.vanName;

                // breadcrumbs
                $('#machineCoinsLocationDateHeader').html(r.date);
                $('#machineCoinsLocationVanNameHeader').html(r.vanName);


            }
            else {
                console.log("[fetchMachineCoinsLocationsBreadcrumbs ERROR]");
                console.log("[fetchMachineCoinsLocationsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },


       "fetchMachineCoinsMachines": function(r) { 

            console.log("[fetchMachineCoinsMachines callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsMachines SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsMachines redirecting to #machineCoinsLocationsPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsLocationsPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCoinsMachines redirecting to #machineCoinsLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsLocationsPage');
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

                    output += '<li id="'+ machineId +'"><a href="#machineCoinsFlavorsPage">' + type + ' - ' + brandName + '</a></li>';
                });

                //append list to ul
                $("#machineCoinsMachinesPageList").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });



            }
            else {
                console.log("[fetchMachineCoinsMachines ERROR]");
                console.log("[fetchMachineCoinsMachines message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsMachinesBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCoinsMachinesBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsMachinesBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsMachinesBreadcrumbs redirecting to #machineCoinsRouteLocationsPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRouteLocationsPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCoinsMachinesBreadcrumbs redirecting to #machineCoinsRouteLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsRouteLocationsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["machineCoinsAddressAbbrev"] = r.addressAbbrev;
                var machineCoinsMachinesAddressAbbrevHeader = r.addressAbbrev;

                // get from local storage
                var machineCoinsMachinesDateHeader = localStorage.getItem("machineCoinsDate");
                var machineCoinsMachinesVanNameHeader = localStorage.getItem("machineCoinsVanName");

                // write breadcrumbs
                $('#machineCoinsMachinesDateHeader').html(machineCoinsMachinesDateHeader);
                $('#machineCoinsMachinesVanNameHeader').html(machineCoinsMachinesVanNameHeader);
                $('#machineCoinsMachinesAddressAbbrevHeader').html(machineCoinsMachinesAddressAbbrevHeader);


            }
            else {
                console.log("[fetchMachineCoinsMachinesBreadcrumbs ERROR]");
                console.log("[fetchMachineCoinsMachinesBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsLoadPickupOptionsBreadcrumbs": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                // save to local storage
                localStorage["machineCoinsMachineName"] = r.type + ' - ' + r.brandName;

                // get from local storage
                var machineCoinsLoadPickupOptionsDateHeader = localStorage.getItem("machineCoinsDate");
                var machineCoinsLoadPickupOptionsVanNameHeader = localStorage.getItem("machineCoinsVanName");
                var machineCoinsLoadPickupOptionsAddressAbbrevHeader = localStorage.getItem("machineCoinsAddressAbbrev"); 

                // write breadcrumbs
                $('#machineCoinsLoadPickupOptionsDateHeader').html(machineCoinsLoadPickupOptionsDateHeader);
                $('#machineCoinsLoadPickupOptionsVanNameHeader').html(machineCoinsLoadPickupOptionsVanNameHeader);
                $('#machineCoinsLoadPickupOptionsAddressAbbrevHeader').html(machineCoinsLoadPickupOptionsAddressAbbrevHeader);
                $('#machineCoinsLoadPickupOptionsMachineNameHeader').html(r.type + ' - ' + r.brandName);


            }
            else {
                console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs ERROR]");
                console.log("[fetchMachineCoinsLoadPickupOptionsBreadcrumbs message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsLoad": function(r) { 

            console.log("[fetchMachineCoinsLoad callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLoad SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoad redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoad redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCoinsLoad redirecting to #machineCoinsLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsLocationsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                var machineCoinsLoadStatus = r.machineCoinsLoadStatus;

                var inputIds = [];
                var output = '';

                var rollTypes = ['quarters','dimes','nickels','pennies'];

                $.each(rollTypes, function(index,value){
                    if (value in r.machineCoins) {
                        console.log("[fetchMachineCoinsLoad:"+value+"]");
                        var rollQuantity = r.machineCoins[value].rollQuantity;
                        var rollQuantityLoaded = r.machineCoins[value].rollQuantityLoaded;
                        valueFirstLetterUppercased = value.charAt(0).toUpperCase() + value.slice(1);
                        $('#machineCoinsToLoad' + valueFirstLetterUppercased ).html(rollQuantity);
                        $('#machineCoinsLoad' + valueFirstLetterUppercased ).val(rollQuantityLoaded);

                        // disable list item based on machine load status
                        if(machineCoinsLoadStatus=="Machine Load Complete") {
                            $('#machineCoinsLoad' + valueFirstLetterUppercased + 'ListItem' ).prop('disabled',true).addClass('ui-disabled');
                        }
                        else {
                            $('#machineCoinsLoad' + valueFirstLetterUppercased + 'ListItem' ).prop('disabled',false).removeClass('ui-disabled');
                        }

                    }
                });

                //$(this).listview("refresh");



            }
            else {
                console.log("[fetchMachineCoinsLoad ERROR]");
                console.log("[fetchMachineCoinsLoad message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchMachineCoinsLoadConfirmSubmit": function(r) { 

            console.log("[fetchMachineCoinsLoadConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLoadConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoadConfirmSubmit redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoadConfirmSubmit redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCoinsLoadConfirmSubmit redirecting to #machineCoinsLoadPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsLoadPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // machine coins load confirmed - show modal dialog 
                console.log("[fetchMachineCoinsLoadConfirmSubmit redirecting to #machineCoinsLoadPage]");
                $('#modalDialogMessage').html('Coin Load confirmed.');
                $('#modalDialogRedirect').attr('href','#machineCoinsLoadPage');
                $('#modalDialog').popup("open");

                // update flash message
                $('#machineCoinsLoadMachineLoadStatus').html('Machine Load Complete');

            }
            else {
                console.log("[fetchMachineCoinsLoadConfirmSubmit ERROR]");
                console.log("[fetchMachineCoinsLoadConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },



       "fetchMachineCoinsLoadUnlockConfirmButton": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCoinsLoadUnlockConfirmButton callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsLoadUnlockConfirmButton SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsLoadUnlockConfirmButton redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCoinsLoadUnlockConfirmButton redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log('[Machine Load Status:'+ r.status +']');


                // if status is Machine Load Complete, do nothing
                if (r.status == 'Machine Load Complete') {
                    // update status 
                    $('#machineCoinsLoadMachineLoadStatus').html(r.status);
                    // make sure button is disabled
                    $("#machineCoinsLoadConfirmSubmitButton").button("disable");

                    return;
                }

                // unlock machineCupsFlavorsConfirmSubmitButton 
                $('#machineCoinsLoadMachineLoadStatus').html('Machine Not Loaded');
                console.log('[fetchMachineCoinsLoadUnlockConfirmButton - unlocking submit button]');

                $("#machineCoinsLoadConfirmSubmitButton").button('enable');

            }
            else {
                console.log("[fetchMachineCoinsLoadUnlockConfirmButton ERROR]");
                console.log("[fetchMachineCoinsLoadUnlockConfirmButton message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsPickup": function(r) { 

            console.log("[fetchMachineCoinsPickup callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsPickup SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsPickup redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsPickup redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCoinsPickup redirecting to #machineCoinsLocationsPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsLocationsPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                var inputIds = [];
                var output = '';

                var rollTypes = ['quarters','dimes','nickels','pennies'];

                $.each(rollTypes, function(index,value){
                    if (value in r.machineCoins) {
                        console.log("[fetchMachineCoinsPickup:"+value+"]");
                        var rollQuantity = r.machineCoins[value].rollQuantity;
                        var rollQuantityLoaded = r.machineCoins[value].rollQuantityLoaded;
                        valueFirstLetterUppercased = value.charAt(0).toUpperCase() + value.slice(1);
                        $('#machineCoinsToPickup' + valueFirstLetterUppercased ).html(rollQuantity);
                        $('#machineCoinsPickup' + valueFirstLetterUppercased ).val(rollQuantityLoaded);
                    }
                });

                //$(this).listview("refresh");



            }
            else {
                console.log("[fetchMachineCoinsPickup ERROR]");
                console.log("[fetchMachineCoinsPickup message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

        "fetchMachineCoinsPickupConfirmSubmit": function(r) { 

            console.log("[fetchMachineCoinsPickupConfirmSubmit callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsPickupConfirmSubmit SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "ROUTE LOCATION DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsPickupConfirmSubmit redirecting to #machineCoinsRoutesPage]");
                        $('#modalDialogMessage').html('Route Location no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsRoutesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsPickupConfirmSubmit redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    } 
                    else {
                        // unrecognized error - 
                        console.log("[fetchMachineCoinsPickupConfirmSubmit redirecting to #machineCoinsPickupPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsPickupPage');
                        $('#modalDialog').popup("open");
                        return;

                    }

                }

                // coins removed from machine - show modal dialog and send to pickup page
                console.log("[fetchMachineCoinsPickupConfirmSubmit redirecting to #machineCoinsPickupPage]");
                $('#modalDialogMessage').html('Coin Pick Up confirmed.');
                $('#modalDialogRedirect').attr('href','#machineCoinsPickupPage');
                $('#modalDialog').popup("open");

            }
            else {
                console.log("[fetchMachineCoinsPickupConfirmSubmit ERROR]");
                console.log("[fetchMachineCoinsPickupConfirmSubmit message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },

       "fetchMachineCoinsPickupUnlockConfirmButton": function(r) { 

            // retrieve route date and vanName for breadcrumbs 
            console.log("[fetchMachineCoinsPickupUnlockConfirmButton callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCoinsPickupUnlockConfirmButton SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    if (r.resultcode === "MACHINE DOES NOT EXIST") {

                        console.log("[fetchMachineCoinsPickupUnlockConfirmButton redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html('Machine no longer exists.');
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;
                    }
                    else {
                        // unrecognized error - forward 
                        console.log("[fetchMachineCoinsPickupUnlockConfirmButton redirecting to #machineCoinsMachinesPage]");
                        $('#modalDialogMessage').html(r.resultcode);
                        $('#modalDialogRedirect').attr('href','#machineCoinsMachinesPage');
                        $('#modalDialog').popup("open");
                        return;

                    }
                }

                console.log('[Machine Load Status:'+ r.status +']');

                // if status is Machine Load Complete, do nothing
                if (r.status == 'Machine Removal Complete') {
                    // update status 
                    $('#machineCoinsLoadMachinePickupStatus').html(r.status);
                    // make sure button is disabled
                    $("#machineCoinsPickupConfirmSubmitButton").button("disable");

                    /*
                    $("#machineCoinsLoadQuarters").button('disable');
                    $("#machineCoinsLoadDimes").button('disable');
                    $("#machineCoinsLoadNickels").button('disable');
                    $("#machineCoinsLoadPennies").button('disable');
                    */
                    return;
                }

                // unlock machineCupsFlavorsConfirmSubmitButton 
                $('#machineCoinsPickupMachineLoadStatus').html('Machine Not Loaded');
                console.log('[fetchMachineCoinsPickupUnlockConfirmButton - unlocking submit button]');

                $("#machineCoinsPickupConfirmSubmitButton").button('enable');
                /*
                $("#machineCoinsLoadQuarters").button('enable');
                $("#machineCoinsLoadDimes").button('enable');
                $("#machineCoinsLoadNickels").button('enable');
                $("#machineCoinsLoadPennies").button('enable');
                */

            }
            else {
                console.log("[fetchMachineCoinsPickupUnlockConfirmButton ERROR]");
                console.log("[fetchMachineCoinsPickupUnlockConfirmButton message:" + r.message + "]");
                console.log("[Redirecting to login.]");
                jQuery.mobile.changePage('#loginPage');
            }

        },





    }, 



};



