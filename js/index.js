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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

        alert('Received Event: ' + id);

        $("#loginForm").on("submit",this.handleLogin);

    }

    checkPreAuth: function() {
        var form = $("#loginForm");
        if(window.localStorage["email"] != undefined && window.localStorage["password"] != undefined) {
            $("#email", form).val(window.localStorage["email"]);
            $("#password", form).val(window.localStorage["password"]);

            alert('Previous login information found.');
            this.handleLogin();
        }
    }

    handleLogin: function() {
        var form = $("#loginForm");    
        //disable the button so we can't resubmit while we wait
        $("#submitButton",form).attr("disabled","disabled");
        var e = $("#email", form).val();
        var p = $("#password", form).val();
        alert("click");


        /*
        if(e != '' && p!= '') {
            $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {email:e,password:p}, function(res) {
                if(res == true) {
                    //store
                    window.localStorage["email"] = e;
                    window.localStorage["password"] = p;             
                    $.mobile.changePage("home.html");
                } else {
                    navigator.notification.alert("Your login failed", function() {});
                }
             $("#submitButton").removeAttr("disabled");
            },"json");
        }
        */

        // testing
        $.mobile.changePage("home.html");
        alert("redirect to home");

        return false;
    }



};



