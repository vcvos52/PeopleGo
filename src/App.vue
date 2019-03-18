<template>
  <b-container fluid id="app">
    
    <!-- Signed in header bar -->
    <b-row :no-gutters="true" id="nav" v-if="logged===true">
      <b-col lg="11">
        <h2 id="home-button">Welcome to People Go!</h2>
      </b-col>
      <b-col lg="1">
        <button class="button" id="signout-button" @click="logout">Log Out</button>
      </b-col>
    </b-row>

    <!-- The game map -->
    <b-row :no-gutters="true" v-if="logged===true" id="maparea">
      <Lobby/>
    </b-row>

    <!-- The game options menu -->
    <b-col class="gameOptionsCanvas" v-if="logged===true && setUp===true">
      <StartGame/>
    </b-col>

    <!-- The game options menu -->
    <b-col class="gameOptionsCanvas" v-if="logged===true && setUp===false && askToJoin===true">
      <askJoin v-bind:host="circleHost" v-bind:coords="coords"/>
    </b-col>

    <!-- Button to bring up game settings -->
    <b-row class="bottomButton" v-if="logged===true && matchInitialized===false" lg="1">
      <b-button class="gameSetup" id="game-setup" @click="activateSetUp">Setup a Game!</b-button>
    </b-row>

    <!-- Button after the match is setup -->
    <b-row class="bottomButton" v-if="logged===true && matchInitialized===true" lg="1">
      <b-col>
        <b-button class="endMatch" id="end-match" @click="endMatch">End Match</b-button>
      </b-col>
      <b-col>
        <b-button class="startMatch" id="start-match" @click="start">Start Game!</b-button>
      </b-col>
    </b-row>

    <!-- Button after match joined -->
    <b-row class="bottomButton" v-if="logged===true && matchInitialized===false && matchJoined===true" lg="1">
        <b-button class="gameSetup" id="game-setup" @click="leaveMatch">Leave Match</b-button>
    </b-row>

    <!-- Signed out header bar -->
    <b-row  v-if="logged=== false">
      <b-col :no-gutters="true" id="nav" lg="12" v-if="logged===false">
        <h2 id="home-button">Welcome to People Go!</h2>
      </b-col>
    </b-row>

    <!-- The Log in Form -->
    <b-row v-if="logged === false" class="not-logged">
      <Login/>
    </b-row>

    <!-- The Error message -->
    <div v-if="error" class="error-message">
      <b>{{error}}</b>
    </div>

    <!-- Copy rights at bottom -->
    <b-row style="height: 30px;">
      <b-col id="copyrights">Made by The Cakes</b-col>
    </b-row>
  </b-container>
</template>

<script>

import { eventBus } from "./main";
import Login from "./components/Login.vue";
import Lobby from "./components/Lobby.vue";
import StartGame from "./components/StartGame.vue";
import askJoin from "./components/askJoin.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import { socket } from "./main";
import { async } from 'q';
import io from 'socket.io-client';



export default {
  name: 'app',
  components: {
    Login,
    Lobby,
    StartGame,
    askJoin
  },
  
  data() {
    return{
      logged: false,
      setUp: false,
      username: "",
      matchInitialized: false,
      matchJoined: false,
      askToJoin: false,
      circleHost: "",
      coords: null,
    }
  },

  created: async function(){
    // when sign in works, change HTML to load next part
    eventBus.$on("login-action", (username) => {
      this.logged = true;
      this.username = username;
      socket.connect();
    });


    eventBus.$on("initialize-Match", (data) => {
      console.log("destroy setup...");
      this.setUp = false;
      document.getElementById("maparea").style.opacity = "1";
      axios.post('api/requests/host', data).then(res => {
          if (res.status === 201 || res.status === 200) {
            console.log("Success!")
          }
      }).catch(err => {console.log("failure")});

      socket.emit('match-made', {username: this.username, radius: data.radius});
      this.matchInitialized = true;
    });

    eventBus.$on("ask-to-join", (data) => {
      this.circleHost = data.title;
      let latlng = data.coords;
      this.coords = {latitude: latlng.lat(), longitude: latlng.lng()};
      this.askToJoin = true;
    });

    eventBus.$on("cancel-ask", (joined) => {
      console.log("cancelling ask");
      this.circleHost = "";
      this.askToJoin = false;
      if (joined){this.matchJoined = true}
    });


    /**
     * Checks if the user is currently signed in
     * This decided what HTML elements to render
     */
    axios
      .get("/api/users/isSigned")
      .then((username) => {
        this.logged = true;
        console.log(username, username.data);
        this.username = username.data;
      })
      .catch(res => {
        this.logged = false;
      });

  },

  methods: {
    logout: async function() {
      await axios.put("/api/users/logout")
        .then((username) => { 
          this.logged = false;
          eventBus.$emit("logout", username);
          this.setUp = false;
          document.getElementById("maparea").style.opacity = "1";
          this.endMatch().then(() => {socket.disconnect()});
          if (this.matchJoined){
              this.leaveMatch();
          }
        })

    }, 

    activateSetUp: function() {
      this.setUp = true;
      document.getElementById("maparea").style.opacity = "0.5";
    },

    sendPosition: function(){

    },

    start: function(){
      
    },

    endMatch: function(){
      return new Promise((resolve, reject) => {
        axios.delete(`api/requests/match/${this.username}`)
          .then(() => {
            socket.emit("match-deleted", {username: this.username});
            this.matchInitialized = false;
            resolve(true);
          }).catch(() => {reject(true)});
      });
    },

    leaveMatch: function(){
      axios.delete(`api/requests/leave/${this.username}`)
        .then(() => {
          socket.emit("match-left", {username: this.username})
        })
        .then(() => {this.matchJoined = false});
    }

  }

}

</script>

<style scoped>
input {
  outline: 0;
  margin-left: 10px;
  background-color: white;
}
</style>



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

.bottomButton {
  width: 100vw;
  position: absolute;
  bottom: 50px;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  margin-top: 10px;
  background-color: #f1b101;
}

.gameSetup {
  height: 5vh;
}

.gameOptionsCanvas {
  height: 100vh;
  width:100vw;
  top: 8vh;
  bottom: 30px;
  position: fixed;
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
