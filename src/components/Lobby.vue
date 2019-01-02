<template>
  <b-col id="login">
    <!-- <script src="./js/lib/leaflet.js"></script>
    <script src="/socket.io/socket.io.js"></script> -->
    <div id="mapcanvas"></div>
  </b-col>
</template>


<script>
import { eventBus } from "../main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import L from "leaflet";
import io from 'socket.io-client';
var socket = null;
var connections = {}
let marker = new google.maps.Marker({
      title:"Balls"
  });


var map;

export default {
  name: "Lobby",

  data() {
    return {
        username: "",
        logged: "",
        connects: {},
        markers: {},
        active: false,
        latLng: {},
        markers: [],
        initLoad: true
    };
  },

 created: function(){
    socket = io();
 },

 mounted(){
        socket.on("coords", data => {
            console.log(data);
            connections[data.name] = data.coords;
            var newLatLong = new google.maps.LatLng(data.coords[0].lat, data.coords[0].lng);
            var newMarker = new google.maps.Marker({
                title: data.name,
                position: newLatLong,
                map: map
            });
            this.connects = JSON.stringify(connections);
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.positionSuccess);
            console.log("Got that position");
        } else {
            console.log("Your browser is out of fashion, there\'s no geolocation!");
        }
    },


 methods:{

    //  getpos: function(){
    //     // check whether browser supports geolocation api
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(this.positionSuccess);
    //         console.log("Got that position");
    //     } else {
    //         console.log("Your browser is out of fashion, there\'s no geolocation!");
    //     }
    //  },

     positionSuccess: function(position){
            const ref = this;
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var acr = position.coords.accuracy;
            this.latLng = new google.maps.LatLng(lat, lng);

            // This ensures the map only loads on the first rendering
            if (this.initLoad){
                var myOptions = {
                    zoom: 15,
                    center: this.latLng,
                    mapTypeControl: false,
                    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
                this.initLoad = false;
            }

            // emits the users new position to all other users.
            axios.get('api/users/getName').then(function(name) {
                    ref.username = name.data;
                    var sentData = {
                        name: name.data,
                        coords: [{
                            lat: lat,
                            lng: lng,
                            acr: acr
                        }]
                    }
                    socket.emit("coords", sentData);
                })

     }
 }

};
</script>


<style scoped>

#mapcanvas { 
    height: 92vh;
    width: 100vw
}

#login {
  padding-top: 0px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}


h4 {
  font-size: 120%;
}

</style>
