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
import { socket } from "../main";
import { reject } from 'q';


var connections = {}
let marker = new google.maps.Marker({
  });
var id;


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
        markers: {},
        circles: {},
        initLoad: true,
        inMatch: false,
        activeMatchHost: "",
        activeMatchPlayers: {}
    };
  },

 created: function(){

 },

 mounted(){
        socket.on("coords", data => {
            console.log("Socket on location update ", data.name);
            axios.put('api/users/location', {username: data.name, latitude: data.coords[0].lat, longitude: data.coords[0].lng});
            if (!data.name){return}
            if (data.name in this.markers){
                let m = this.markers[data.name];
                m.setMap(null);
            }
            connections[data.name] = data.coords;
            var newLatLong = new google.maps.LatLng(data.coords[0].lat, data.coords[0].lng);
            var newMarker = new google.maps.Marker({
                title: data.name,
                position: newLatLong,
                map: map
            });
            this.markers[data.name] = newMarker;
            this.connects = JSON.stringify(connections);
        });

        socket.on("logout", (data) => {
            console.log("Socket on logout");
            if (data.name in this.markers){
                let m = this.markers[data.name];
                m.setMap(null);
                delete this.markers[data.name];

            }
        });

        socket.on('match-made', (data) => {
            if (data.username in this.markers && !(data.username in this.circles)){
                let m = this.markers[data.username];
                var circle = new google.maps.Circle({
                    map: map,
                    radius: data.radius*1600,
                    fillColor: '#AA0000',
                    clickable: true,
                    center: m.getPosition()
                });
                google.maps.event.addListener(circle, 'click', function(){
                    map.fitBounds(circle.getBounds());
                });
                console.log("Binding circle!!");
                // circle.bindTo('center', m, 'position');

                if (data.username in this.circles){
                    let c = this.circles[data.username];
                    c.setMap(null);
                }

                this.circles[data.username] = circle;
                this.activeMatchHost = data.username;
            }else {console.log("not in markers")}
        });

        socket.on('match-deleted', (data) => {
            if (this.inMatch){
                if (data.username === this.activeMatchHost){
                    this.inMatch = false;
                    /// TODO: render the normal map, not in game map ///
                }
            } else {
                if (data.username in this.circles){
                    let c = this.circles[data.username];
                    c.setMap(null);
                    delete this.circles[data.username];
                }
            }
        });

        socket.on('match-left', (data) => {
            if (this.inMatch){
                if (data.username in this.activeMatchPlayers){
                    let m = this.activeMatchPlayers[data.username];
                    m.setMap(null);

                }
            }
        });

        if (navigator.geolocation) {
            id = navigator.geolocation.watchPosition(this.positionSuccess);
            console.log("Got that position");
        } else {
            console.log("Your browser is out of fashion, there\'s no geolocation!");
        }

        // listening for logout information
        eventBus.$on("logout", (username) => {
            navigator.geolocation.clearWatch(id);
            let sendData = {name: username.data};
            socket.emit("logout", sendData);
        });
    },


 methods:{

     positionSuccess: async function(position){
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
                await this.populateMapMarkers();
                await this.populateMapMatches();

            }


            // emits the users new position to all other users.
            await axios.get('api/users/getName').then(function(name) {
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

     },

     populateMapMarkers: async function(){
         return await new Promise((resolve, reject) => {
             axios.get('api/users/getAllLocation').then(locations => {
                console.log("Locations: ", locations.data)
                for (var i = 0; i < locations.data.length; i++){
                    let person = locations.data[i];
                    var newLatLong = new google.maps.LatLng(person.latitude, person.longitude);
                    var newMarker = new google.maps.Marker({
                        title: person.username,
                        position: newLatLong,
                        map: map
                    });
                    this.markers[person.username] = newMarker;
                }
                resolve(true);
            }).catch(() => {reject(true)});
         });
     },

     populateMapMatches: async function(){
        return await new Promise((resolve, reject) => {
            axios.get('api/requests/getAllMatches').then(matches => {
                console.log("Matches: ", matches.data);
                for (var i = 0; i < matches.data.length; i++){
                    let match = matches.data[i];
                    let host = match.username;
                    let radius = match.radius;
                    if (host in this.markers){
                        let center = this.markers[host].getPosition();
                        var circle = new google.maps.Circle({
                            map: map,
                            radius: radius*1600,
                            fillColor: '#AA0000',
                            clickable: true,
                            center: center
                        });
                        this.circles[host] = circle;
                    }
                }
                resolve(true);
            }).catch(() => {reject(true)});
        });

     }


 },

 beforeDestroy: function(){
     navigator.geolocation.clearWatch(id);

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
