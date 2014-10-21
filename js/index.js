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


        // populate list view every time page is visited 
        $(document).on("pagebeforeshow", "#machineCupsMachinesPage", app.fetchMachineCupsMachines);

        // populate breadcrumbs
        $(document).on("pagebeforeshow", "#machineCupsMachinesPage", app.fetchMachineCupsMachinesBreadcrumbs);

        // bind the "on vclick" event listner only once during initial page 
        $(document).on("pagecreate", "#machineCupsMachinesPage", app.machineCupsMachinesAttachClickListner);



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
                    // hide spinner
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
    // used to redirect when ajax callback receives "missing information" responses
    */

    redirectByResult: function(proc, resultCode, resultArray, catchAll) {

        /* example of what this proc expects

        proc = "myProcedureName";

        resultArray = [
                {   code: 'ROUTE DOES NOT EXIST',
                    message: 'Route no longer exists', 
                    redirect: '#machineCupsRoutesPage', },

                {   code: 'MACHINE DOES NOT EXIST',
                    message: 'Machine no longer exists', 
                    redirect: '#machineCupsMachinesPage', }, ];

        catchAll = 
                {   code: 'UNKNOWN',
                    message: '', 
                    redirect: '#machineCupsRoutesPage', };
        */

        found = false;
        $.each(resultArray, function(index,value){

            console.log("[" + proc + " resultCode:" + resultCode + "]");
            console.log("[" + proc + " valueCode:" + value.code + "]");
            console.log("[" + proc + " valueMessage:" + value.message + "]");

            if (resultCode == value.code) {
                console.log("[" + proc + " matched]");
                console.log("[" + proc + " matched redirecting to " + value.redirect + "]");
                console.log("[" + proc + " matched valueMessage:" + value.message + "]");
                $('#modalDialogMessage').html( value.message );
                $('#modalDialogRedirect').attr('href', value.redirect );
                $('#modalDialog').popup("open");
                found = true;
                return false;// this only exits the each loop, not the function
            }
        });

        // redirect to catchall if we get this far
        if (catchAll && !found) {
                console.log("[" + proc + " redirecting to catchAll proc " + catchAll['redirect'] + "]");
                $('#modalDialogMessage').html( resultCode );
                $('#modalDialogRedirect').attr('href', catchAll['redirect']);
                $('#modalDialog').popup("open");
                return false;
        };

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

        listViews = ['routeCupsRoutesHoldList', 'routeCupsRoutesLoadRequestedList', 'routeCupsRoutesLoadCompleteList', 'routeCupsRoutesLoadVerifiedList'];

        // attach click handler for each list on the page
        $.each(listViews, function(index,value){

            // attach "on vclick" event listener to all list items
            $("#" + value ).on("vclick", "li", function (e) {
                // override default event action
                e.preventDefault();

                localStorage["routeCupsRouteId"] = this.id;

                // redirect
                console.log("[" + value + " forwarding to routeCupsMachinesPage]");
                $.mobile.changePage("#routeCupsMachinesPage", {transition: "slide"});
            });
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
        $("#routeCupsMachinesPageOuterList" ).on("vclick", "li", function (e) {
            // override default event action
            //e.preventDefault();

            console.log("[routeCupsMachinesPageList clicking on this id:"+this.id+"]");
            localStorage["routeCupsRouteMachineId"] = this.id;

            // redirect
            //console.log("[routeCupsMachinesPageList forwarding to routeCupsFlavorsPage]");
            //$.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
        });

        // attach "on vclick" event listener to all list items
        $("#routeCupsMachinesPageOuterList" ).on("vclick", ".routeMachinesLocationDiv ", function (e) {
            // override default event action
            //e.preventDefault();

            console.log("[routeCupsMachinesPageList clicking on a collapsible:"+this.id+"]");
            localStorage["routeCupsRouteLocationId"] = this.id;

            // redirect
            //console.log("[routeCupsMachinesPageList forwarding to routeCupsFlavorsPage]");
            //$.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
        });

        // add machine add form (select pulldown)
        $("#routeCupsMachinesPageOuterList").on("change", ".routeCupsMachinesAddMachineSelect", app.fetchRouteCupsMachinesAddMachineSubmit);

        // add location add form (select pulldown)
        $("#routeCupsMachinesPage").on("change", "#routeCupsMachinesAddLocationSelect", app.fetchRouteCupsMachinesAddLocationSubmit);

        // move location up in order (button)
        $("#routeCupsMachinesPage").on("vclick", ".routeCupsMachinesLocationUp", app.fetchRouteCupsMachinesLocationUpSubmit);

        // move location down in order (button)
        $("#routeCupsMachinesPage").on("vclick", ".routeCupsMachinesLocationDown", app.fetchRouteCupsMachinesLocationDownSubmit);

        // move location delete (button)
        $("#routeCupsMachinesPage").on("vclick", ".routeCupsMachinesLocationDelete", app.fetchRouteCupsMachinesLocationDeleteSubmit);



    },

    fetchRouteCupsMachinesAddMachineSubmit: function() {

        console.log('[fetchRouteCupsMachinesAddMachineSubmit value: ' +this.value+']');

        // selected option
        var machineId = this.value;
        var rId = localStorage.getItem("routeCupsRouteId");

        // get routeLocationId from hidden input field
        var selectMenu = this;
        var addForm = this.form;
        var routeLocationId = $( $(addForm).find('#routeCupsMachinesRouteLocationId') ).val(); 

        //disable the button so we can't resubmit while we wait
        $(this).selectmenu('disable'); // jquery mobile non native select menu

        console.log("[Submitting route machine add.]");

        app.servers.private.query('routecupsmachinesaddmachinesubmit', {routeId:rId,routeLocationId:routeLocationId,machineId:machineId}, function(r){

            closureCallback(r, selectMenu);
            // ajax callback
            function closureCallback(r, selectMenu) {

                var routeMachineId = r.routeMachineId;
                var type = r.type;
                var brandName = r.brandName;
                var flavorQuantityTotal = r.flavorQuantityTotal;

                var output = '<ul data-role="listview" data-inset="true">';
                output += '<li id="'+ routeMachineId +'" data-role="list-divider">'+ type + ' - ' + brandName + '</li>';
                output += '<li id="'+ routeMachineId +'"><a href="#routeCupsFlavorsPage" data-transition="slide">Cups<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                output += '<li id="'+ routeMachineId +'"><a href="#routeCoinsLoadPage" data-transition="slide">Coins</a></li>';
                output += '</ul>';

                var addForm = selectMenu.form;
                var formParent = $(addForm).parent();
                $(formParent).prepend(output);
                $(formParent).find("ul").listview().listview("refresh");

                $(selectMenu).empty(); // jquery mobile non native select menu

                var option = $('<option></option>').text("Add Machine");
                $(selectMenu).append(option); // jquery mobile non native select menu

                $.each(r.availableRouteMachines, function(index,value){
                    var option = $('<option></option>').attr("value", index).text(value);
                    $(selectMenu).append(option); // jquery mobile non native select menu
                });

                $(selectMenu).selectmenu("refresh"); // jquery mobile non native select menu

                if(r.availableRouteMachines.length != 0) {
                    $(selectMenu).selectmenu('enable'); // jquery mobile non native select menu
                }


            }

        });



        return false;
    },  

    fetchRouteCupsMachinesAddLocationSubmit: function() {

        console.log('[fetchRouteCupsMachinesAddLocationSubmit value: ' +this.value+']');

        // selected option
        var locationId = this.value;
        var rId = localStorage.getItem("routeCupsRouteId");

        // get routeLocationId from hidden input field
        var selectMenu = this;

        //disable the button so we can't resubmit while we wait
        $(this).selectmenu('disable'); // jquery mobile non native select menu

        console.log("[Submitting route location add.]");

        app.servers.private.query('routecupsmachinesaddlocationsubmit', {routeId:rId,locationId:locationId}, function(r){


            closureCallback(r, selectMenu);
            // ajax callback
            function closureCallback(r, selectMenu) {

                var routeLocationId = r.routeLocationId;
                var addressLine1 = r.addressLine1;
                var addressLine2 = r.addressLine2;
                var city = r.city;
                var state = r.state;
                var zip = r.zip;
                var availableRouteLocations = r.availableRouteLocations;
                var availableRouteMachines = r.availableRouteMachines;

                /*
                */


                // begin location collapsible
                var output = "";
                output += '<div class="routeMachinesLocationDiv" id="' +routeLocationId+'" data-role="collapsible">';

                output += '<h3><div style="display:inline-block;">' + addressLine1 + '<br>';
                if(addressLine2) {
                    output += addressLine2 + '<br>';
                }
                output += city + ', ' + state + ' ' + zip;
                output += '</div>';
                output += '<span style="float:right; vertical-align:top"> <div data-role="controlgroup" data-type="horizontal">';
                output += '<a class="routeCupsMachinesLocationUp" href="#" id="' + routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="arrow-u"><span class="ui-btn-inner ui-corner-left"><span class="ui-btn-text">Up</span></span></a>';
                output += '<a class="routeCupsMachinesLocationDown" href="#" id="' + routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="arrow-d"><span class="ui-btn-inner"><span class="ui-btn-text">Up</span></span></a>';
                output += '<a class="routeCupsMachinesLocationDelete" href="#" id="' + routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="delete"><span class="ui-btn-inner ui-corner-right ui-controlgroup-last"><span class="ui-btn-text">Up</span></span></a>';
                output += '</div></span>';
                output += '</h3>';




                // begin add machine form
                output += '<form id="routeCupsMachinesAddMachineForm">';
                output += '<input type=hidden id="routeCupsMachinesRouteLocationId" value="' + routeLocationId +'">';
                if(availableRouteMachines.length != 0) {
                    output += '<select class="routeCupsMachinesAddMachineSelect" data-native-menu="false" data-icon="false">';
                    output += '<option>Add Machine</option>';
                }
                else {
                    output += '<select class="routeCupsMachinesAddMachineSelect" data-native-menu="false" data-icon="false" data-disabled=true>';
                    output += '<option>Add Machine</option>';
                }
                $.each(availableRouteMachines, function(indexInner, valueInner){                   
                    output += '<option value="'+indexInner+'">'+valueInner+'</option>';
                });
                output += '</select></div>';
                output += '</form>';
                // end add machine form
                output += '</div>';


                // append location collapsible to collapsible set
                $('#routeCupsMachinesPageOuterList').append(output).trigger('create');
                // end location collapsible

                // begin location add select button

                $(selectMenu).empty(); // jquery mobile non native select menu

                var option = $('<option></option>').text("Add Location");
                $(selectMenu).append(option); // jquery mobile non native select menu

                $.each(r.availableRouteLocations, function(index,value){
                    optTxt = "";
                    optTxt += value.addressLine1 + ', ';
                    if (value.addressLine2) {
                        optTxt += value.addressLine2 + ', ';
                    }
                    optTxt += value.city + ', ' + value.state + ' ' + value.zip;
                    var option = $('<option></option>').attr("value", value.locationId).text(optTxt);
                    $(selectMenu).append(option); // jquery mobile non native select menu
                });

                $(selectMenu).selectmenu("refresh"); // jquery mobile non native select menu

                if(r.availableRouteLocations.length != 0) {
                    $(selectMenu).selectmenu('enable'); // jquery mobile non native select menu
                }
                // end location add select button



            }

        });



        return false;
    },  

    fetchRouteCupsMachinesLocationUpSubmit: function(e) {

        console.log('[fetchRouteCupsMachinesLocationUpSubmit]');

        // prevent vclick event attached to underlying collapsible set header so that collapsible doesn't expand/close
        e.stopPropagation();
        e.stopImmediatePropagation();  

        // remove active state css from active listview 
        $(".ui-collapsible-heading-toggle").removeClass('ui-btn-active', '');

        var routeLocationId = this.id;
        var rId = localStorage.getItem("routeCupsRouteId");

        app.servers.private.query('routecupsmachineslocationreordersubmit', {routeId:rId,routeLocationId:routeLocationId,direction:"up"}, function(r){
            console.log("[fetchRouteCupsMachinesLocationUpSubmit forwarding to routeCupsMachinesPage]");
            $.mobile.changePage("#routeCupsMachinesPage", {allowSamePageTransition: true, transition: "pop"});
        });



        return false;
    },  

    fetchRouteCupsMachinesLocationDownSubmit: function(e) {

        console.log('[fetchRouteCupsMachinesLocationDownSubmit]');

        // prevent vclick event attached to underlying collapsible set header so that collapsible doesn't expand/close
        e.stopPropagation();
        e.stopImmediatePropagation();  

        // remove active state css from active listview 
        $(".ui-collapsible-heading-toggle").removeClass('ui-btn-active', '');

        var routeLocationId = this.id;
        var rId = localStorage.getItem("routeCupsRouteId");

        app.servers.private.query('routecupsmachineslocationreordersubmit', {routeId:rId,routeLocationId:routeLocationId,direction:"down"}, function(r){
            console.log("[fetchRouteCupsMachinesLocationDownSubmit forwarding to routeCupsMachinesPage]");
            $.mobile.changePage("#routeCupsMachinesPage", {allowSamePageTransition: true, transition: "pop"});
        });

        return false;
    },  

    fetchRouteCupsMachinesLocationDeleteSubmit: function(e) {

        console.log('[fetchRouteCupsMachinesLocationDeleteSubmit value]');

        // prevent vclick event attached to underlying collapsible set header so that collapsible doesn't expand/close
        e.stopPropagation();
        e.stopImmediatePropagation();  

        // remove active state css from active listview 
        $(".ui-collapsible-heading-toggle").removeClass('ui-btn-active', '');

        // selected option
        var routeLocationId = this.id;
        var rId = localStorage.getItem("routeCupsRouteId");


        app.servers.private.query('routecupsmachineslocationdeletesubmit', {routeId:rId,routeLocationId:routeLocationId}, function(r){


            // remove collapsible set element
            $(".routeMachinesLocationDiv#" + routeLocationId).remove();



            // update locations add button with updated location list
            $('#routeCupsMachinesAddLocationSelect').empty(); // jquery mobile non native select menu

            var option = $('<option></option>').text("Add Location");
            $('#routeCupsMachinesAddLocationSelect').append(option); // jquery mobile non native select menu

            $.each(r.availableRouteLocations, function(index,value){
                optTxt = "";
                optTxt += value.addressLine1 + ', ';
                if (value.addressLine2) {
                    optTxt += value.addressLine2 + ', ';
                }
                optTxt += value.city + ', ' + value.state + ' ' + value.zip;
                var option = $('<option></option>').attr("value", value.locationId).text(optTxt);
                $('#routeCupsMachinesAddLocationSelect').append(option); // jquery mobile non native select menu
            });

            $('#routeCupsMachinesAddLocationSelect').selectmenu("refresh"); // jquery mobile non native select menu

            if(r.availableRouteLocations.length != 0) {
                $('#routeCupsMachinesAddLocationSelect').selectmenu('enable'); // jquery mobile non native select menu
            }

        });


        return false;
    },  


    fetchRouteCupsFlavors: function() {
        
        console.log("[fetchRouteCupsFlavors]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");

        app.servers.private.query('routecupsflavors', {routeId:routeCupsRouteId,routeMachineId:routeCupsRouteMachineId}, app.callbacks.fetchRouteCupsFlavors);

    },

    fetchRouteCupsFlavorsBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[fetchRouteCupsFlavorsBreadcrumbs]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");
        app.servers.private.query('machineinfo', {routeId:routeCupsRouteId, routeMachineId:routeCupsRouteMachineId}, app.callbacks.fetchRouteCupsFlavorsBreadcrumbs);

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
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");

        // fetch flavor options
        app.servers.private.query('routecupsflavoradd', {routeId:routeCupsRouteId, routeMachineId:routeCupsRouteMachineId}, app.callbacks.fetchRouteCupsFlavorAdd);

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
        var rmId = localStorage.getItem("routeCupsRouteMachineId");
        var fId = $("#routeCupsFlavorAddFlavorName", form).val();
        var fQuantity = $("#routeCupsFlavorAddCupsCount", form).val();

        console.log("[Submitting route machine flavor add info.]");
        app.servers.private.query('routecupsflavoraddsubmit', {routeId:rId,routeMachineId:rmId,flavorId:fId,flavorQuantity:fQuantity}, app.callbacks.fetchRouteCupsFlavorAddSubmit);
        $("#routeCupsFlavorAddSubmitButton").button("enable");

        // stop form from submitting 'get' request by returning false
        return false;
    },        

    fetchRouteCupsFlavorEdit: function() {
        
        console.log["fetchRouteCupsFlavorEdit"];

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");
        var routeCupsMachineFlavorLoadId = localStorage.getItem("routeCupsMachineFlavorLoadId");

        // fetch flavor options
        app.servers.private.query('routecupsflavoredit', {routeId:routeCupsRouteId, routeMachineId:routeCupsRouteMachineId, machineFlavorLoadId:routeCupsMachineFlavorLoadId}, app.callbacks.fetchRouteCupsFlavorEdit);

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
        var rmId = localStorage.getItem("routeCupsRouteMachineId");
        var mflId = localStorage.getItem("routeCupsMachineFlavorLoadId");
        var fQuantity = $("#routeCupsFlavorEditFlavorQuantity", form).val();

        if (formType === "update") {
            console.log("[Submitting route machine flavor update.]");
            app.servers.private.query('routecupsflavorupdatesubmit', {routeId:rId,routeMachineId:rmId,machineFlavorLoadId:mflId,flavorQuantity:fQuantity}, app.callbacks.fetchRouteCupsFlavorUpdateSubmit);
        }
        else {
            console.log("[Submitting route machine flavor delete.]");
            app.servers.private.query('routecupsflavordeletesubmit', {routeId:rId,routeMachineId:rmId,machineFlavorLoadId:mflId}, app.callbacks.fetchRouteCupsFlavorDeleteSubmit);
        }

        //disable the button so we can't resubmit while we wait
        $("#routeCupsFlavorEditUpdateSubmitButton").button("enable");
        $("#routeCupsFlavorEditDeleteSubmitButton").button("enable");

        // stop form from submitting 'get' request by returning false
        return false;
    },        






    fetchRouteCoinsLoad: function() {
        
        console.log("[fetchRouteCoinsLoad]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");

        app.servers.private.query('routecoinsload', {routeId:routeCupsRouteId,routeMachineId:routeCupsRouteMachineId}, app.callbacks.fetchRouteCoinsLoad);

    },

    fetchRouteCoinsLoadBreadcrumbs: function() {
        
        // retrieve route date, vanName, machineType and brandName for breadcrumbs 
        console.log("[fetchRouteCoinsLoadBreadcrumbs]");

        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");
        app.servers.private.query('machineinfo', {routeId:routeCupsRouteId, routeMachineId:routeCupsRouteMachineId}, app.callbacks.fetchRouteCoinsLoadBreadcrumbs);

    },


   fetchRouteCoinsLoadSubmit: function() {

        console.log('[fetchRouteCoinsLoadSubmit]');

        var form = $("#routeCoinsLoadForm");    
        //disable the button so we can't resubmit while we wait
        $("#routeCoinsLoadFormSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var routeCupsRouteId = localStorage.getItem("routeCupsRouteId");
        var routeCupsRouteMachineId = localStorage.getItem("routeCupsRouteMachineId");

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
        app.servers.private.query('routecoinsloadsubmit', {routeId:routeCupsRouteId, routeMachineId:routeCupsRouteMachineId, routeCoinsToLoad:coinsToLoad}, app.callbacks.fetchRouteCoinsLoadSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },


    fetchVanCupsRoutes: function() {
        
        console.log("[fetchVanCupsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchVanCupsRoutes);

    },
    vanCupsRoutesAttachClickListner: function() {

        console.log("[vanCupsRoutesAttachClickListner]");

        var listViews = ['vanCupsRoutesPageConfirmationList', 'vanCupsRoutesPageVerificationList', 'vanCupsRoutesPageVerifiedList', 'vanCupsRoutesPageMainDiv' ];

        // attach click handler for each list on the page
        $.each(listViews, function(index,value){

            // attach "on vclick" event listener to all list items
            $("#"+ value ).on("vclick", "li", function (e) {
                // override default event action
                //e.preventDefault();

                localStorage["vanCupsRouteId"] = this.id;
                console.log("[vanCupsRoutesAttachClickListner writing vanCupsRouteId: "+ this.id+"]");

                // redirect
                //console.log("["+ value +" forwarding to vanCupsFlavorsPage]");
                //$.mobile.changePage("#vanCupsFlavorsPage", {transition: "slide"});
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

    fetchVanCoinsLoadConfirmSubmit: function() {

        console.log('[fetchVanCoinsLoadConfirmSubmit]');

        var form = $("#vanCoinsLoadForm");    
        var formType = $("#vanCoinsLoadSubmitClicked", form).val();

        //disable both button so we can't resubmit while we wait
        $("#vanCoinsLoadConfirmSubmitButton").button("disable");
        $("#vanCoinsLoadDriverConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        if (formType === "confirm") {
            console.log("[Submitting van coins load confirm.]");
            app.servers.private.query('vancoinsloadconfirmsubmit', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCoinsLoadConfirmSubmit);
        }
        else {
            // it's a driver confirm request
            console.log("[Submitting van coins driver load confirm.]");
            app.servers.private.query('vancoinsloaddriverconfirmsubmit', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCoinsLoadDriverConfirmSubmit);
        }

        // stop form from submitting 'get' request by returning false
        return false;
    },



    fetchVanCoinsLoad: function() {
        
        console.log("[fetchVanCoinsLoad]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        app.servers.private.query('vancoinsload', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCoinsLoad);

    },

    fetchVanCoinsLoadBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchVanCoinsLoadBreadcrumbs]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        app.servers.private.query('routeinfo', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCoinsLoadBreadcrumbs);

    },

    fetchVanCoinsLoadUnlockConfirmButton: function() {
        
        // unlock confirm buttons based on vanLoadCoinsStatus table state
        console.log("[fetchVanCoinsLoadUnlockConfirmButton]");

        var vanCupsRouteId = localStorage.getItem("vanCupsRouteId");

        // get latest vanLoadCoinsStatus
        // if vanLoadStatus is 'Van Load Requested', then unlock both confirm buttons
        // if vanLoadStatus is 'Van Load Complete', then unlock just driver confirm button
        app.servers.private.query('vanloadcoinsstatus', {routeId:vanCupsRouteId}, app.callbacks.fetchVanCoinsLoadUnlockConfirmButton);
    },




    fetchMachineCupsRoutes: function() {
        
        console.log("[fetchMachineCupsRoutes]");

        app.servers.private.query('routes', {}, app.callbacks.fetchMachineCupsRoutes);

    },
    machineCupsRoutesAttachClickListner: function() {

        console.log("[machineCupsRoutesAttachClickListner]");

        var listViews = ['machineCupsRoutesLoadVerifiedList'];

        // attach click handler for each list on the page
        $.each(listViews, function(index,value){

            // attach "on vclick" event listener to all list items
            $("#"+ value ).on("vclick", "li", function (e) {
                // override default event action
                //e.preventDefault();

                localStorage["machineCupsRouteId"] = this.id;
                console.log("[machineCupsRoutesAttachClickListner writing machineCupsRouteId: "+ this.id+"]");

                // redirect
                //console.log("["+ value +" forwarding to vanCupsFlavorsPage]");
                //$.mobile.changePage("#vanCupsFlavorsPage", {transition: "slide"});
            });
        });

    },



    fetchMachineCupsMachines: function() {
        
        console.log("[fetchMachineCupsMachines]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

        app.servers.private.query('routecupsmachines', {routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsMachines);


    },
    fetchMachineCupsMachinesBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCupsMachinesBreadcrumbs]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");

        app.servers.private.query('routeinfo', {routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsMachinesBreadcrumbs);


    },

    machineCupsMachinesAttachClickListner: function() {

        console.log("[machineCupsMachinesAttachClickListner]");


        // attach "on vclick" event listener to all list items
        $("#machineCupsMachinesPageOuterList" ).on("vclick", "li", function (e) {
            // override default event action
            //e.preventDefault();

            console.log("[machineCupsMachinesPageList clicking on this id:"+this.id+"]");
            localStorage["machineCupsRouteMachineId"] = this.id;

            // redirect
            //console.log("[routeCupsMachinesPageList forwarding to routeCupsFlavorsPage]");
            //$.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
        });

        // attach "on vclick" event listener to all list items
        $("#machineCupsMachinesPageOuterList" ).on("vclick", ".machineCupsMachinesLocationDiv ", function (e) {
            // override default event action
            //e.preventDefault();

            console.log("[machineCupsMachinesPageList clicking on a collapsible:"+this.id+"]");
            localStorage["machineCupsRouteLocationId"] = this.id;

            // redirect
            //console.log("[routeCupsMachinesPageList forwarding to routeCupsFlavorsPage]");
            //$.mobile.changePage("#routeCupsFlavorsPage", {transition: "slide"});
        });

    },

    fetchMachineCupsFlavors: function() {
        
        console.log("[fetchMachineCupsFlavors]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");

        app.servers.private.query('machinecupsflavors', {routeId:machineCupsRouteId,routeMachineId:machineCupsRouteMachineId}, app.callbacks.fetchMachineCupsFlavors);

    },
    fetchMachineCupsFlavorsBreadcrumbs: function() {
        
        // retrieve route date and vanName for breadcrumbs 
        console.log("[fetchMachineCupsFlavorsBreadcrumbs]");

        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");
        app.servers.private.query('machineinfo', {routeId:machineCupsRouteId,routeMachineId:machineCupsRouteMachineId}, app.callbacks.fetchMachineCupsFlavorsBreadcrumbs);

    },

    fetchMachineCupsFlavorsUnlockConfirmButton: function() {
        
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        console.log("[fetchMachineCupsFlavorsUnlockConfirmButton]");

        var machineCupsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");
        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        app.servers.private.query('machineloadstatus', {routeMachineId:machineCupsRouteMachineId,routeId:machineCupsRouteId}, app.callbacks.fetchMachineCupsFlavorsUnlockConfirmButton);
    },


    fetchMachineCupsFlavorsConfirmSubmit: function() {

        console.log('[fetchMachineCupsFlavorsConfirmSubmit]');

        var form = $("#machineCupsFlavorsForm");    
        //disable the button so we can't resubmit while we wait
        $("#machineCupsFlavorsConfirmSubmitButton").button("disable");


        // machineId, routeId, flavorId, flavorQuantity, loadType
        var machineCupsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCupsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");

        var flavorsLoaded = new Array(); 
        $("#machineCupsFlavorsForm input[type=number]").each(function() {
                var flavorId = this.id.match(/flavor([0-9]+)/);
                var flavorQuantity = this.value;

                if(flavorId) {
                    flavorsLoaded.push({'flavorId':flavorId[1],'flavorQuantity':flavorQuantity});
                }
            });

        console.log("[Submitting machine cups flavors confirm.]");
        app.servers.private.query('machinecupsflavorsconfirmsubmit', {routeMachineId: machineCupsRouteMachineId, routeId:machineCupsRouteId, machineFlavorsLoaded:flavorsLoaded}, app.callbacks.fetchMachineCupsFlavorsConfirmSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
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

        var machineCoinsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCoinsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");

        app.servers.private.query('machinecoinsload', {routeId:machineCoinsRouteId,routeMachineId:machineCoinsRouteMachineId}, app.callbacks.fetchMachineCoinsLoad);

    },

    fetchMachineCoinsLoadConfirmSubmit: function() {

        console.log('[fetchMachineCoinsLoadConfirmSubmit]');

        var form = $("#machineCoinsLoadForm");    
        //disable the button so we can't resubmit while we wait
        $("#machineCoinsLoadConfirmSubmitButton").button("disable");

        // machineId, routeId, flavorId, flavorQuantity, loadType
        var machineCoinsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCoinsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");

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
        app.servers.private.query('machinecoinsloadconfirmsubmit', {routeId:machineCoinsRouteId, routeMachineId:machineCoinsRouteMachineId, machineCoinsLoaded:coinsLoaded}, app.callbacks.fetchMachineCoinsLoadConfirmSubmit);

        // stop form from submitting 'get' request by returning false
        return false;
    },

    fetchMachineCoinsLoadUnlockConfirmButton: function() {
        
        // unlock confirm button if machine load status is not 'Machine Load Complete'
        console.log("[fetchMachineCoinsLoadUnlockConfirmButton]");

        var machineCoinsRouteId = localStorage.getItem("machineCupsRouteId");
        var machineCoinsRouteMachineId = localStorage.getItem("machineCupsRouteMachineId");
        app.servers.private.query('machinecoinsloadstatus', {routeMachineId:machineCoinsRouteMachineId,routeId:machineCoinsRouteId}, app.callbacks.fetchMachineCoinsLoadUnlockConfirmButton);
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


                var vanHoldOutput = '';
                var vanLoadRequestedOutput = '';
                var vanLoadCompleteOutput = '';
                var vanLoadVerifiedOutput = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;
                    var flavorQuantityTotal = value.flavorQuantityTotal;

                    if (status=="Hold") {
                        vanHoldOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else if (status =="Van Load Requested") {
                        vanLoadRequestedOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else if (status =="Van Load Complete") {
                        vanLoadCompleteOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else {
                        vanLoadVerifiedOutput += '<li id="'+ rId +'"><a href="#routeCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                });


                // routeCupsRoutesPageRoutesList
                var holdOutput = '';
                var loadRequestedOutput = '';
                var loadCompleteOutput = '';
                var loadVerifiedOutput = '';

                holdOutput += '<li data-role="list-divider">Van Hold</li>';
                if (vanHoldOutput) {
                    holdOutput += vanHoldOutput;
                } else {
                    holdOutput += '<li><h3>No Routes</h3></li>';
                }

                loadRequestedOutput += '<li data-role="list-divider">Van Load Requested</li>';
                if (vanLoadRequestedOutput) {
                    loadRequestedOutput += vanLoadRequestedOutput;
                } else {
                    loadRequestedOutput += '<li><h3>No Routes</h3></li>';
                }

                loadCompleteOutput += '<li data-role="list-divider">Van Load Complete</li>';
                if (vanLoadCompleteOutput) {
                    loadCompleteOutput += vanLoadCompleteOutput;
                } else {
                    loadCompleteOutput += '<li><h3>No Routes</h3></li>';
                }

                loadVerifiedOutput += '<li data-role="list-divider">Van Load Verified</li>';
                if (vanLoadVerifiedOutput) {
                    loadVerifiedOutput += vanLoadVerifiedOutput;
                } else {
                    loadVerifiedOutput += '<li><h3>No Routes</h3></li>';
                }




                $("#routeCupsRoutesHoldList").html(holdOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                $("#routeCupsRoutesLoadRequestedList").html(loadRequestedOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                $("#routeCupsRoutesLoadCompleteList").html(loadCompleteOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                $("#routeCupsRoutesLoadVerifiedList").html(loadVerifiedOutput).promise().done(function () {
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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsMachines";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                if (r.routeMachinesByLocation.length == 0) {
                    $('#modalDialogBackMessage').html("No locations available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var currentRouteLocationId = localStorage.getItem("routeCupsRouteLocationId");

                var output = '';
                $.each(r.routeMachinesByLocation, function(index, value){                   

                    // location collapsible
                    var routeMachines = value.routeMachines;
                    // expand active location
                    if (value.routeLocationId == currentRouteLocationId ) {
                        output += '<div class="routeMachinesLocationDiv" id="' +value.routeLocationId+'" data-role="collapsible" data-collapsed="false">';
                    }
                    else {
                        output += '<div class="routeMachinesLocationDiv" id="' +value.routeLocationId+'" data-role="collapsible">';
                    }
                    output += '<h3><div style="display:inline-block;">' + value.addressLine1 + '<br>';
                    if(value.addressLine2) {
                        output += value.addressLine2 + '<br>';
                    }
                    output += value.city + ', ' + value.state + ' ' + value.zip;
                    output += '</div>';
                    output += '<span style="float:right; vertical-align:top">';
                    output += '<div data-role="controlgroup" data-type="horizontal" data-mini="true">';
                    output += '<a class="routeCupsMachinesLocationUp" href="#" id="' + value.routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="arrow-u"><span class="ui-btn-inner ui-corner-left"><span class="ui-btn-text">Up</span></span></a>';
                    output += '<a class="routeCupsMachinesLocationDown" href="#" id="' + value.routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="arrow-d"><span class="ui-btn-inner"><span class="ui-btn-text">Down</span></span></a>';
                    output += '<a class="routeCupsMachinesLocationDelete" href="#" id="' + value.routeLocationId + '" data-role="button" data-iconpos="notext" data-icon="delete"><span class="ui-btn-inner ui-corner-right ui-controlgroup-last"><span class="ui-btn-text">Delete</span></span></a>';
                    output += '</div></span>';
                    output += '</h3>';

                    $.each(routeMachines, function(indexInner, valueInner){                   

                    // begin listview 
                    output += '<ul data-role="listview" data-inset="true">';

                        var routeMachineId = valueInner.routeMachineId;
                        var type = valueInner.type;
                        var brandName = valueInner.brandName;
                        var flavorQuantityTotal = valueInner.flavorQuantityTotal;

                        output += '<li id="'+ routeMachineId +'" data-role="list-divider">';

                        output += '<div style="display:inline-block;">';
                        output += type + ' - ' + brandName; 
                        output += '</div>';

                        output += '<span style="float:right; vertical-align:top;">';
                        output += '<div data-role="controlgroup" data-type="horizontal" data-mini="true">';
                        output += '<a class="routeCupsMachinesMachineNotes" href="#" id="' + routeMachineId + '" data-role="button" data-iconpos="notext" data-icon="comment"><span class="ui-btn-inner ui-corner-left"><span class="ui-btn-text">Info</span></span></a>';
                        output += '<a class="routeCupsMachinesMachineRemove" href="#" id="' + routeMachineId + '" data-role="button" data-iconpos="notext" data-icon="delete"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span></span></a>';
                        output += '</div>';
                        output += '</span>';

                        output += '</li>';
                        output += '<li id="'+ routeMachineId +'"><a href="#routeCupsFlavorsPage" data-transition="slide">Cups<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                        output += '<li id="'+ routeMachineId +'"><a href="#routeCoinsLoadPage" data-transition="slide">Coins</a></li>';
                        output += '</ul>';
                    });
                    // end listview 


                    // begin add machine form
                    var availableRouteMachines = value.availableRouteMachines;
                    output += '<form id="routeCupsMachinesAddMachineForm">';
                    output += '<input type=hidden id="routeCupsMachinesRouteLocationId" value="' + value.routeLocationId +'">';
                    if(availableRouteMachines.length != 0) {
                        output += '<select class="routeCupsMachinesAddMachineSelect" data-native-menu="false" data-icon="false">';
                        output += '<option>Add Machine</option>';
                    }
                    else {
                        output += '<select class="routeCupsMachinesAddMachineSelect" data-native-menu="false" data-icon="false" data-disabled=true>';
                        output += '<option>Add Machine</option>';
                    }
                    $.each(availableRouteMachines, function(indexInner, valueInner){                   
                        output += '<option value="'+indexInner+'">'+valueInner+'</option>';
                    });
                    output += '</select></div>';
                    output += '</form>';
                    // end add machine form


                    output += '</div>';
                    // end location collapsible



                });

                // add output and refresh jquery mobile
                $("#routeCupsMachinesPageOuterList").html(output).collapsibleset().trigger('create');

                // add location form begin
                var availableRouteLocations = r.availableRouteLocations;
                output = "";
                output += '<form id="routeCupsMachinesAddLocationForm">';
                output += '<input type=hidden id="routeCupsMachinesRouteId" value="' + r.routeId +'">';
                if(availableRouteLocations.length != 0) {
                    output += '<select id="routeCupsMachinesAddLocationSelect" data-native-menu="false" data-icon="false">';
                    output += '<option>Add Location</option>';
                }
                else {
                    output += '<select id="routeCupsMachinesAddLocationSelect" data-native-menu="false" data-icon="false" data-disabled=true>';
                    output += '<option>Add Location</option>';
                }
                $.each(availableRouteLocations, function(indexInner, valueInner){                   
                    optTxt = "";
                    optTxt += valueInner.addressLine1 + ', ';
                    if (valueInner.addressLine2) {
                        optTxt += valueInner.addressLine2 + ', ';
                    }
                    optTxt += valueInner.city + ', ' + valueInner.state + ' ' + valueInner.zip;
                    output += '<option value="'+valueInner.locationId+'">'+optTxt+'</option>';
                });
                output += '</select></div>';
                output += '</form>';
                // add location form end

                $("#routeCupsMachinesPageAddLocationDiv").html(output);
                $("#routeCupsMachinesAddLocationSelect").selectmenu().selectmenu('refresh');

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsMachinesBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavors";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorsBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }


                // get from local storage
                var routeCupsFlavorsDateHeader = localStorage.getItem("routeCupsDate");
                var routeCupsFlavorsVanNameHeader = localStorage.getItem("routeCupsVanName");

                localStorage["routeCupsRouteMachineId"] = r.routeMachineId;
                localStorage["routeCupsMachineName"] = r.type + ' - ' + r.brandName;
                //localStorage["routeCupsRouteLocationId"] = r.routeLocationId;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorAdd";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorAddSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorEdit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorUpdateSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCupsFlavorDeleteSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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




       "fetchRouteCoinsLoad": function(r) { 

            console.log("[fetchRouteCoinsLoad callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchRouteCoinsLoad SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCoinsLoad";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCoinsLoadBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }


                // get from local storage
                var routeCoinsDateHeader = localStorage.getItem("routeCupsDate");
                var routeCoinsVanNameHeader = localStorage.getItem("routeCupsVanName");

                localStorage["routeCupsRouteMachineId"] = r.routeMachineId;
                localStorage["routeCupsMachineName"] = r.type + ' - ' + r.brandName;
                //localStorage["routeCupsRouteLocationId"] = r.routeLocationId;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#routeCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#routeCupsMachinesPage' },
                    ];

                    catchAll = {
                                redirect: '#routeCupsRoutesPage' };

                    proc = "fetchRouteCoinsLoadSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }


                // enable submit button for future updates
                $("#routeCoinsLoadFormSubmitButton").button("enable");

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchRouteCoinsLoadSubmit redirecting to #routeCupsMachinesPage]");
                $('#modalDialogMessage').html('Coin Load updated.');
                $('#modalDialogRedirect').attr('href','#routeCupsMachinesPage');
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



                var confirmationOutput = '';
                var verificationOutput = '';
                var verifiedOutput = '';
                var output = '';

                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;
                    var flavorQuantityTotal = value.flavorQuantityTotal;

                    console.log("[status:"+status +"]");

                    // begin listview 
                    output += '<ul id="vanCupsRoutesMainDivList'+ rId +'" data-role="listview" data-inset="true">';
                    output += '<li id="'+ rId +'" data-role="list-divider">'+ date + ' - ' + vanName + '</li>';
                    output += '<li id="'+ rId +'"><a href="#vanCupsFlavorsPage" data-transition="slide">Cups<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    output += '<li id="'+ rId +'"><a href="#vanCoinsLoadPage" data-transition="slide">Coins</a></li>';
                    output += '</ul>';
                    // end listview 

                });

                $("#vanCupsRoutesPageMainDiv").empty();
                $("#vanCupsRoutesPageMainDiv").html(output).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $.each(r.routes, function(index, value){                   
                        //$('#vanCupsRoutesMainDivList'+value.routeId).trigger("create");
                        $('#vanCupsRoutesMainDivList'+value.routeId).listview().listview("refresh");
                    });
                });

                /*
                if (!confirmationOutput && !verificationOutput && !verifiedOutput) {
                    $('#modalDialogBackMessage').html("No routes available to display.");
                    $('#modalDialogBack').popup("open");
                }
                */


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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCupsFlavors";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCupsFlavorsBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCupsFlavorsUnlockConfirmButton";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCupsFlavorsConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // flavors added to machine - show modal dialog and send to same page page
                console.log("[fetchVanCupsFlavorsConfirmSubmit redirecting to #vanCupsRoutesPage]");
                $('#modalDialogMessage').html('Van Load confirmed.');
                $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                $('#modalDialog').popup("open");


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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCupsFlavorsDriverConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // flavors added to machine - show modal dialog and send to same page page
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit redirecting to #vanCupsRoutesPage]");
                $('#modalDialogMessage').html('Driver Confirm Van Load Complete.');
                $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                $('#modalDialog').popup("open");


            }
            else {
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit ERROR]");
                console.log("[fetchVanCupsFlavorsDriverConfirmSubmit message:" + r.message + "]");
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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCoinsLoad";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCoinsLoadBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCoinsLoadUnlockConfirmButton";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCoinsLoadConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // confirmed coins loaded in van - show modal dialog and send to same page page
                console.log("[fetchVanCoinsLoadConfirmSubmit redirecting to #vanCupsRoutesPage]");
                $('#modalDialogMessage').html('Van Load confirmed.');
                $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                $('#modalDialog').popup("open");



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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#vanCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#vanCupsRoutesPage' };

                    proc = "fetchVanCoinsLoadDriverConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // verified coins loaded in van - show modal dialog and send to same page page
                console.log("[fetchVanCoinsLoadDriverConfirmSubmit redirecting to #vanCupsRoutesPage]");
                $('#modalDialogMessage').html('Driver Confirm Van Load Complete.');
                $('#modalDialogRedirect').attr('href','#vanCupsRoutesPage');
                $('#modalDialog').popup("open");


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

                var vanHoldOutput = '';
                var vanLoadRequestedOutput = '';
                var vanLoadCompleteOutput = '';
                var vanLoadVerifiedOutput = '';
                $.each(r.routes, function(index, value){                   

                    var rId = value.routeId;
                    var vanName = value.vanName;
                    var status = value.status;
                    var date = value.date;
                    var flavorQuantityTotal = value.flavorQuantityTotal;

                    if (status=="Hold") {
                        vanHoldOutput += '<li id="'+ rId +'"><a href="#machineCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else if (status =="Van Load Requested") {
                        vanLoadRequestedOutput += '<li id="'+ rId +'"><a href="#machineCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else if (status =="Van Load Complete") {
                        vanLoadCompleteOutput += '<li id="'+ rId +'"><a href="#machineCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                    else {
                        vanLoadVerifiedOutput += '<li id="'+ rId +'"><a href="#machineCupsMachinesPage">' +  date + ' - ' + vanName + '<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                    }
                });


                // routeCupsRoutesPageRoutesList
                var holdOutput = '';
                var loadRequestedOutput = '';
                var loadCompleteOutput = '';
                var loadVerifiedOutput = '';

                /*
                holdOutput += '<li data-role="list-divider">Van Hold</li>';
                if (vanHoldOutput) {
                    holdOutput += vanHoldOutput;
                } else {
                    holdOutput += '<li>No Routes</li>';
                }

                loadRequestedOutput += '<li data-role="list-divider">Van Load Requested</li>';
                if (vanLoadRequestedOutput) {
                    loadRequestedOutput += vanLoadRequestedOutput;
                } else {
                    loadRequestedOutput += '<li>No Routes</li>';
                }

                loadCompleteOutput += '<li data-role="list-divider">Van Load Complete</li>';
                if (vanLoadCompleteOutput) {
                    loadCompleteOutput += vanLoadCompleteOutput;
                } else {
                    loadCompleteOutput += '<li>No Routes</li>';
                }
                */

                loadVerifiedOutput += '<li data-role="list-divider">Van Load Verified</li>';
                if (vanLoadVerifiedOutput) {
                    loadVerifiedOutput += vanLoadVerifiedOutput;
                } else {
                    loadVerifiedOutput += '<li><h3>No Routes</h3></li>';
                }




                /*
                $("#routeCupsRoutesHoldList").html(holdOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                $("#routeCupsRoutesLoadRequestedList").html(loadRequestedOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                $("#routeCupsRoutesLoadCompleteList").html(loadCompleteOutput).promise().done(function () {
                    // refresh listview so that jq mobile applies styles to added li elements
                    $(this).listview("refresh");
                });
                */
                $("#machineCupsRoutesLoadVerifiedList").html(loadVerifiedOutput).promise().done(function () {
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


       "fetchMachineCupsMachines": function(r) { 

            console.log("[fetchMachineCupsMachines callback]");

            if(r && r.code && r.code === "SUCCESS") {
                console.log("[fetchMachineCupsMachines SUCCESS]");

                // record no longer exists? - customize modal dialog and return
                if (r.result === false) {

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCupsMachines";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }


                if (r.routeMachinesByLocation.length == 0) {
                    $('#modalDialogBackMessage').html("No locations available to display.");
                    $('#modalDialogBack').popup("open");
                }

                var currentRouteLocationId = localStorage.getItem("machineCupsRouteLocationId");

                var output = '';
                $.each(r.routeMachinesByLocation, function(index, value){                   

                    // location collapsible
                    var routeMachines = value.routeMachines;
                    // expand active location
                    if (value.routeLocationId == currentRouteLocationId ) {
                        output += '<div class="machineCupsMachinesLocationDiv" id="' +value.routeLocationId+'" data-role="collapsible" data-collapsed="false">';
                    }
                    else {
                        output += '<div class="machineCupsMachinesLocationDiv" id="' +value.routeLocationId+'" data-role="collapsible">';
                    }
                    output += '<h3><div style="display:inline-block;">' + value.addressLine1 + '<br>';
                    if(value.addressLine2) {
                        output += value.addressLine2 + '<br>';
                    }
                    output += value.city + ', ' + value.state + ' ' + value.zip;
                    output += '</div>';
                    output += '</h3>';

                    $.each(routeMachines, function(indexInner, valueInner){                   

                    // begin listview 
                    output += '<ul data-role="listview" data-inset="true">';

                        var routeMachineId = valueInner.routeMachineId;
                        var type = valueInner.type;
                        var brandName = valueInner.brandName;
                        var flavorQuantityTotal = valueInner.flavorQuantityTotal;

                        output += '<li id="'+ routeMachineId +'" data-role="list-divider">'+ type + ' - ' + brandName + '</li>';
                        output += '<li id="'+ routeMachineId +'"><a href="#machineCupsFlavorsPage" data-transition="slide">Cups<span class="ui-li-count">' + flavorQuantityTotal + '</span></a></li>';
                        output += '<li id="'+ routeMachineId +'"><a href="#machineCoinsLoadPage" data-transition="slide">Coins</a></li>';
                        output += '</ul>';
                    });
                    // end listview 

                    output += '</div>';
                    // end location collapsible



                });

                // add output and refresh jquery mobile
                $("#machineCupsMachinesPageOuterList").html(output).collapsibleset().trigger('create');

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                    ];

                    catchAll = {
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCupsMachinesBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }


                // save to local storage
                localStorage["machineCupsRouteId"] = r.routeId;
                localStorage["machineCupsDate"] = r.date;
                localStorage["machineCupsVanName"] = r.vanName;

                // write breadcrumbs
                $('#machineCupsMachinesDateHeader').html(r.date);
                $('#machineCupsMachinesVanNameHeader').html(r.vanName);


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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCupsFlavors";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                console.log("[fetchMachineCupsFlavors got past return stmt]");

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

                    resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCupsFlavorsBreadcrumbs";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };


                    proc = "fetchMachineCupsFlavorsUnlockConfirmButton";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;
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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCupsFlavorsConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // flavors added to machine - show modal dialog and send to machines page
                console.log("[fetchMachineCupsFlavorsConfirmSubmit redirecting to #machineCupsMachinesPage]");
                $('#modalDialogMessage').html('Flavor Load confirmed.');
                $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                $('#modalDialog').popup("open");


            }
            else {
                console.log("[fetchMachineCupsFlavorsConfirmSubmit ERROR]");
                console.log("[fetchMachineCupsFlavorsConfirmSubmit message:" + r.message + "]");
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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCoinsLoad";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCoinsLoadConfirmSubmit";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

                }

                // machine coins load confirmed - show modal dialog 
                console.log("[fetchMachineCoinsLoadConfirmSubmit redirecting to #machineCupsMachinesPage]");
                $('#modalDialogMessage').html('Coin Load confirmed.');
                $('#modalDialogRedirect').attr('href','#machineCupsMachinesPage');
                $('#modalDialog').popup("open");


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

                    var resultArray = [
                            {   code: 'ROUTE DOES NOT EXIST',
                                message: 'Route no longer exists!', 
                                redirect: '#machineCupsRoutesPage' },

                            {   code: 'MACHINE DOES NOT EXIST',
                                message: 'Machine no longer exists!', 
                                redirect: '#machineCupsMachinesPage' },
                    ];

                    catchAll = {
                                message: '', 
                                redirect: '#machineCupsRoutesPage' };

                    proc = "fetchMachineCoinsLoadUnlockConfirmButton";

                    app.redirectByResult(proc, r.resultcode, resultArray, catchAll);
                    return;

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






    }, 



};



