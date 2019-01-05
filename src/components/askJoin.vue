<template>
    <b-row class="cardFlex">
        <b-card title="Are You Sure?:" tag="article" class="card">
            <b-form @submit.prevent="initializeMatch">

                <b-row class="rowFlex">
                    Join {{host}}'s game?
                </b-row>

                Choose Hider or Seeker:
                <b-form-select v-model="role" class="mb-3" required="true">
                    <option value="0">Hider</option>
                    <option value="1">Seeker</option>
                </b-form-select>

                <b-row class="rowFlex">
                    <b-col>
                        <b-button id="buttonsbmt" class="button" @click="join">Join Match!</b-button>
                    </b-col>
                    <b-col>
                        <b-button class="button" id="buttonsbmt" @click="cancel">Cancel</b-button>
                    </b-col>
                </b-row>

                <p v-if="error">Error: {{error}}</p>


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
import { async } from 'q';


var map;

export default {
  name: "StartGame",

  data() {
    return {
        username: "",
        role: "",
        error: "",
    };
  },

  props: {
      host: String,
      coords: Object
    },


  methods:{

     cancel: function(){
         eventBus.$emit("cancel-ask", false);
     },

     join: async function(){
         // Join Match
        await axios.post('api/requests/join', {location: this.coords, hostName: this.host, seeker: this.role}).then((players) => {
            eventBus.$emit("cancel-ask", true);
            let allplayers = players.data;
            eventBus.$emit("match-joined", allplayers);

        })
        .catch(err => {
            this.error = "You are not in range! Enter Circle to join.";
        });
         // Re render map to include only people in match

     },


 },

};
</script>


<style scoped>

.rowFlex {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 6px;
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
