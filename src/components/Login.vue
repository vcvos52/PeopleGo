<template>
  <b-col id="login">
    <b-row id="login">
      <b-row>
        <h3>Sign in</h3>
      </b-row>
      <b-row>
        <b-form  v-on:submit.prevent="login" method="post" inline>
          <b-input id="usernameLog" v-model="usernameLog" placeholder="Username" value="" required="true"/>
          <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="passLog" v-model="passLog" placeholder="Password" type="password" value="" required="true"/>
          </b-input-group>
          <b-button type="submit">Log In</b-button>
        </b-form>
      </b-row>
    </b-row>

    <b-row id="login">
      <b-row>
        <h3>Create Account</h3>
      </b-row>
      <b-row>
        <b-form  v-on:submit.prevent="create" method="post" inline>
          <b-input id="usernameCreate" v-model="usernameCreate" placeholder="Username" value="" required="true"/>
          <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="passCreate" v-model="passCreate" placeholder="Password" type="password" value="" required="true"/>
          </b-input-group>
          <b-button type="submit" >Create Account</b-button>
        </b-form>
      </b-row>
    </b-row>
    <p v-if="error">Error: {{error}}</p>
  </b-col>
</template>


<script>
import { eventBus } from "../main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import { async } from 'q';

export default {
  name: "Login",

  data() {
    return {
        usernameLog: "",
        usernameCreate: "",
        passLog: "",
        passCreate: "",
        success: "",
        error: "",
        coords: null,
    };
  },

  methods: {
    login: async function() {
        const bodyContent = { username: this.usernameLog, password: this.passLog};
        axios
            .post("/api/users/login", bodyContent)
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    eventBus.$emit("login-action", this.usernameLog);
                    this.usernameLog = "";
                    this.passLog = "";
                }
            })
            .catch(err => {
              this.error = "Incorrect username or password; please try again";
            });
    },


    create: async function() {
        var bodyContent = { username: this.usernameCreate, password: this.passCreate }
        axios
            .post("/api/users/create", bodyContent)
            .then(res => {
            if (res.status === 200) {
                eventBus.$emit("login-action", this.usernameCreate);
                this.updatePosition();
            }
            })
            .catch(err => {
              this.error = "The username is either taken or invalid.";
        });
    },


    updatePosition: async function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoords, this.errorFunc, {timeout:60000, enableHighAccuracy: true});
        } else {
            console.log("Your browser is out of fashion, there\'s no geolocation!");
        }
    },


    getCoords: async function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        let bodyContent = {username: this.usernameCreate, latitude: lat, longitude: lng};
        axios
            .put("/api/users/location", bodyContent)
            .then()
            .catch(err => {
            this.error = err;
        });
        this.usernameCreate = "";
        this.passCreate = "";
    },

  },

  created: function() {
    this.error = "";
    this.sucess = "";
  },

};
</script>


<style scoped>
#login {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

input {
  outline: 0;
  margin-left: 10px;
  background-color: white;
}

p {
  color:red;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#login-form{
  margin-bottom: 25%;
}

h4 {
  font-size: 120%;
}

#logging-button {
  font-family: "Pacifico", cursive;
}
</style>
