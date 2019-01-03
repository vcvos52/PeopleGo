<template>
    <b-row class="cardFlex">
        <b-card title="Choose game options:" tag="article" class="card">
            <b-form @submit.prevent="initializeMatch">

                Choose Game radius:

                <b-row class="rowFlex">
                    <b-input step="0.1" class="slider" min="0" max="10" id="radius" v-model="radius" placeholder="Radius" type="range" value="1"/>
                </b-row>

                <b-row class="rowFlex">
                    {{radius}}
                </b-row>

                Choose Hider or Seeker:
                <b-form-select v-model="role" class="mb-3">
                    <option value="0">Hider</option>
                    <option value="1">Seeker</option>
                </b-form-select>


                <b-row class="rowFlex">
                    More options to come in updates...
                </b-row>

                <b-row class="rowFlex">
                    <b-button id="buttonsbmt" type="submit" class="button">Start Match!</b-button>
                </b-row>

            </b-form>
        </b-card>
    </b-row>
</template>


<script>
import { eventBus } from "../main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import L from "leaflet";
import { socket } from "../main";


var map;

export default {
  name: "StartGame",

  data() {
    return {
        radius: 1,
        role: "Select Hider or Seeker",
        username: "",
    };
  },

 created: function(){
 },

 mounted(){

 
    },


 methods:{

     initializeMatch: function() {
         document.getElementById("buttonsbmt").disabled = true;
         document.getElementById("buttonsbmt").backgroundColor = "#6c757d";
         console.log("just changed button colors...");
         eventBus.$emit("initialize-Match", {radius: this.radius, seeker: this.role});

        //  this.updatePosition();
     },

    updatePosition: function(){
        console.log("just entered updatePosition function...");
        if (navigator.geolocation) {
            console.log("nav is good");
            navigator.geolocation.getCurrentPosition(this.getCoords, this.errfunc, {timeout:6000, enableHighAccuracy: true});
        } else {
            console.log("Your browser is out of fashion, there\'s no geolocation!");
        }
        
    },


    getCoords: async function(position){
        console.log("just entered getCoords...");
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        let bodyContent = {latitude: lat, longitude: lng};
        console.log("got coords: ", lat, lng);
        axios.put("/api/users/locationUpdate", bodyContent)
            .then(username => {
                var sentData = {
                    name: username.data,
                    coords: [{
                        lat: lat,
                        lng: lng,
                    }]
                };
                socket.emit("coords", sentData);
            }).catch("Error updating position").then(() => {eventBus.$emit("initialize-Match", {radius: this.radius, seeker: this.role})});
    },

    errfunc: function(){
        console.log("failure number 1");
        navigator.geolocation.getCurrentPosition(this.getCoords, this.errfunc2, {timeout:60000, enableHighAccuracy: true});
    },

    errfunc2: function(){
        console.log("failure number 2");
    }

 },

};
</script>


<style scoped>

.rowFlex {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 5px;
}

.cardFlex {
    display: flex;
    justify-content: center;
    align-content: center;
    padding-top: 20px;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;   
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}

input.form-control[type=range] {
    height: 15px;
}

input#radius.slider.form-control[type=range] {
    padding: 0px;
}

</style>
