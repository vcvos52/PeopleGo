<template>
  <b-container fluid id="app">
    
    <b-row :no-gutters="true" id="nav" v-if="logged===true">
      <b-col lg="11">
        <h2 id="home-button">Welcome to People Go!</h2>
      </b-col>
      <b-col lg="1">
        <button class="button" id="signout-button" @click="logout">Log Out</button>
      </b-col>
    </b-row>

    <b-row :no-gutters="true" v-if="logged===true">
      <Lobby/>
    </b-row>

    <b-col v-if="logged===true && setUp===true">
      <StartGame/>
    </b-col>
    

    <b-row  v-if="logged=== false">
      <b-col :no-gutters="true" id="nav" lg="12" v-if="logged===false">
        <h2 id="home-button">Welcome to People Go!</h2>
      </b-col>
    </b-row>

    <b-row v-if="logged === false" class="not-logged">
      <Login/>
      <!-- Login is a b-col -->
    </b-row>


    <!-- <b-row v-else-if="logged === true" class="logged">
      <b-col lg="8" id="left">
        <div v-if="currentAction === 'choice'">
          <Choice></Choice>
        </div>
        <div v-else-if="currentAction === 'donate'">
          <Donate></Donate>
        </div>
        <div v-else-if="currentAction === 'receive'">
          <Receive></Receive>
        </div>
      </b-col>
      <b-col lg="4" id="right">
        <Meals></Meals>
      </b-col>
    </b-row> -->

    <div v-if="error" class="error-message">
      <b>{{error}}</b>
    </div>

    <b-row>
      <b-col id="copyrights">Made by The Cakes</b-col>
    </b-row>
  </b-container>
</template>

<script>

import { eventBus } from "./main";
import Login from "./components/Login.vue";
import Lobby from "./components/Lobby.vue";
import StartGame from "./components/StartGame.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import { socket } from "./main";


export default {
  name: 'app',
  components: {
    Login,
    Lobby,
    StartGame
  },
  
  data() {
    return{
      logged: false,
      setUp: false,
    }
  },

  created: async function(){ 
    // when sign in works, change HTML to load next part
    eventBus.$on("login-action", () => {
      this.logged = true;
    });


    /**
     * Checks if the user is currently signed in
     * This decided what HTML elements to render
     */
    axios
      .get("/api/users/isSigned")
      .then(() => {
        this.logged = true;
      })
      .catch(res => {
        this.isSignedIn = false;
      });

  },

  methods: {
    logout: function() {
      axios.put("/api/users/logout")
        .then((username) => { 
          this.logged = false;
          eventBus.$emit("logout", username);
        });
    }, 
  }

}

</script>


<style>
#app {
  background-color: #ffebaf;
  height: 0vh;
}

#app {
  font-family: "Pacifico", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
}

#nav h2 {
  color: white;
  background-color: #3b3131;
  margin: 0;
  padding: 2vh;
  text-align: center;
}

#copyrights {
  font-family: "Pacifico", sans-serif;
  font-size: 100%;
  text-align: center;
  padding-bottom: 5px;
  border-top: 1px solid black;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.button {
  margin-top: 10px;
  background-color: #f1b101;
}


input {
  outline: 0;
  margin-left: 10px;
  background-color: white;
}

#signout {
  background-color: #f1b101;
  font-size: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
}

#signout-button {
  border: 0;
  border-left: 2px solid #ffebaf;
  width: 100%;
  height: 100%;
  margin: 0;
}

#signout-button:hover {
  cursor: pointer;
  background-color: #ffbb00;
}

.success-message {
  font-family: "EB Garamond", serif;
  padding: 30px;
  color: green;
}

.error-message {
  font-family: "EB Garamond", serif;
  padding: 30px;
  color: red;
}

.logged,
.not-logged {
  font-family: "EB Garamond", serif;
  padding-top: 40px;
}

#left {
  padding-left: 50px;
  padding-right: 50px;
  border-right: 1px solid black;
  margin-bottom: 120px;
}

#right {
  padding-left: 50px;
  padding-right: 50px;
  border-right: 1px solid black;
  padding-bottom: 50px;
}

.preset {
  margin: 5px;
}

.multi-select,
.date {
  background-color: white;
  margin: 10px;
}

p {
  margin: 0;
  padding-bottom: 0;
  padding-top: 20px;
}

option {
  background-color: white;
}

.card {
  border-color: black;
}
</style>
