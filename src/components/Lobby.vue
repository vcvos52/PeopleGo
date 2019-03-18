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
import { reject, async } from 'q';


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
        activeMatchPlayers: {},
        joinedMatch: false,
        keep: []
    };
  },

 created: function(){

 },

 mounted(){
        socket.on("coords", data => {
            if (this.joinedMatch && !(this.keep.includes(data.name))){
                return;
            }
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
            if (this.joinedMatch){return}
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
                    eventBus.$emit("ask-to-join", {title: m.getTitle(), coords: m.getPosition()});
                });
                console.log("Binding circle!!");

                if (data.username in this.circles){
                    let c = this.circles[data.username];
                    c.setMap(null);
                }

                this.circles[data.username] = circle;
            }else {console.log("not in markers")}
        });

        let reference = this;
        socket.on('match-deleted', async function(data) {
            // console.log("circles upon match delete: ", reference.circles, reference.username);
            if (reference.inMatch || reference.joinedMatch){
                if (data.username === reference.activeMatchHost){
                    reference.inMatch = false;
                    reference.joinedMatch = false;
                    let c = reference.circles[data.username];
                    c.setMap(null);
                    delete ref.circles[data.username];

                    await reference.populateMapMarkers();
                    await reference.populateMapMatches();
                }
            } else {
                if (data.username in reference.circles){
                    let c = reference.circles[data.username];
                    c.setMap(null);
                    delete reference.circles[data.username];
                }
            }
        });

        socket.on('match-left', (data) => {
            if (this.inMatch){
                if (this.keep.includes(data.username)){
                    let m = this.markers[data.username];
                    m.setMap(null);

                }
            }
        });

        socket.on("match-joined", (data) => {
            if (data.host === this.activeMatchHost && !(data.newPlayer === this.username)){
                if (!(this.keep.includes(data.newPlayer))){
                    this.keep.push(data.newPlayer);
                }
                axios.get(`api/users/getLocation/${data.newPlayer}`).then(person => {
                    var newLatLong = new google.maps.LatLng(person.latitude, person.longitude);
                    var newMarker = new google.maps.Marker({
                        title: person.username,
                        position: newLatLong,
                        map: map
                    });
                    this.markers[person.username] = newMarker;
                })
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

        // gets rid of all non match markers and circles
        eventBus.$on("match-joined", (players) => {
            let ref  = this;
            for (var i = 0; i < players.length; i++){
                let player = players[i];
                this.keep.push(player.username);
                if (player.host){
                    this.activeMatchHost = player.username;
                }
            }
            Object.keys(this.markers).forEach(function(play) {
                if (!(ref.keep.includes(play))){
                    let m = ref.markers[play];
                    m.setMap(null);
                    delete ref.markers[play];
                }
            });
            Object.keys(this.circles).forEach(function(play) {
                if (!(play === ref.activeMatchHost)){
                    let c = ref.circles[play];
                    c.setMap(null);
                    delete ref.circles[play];
                }
            });
            this.joinedMatch = true;
            // This is to let all other players know that you joined a match.
            // They will check if you share a host, and if so, they will add your marker
            socket.emit("match-joined", {host: this.activeMatchHost, newPlayer: this.username});
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
                // console.log("Locations: ", locations.data)
                for (var i = 0; i < locations.data.length; i++){
                    let person = locations.data[i];
                    if (!(person.username in this.markers)){
                        var newLatLong = new google.maps.LatLng(person.latitude, person.longitude);
                        var newMarker = new google.maps.Marker({
                            title: person.username,
                            position: newLatLong,
                            map: map
                        });
                        this.markers[person.username] = newMarker;
                    }
                }
                resolve(true);
            }).catch(() => {reject(true)});
         });
     },

     populateMapMatches: async function(){
        return await new Promise((resolve, reject) => {
            axios.get('api/requests/getAllMatches').then(matches => {
                // console.log("Matches: ", matches.data);
                for (var i = 0; i < matches.data.length; i++){
                    let match = matches.data[i];
                    let host = match.username;
                    let radius = match.radius;
                    if (host in this.markers && !(host in this.circles)){
                        let m = this.markers[host];
                        let center = m.getPosition();
                        var circle = new google.maps.Circle({
                            map: map,
                            radius: radius*1600,
                            fillColor: '#AA0000',
                            clickable: true,
                            center: center,
                        });
                        google.maps.event.addListener(circle, 'click', function(){
                            eventBus.$emit("ask-to-join", {title: m.getTitle(), coords: center});
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
