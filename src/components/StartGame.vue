<template>
    <b-row>
        <b-card title="Choose game options:"
                tag="article"
                class="card">
            <p class="card-text">
            Choose Game Options:
            </p>
            <b-form @submit.prevent="chooseReceive">
                <b-button type="submit" class="button">Receive</b-button>
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

    };
  },

 created: function(){
 },

 mounted(){

 
    },


 methods:{

 },

};
</script>


<style scoped>



</style>
