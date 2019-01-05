(function(e){function t(t){for(var a,s,i=t[0],c=t[1],u=t[2],d=0,p=[];d<i.length;d++)s=i[d],o[s]&&p.push(o[s][0]),o[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(p.length)p.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},r=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"07bb":function(e,t,n){},1:function(e,t){},"19f5":function(e,t,n){},"318a":function(e,t,n){},"44a6":function(e,t,n){"use strict";var a=n("afdc"),o=n.n(a);o.a},"54da":function(e,t,n){"use strict";var a=n("318a"),o=n.n(a);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",{attrs:{fluid:"",id:"app"}},[!0===e.logged?n("b-row",{attrs:{"no-gutters":!0,id:"nav"}},[n("b-col",{attrs:{lg:"11"}},[n("h2",{attrs:{id:"home-button"}},[e._v("Welcome to People Go!")])]),n("b-col",{attrs:{lg:"1"}},[n("button",{staticClass:"button",attrs:{id:"signout-button"},on:{click:e.logout}},[e._v("Log Out")])])],1):e._e(),!0===e.logged?n("b-row",{attrs:{"no-gutters":!0,id:"maparea"}},[n("Lobby")],1):e._e(),!0===e.logged&&!0===e.setUp?n("b-col",{staticClass:"gameOptionsCanvas"},[n("StartGame")],1):e._e(),!0===e.logged&&!1===e.setUp&&!0===e.askToJoin?n("b-col",{staticClass:"gameOptionsCanvas"},[n("askJoin",{attrs:{host:e.circleHost,coords:e.coords}})],1):e._e(),!0===e.logged&&!1===e.matchInitialized?n("b-row",{staticClass:"bottomButton",attrs:{lg:"1"}},[n("b-button",{staticClass:"gameSetup",attrs:{id:"game-setup"},on:{click:e.activateSetUp}},[e._v("Setup a Game!")])],1):e._e(),!0===e.logged&&!0===e.matchInitialized?n("b-row",{staticClass:"bottomButton",attrs:{lg:"1"}},[n("b-col",[n("b-button",{staticClass:"endMatch",attrs:{id:"end-match"},on:{click:e.endMatch}},[e._v("End Match")])],1),n("b-col",[n("b-button",{staticClass:"startMatch",attrs:{id:"start-match"},on:{click:e.start}},[e._v("Start Game!")])],1)],1):e._e(),!0===e.logged&&!1===e.matchInitialized&&!0===e.matchJoined?n("b-row",{staticClass:"bottomButton",attrs:{lg:"1"}},[n("b-button",{staticClass:"gameSetup",attrs:{id:"game-setup"},on:{click:e.leaveMatch}},[e._v("Leave Match")])],1):e._e(),!1===e.logged?n("b-row",[!1===e.logged?n("b-col",{attrs:{"no-gutters":!0,id:"nav",lg:"12"}},[n("h2",{attrs:{id:"home-button"}},[e._v("Welcome to People Go!")])]):e._e()],1):e._e(),!1===e.logged?n("b-row",{staticClass:"not-logged"},[n("Login")],1):e._e(),e.error?n("div",{staticClass:"error-message"},[n("b",[e._v(e._s(e.error))])]):e._e(),n("b-row",{staticStyle:{height:"30px"}},[n("b-col",{attrs:{id:"copyrights"}},[e._v("Made by The Cakes")])],1)],1)},r=[],s=(n("96cf"),n("1da1")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-col",{attrs:{id:"login"}},[n("b-row",{attrs:{id:"login"}},[n("b-row",[n("h3",[e._v("Sign in")])]),n("b-row",[n("b-form",{attrs:{method:"post",inline:""},on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[n("b-input",{attrs:{id:"usernameLog",placeholder:"Username",value:"",required:"true"},model:{value:e.usernameLog,callback:function(t){e.usernameLog=t},expression:"usernameLog"}}),n("b-input-group",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{left:"@"}},[n("b-input",{attrs:{id:"passLog",placeholder:"Password",type:"password",value:"",required:"true"},model:{value:e.passLog,callback:function(t){e.passLog=t},expression:"passLog"}})],1),n("b-button",{attrs:{type:"submit"}},[e._v("Log In")])],1)],1)],1),n("b-row",{attrs:{id:"login"}},[n("b-row",[n("h3",[e._v("Create Account")])]),n("b-row",[n("b-form",{attrs:{method:"post",inline:""},on:{submit:function(t){return t.preventDefault(),e.create(t)}}},[n("b-input",{attrs:{id:"usernameCreate",placeholder:"Username",value:"",required:"true"},model:{value:e.usernameCreate,callback:function(t){e.usernameCreate=t},expression:"usernameCreate"}}),n("b-input-group",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{left:"@"}},[n("b-input",{attrs:{id:"passCreate",placeholder:"Password",type:"password",value:"",required:"true"},model:{value:e.passCreate,callback:function(t){e.passCreate=t},expression:"passCreate"}})],1),n("b-button",{attrs:{type:"submit"}},[e._v("Create Account")])],1)],1)],1),e.error?n("p",[e._v("Error: "+e._s(e.error))]):e._e()],1)},c=[],u=(n("f9e3"),n("2dd8"),n("bc3a")),l=n.n(u),d=(n("4be7"),{name:"Login",data:function(){return{usernameLog:"",usernameCreate:"",passLog:"",passCreate:"",success:"",error:"",coords:null}},methods:{login:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t={username:this.usernameLog,password:this.passLog},l.a.post("/api/users/login",t).then(function(e){201!==e.status&&200!==e.status||(Y.$emit("login-action",n.usernameLog),n.usernameLog="",n.passLog="")}).catch(function(e){n.error="Incorrect username or password; please try again"});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),create:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t={username:this.usernameCreate,password:this.passCreate},l.a.post("/api/users/create",t).then(function(e){200===e.status&&(Y.$emit("login-action",n.usernameCreate),n.updatePosition())}).catch(function(e){n.error="The username is either taken or invalid."});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),updatePosition:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:navigator.geolocation?navigator.geolocation.getCurrentPosition(this.getCoords,this.errorFunc,{timeout:6e4,enableHighAccuracy:!0}):console.log("Your browser is out of fashion, there's no geolocation!");case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getCoords:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var n,a,o,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.coords.latitude,a=t.coords.longitude,o={username:this.usernameCreate,latitude:n,longitude:a},l.a.put("/api/users/location",o).then().catch(function(e){r.error=e}),this.usernameCreate="",this.passCreate="";case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},created:function(){this.error="",this.sucess=""}}),p=d,m=(n("54da"),n("2877")),g=Object(m["a"])(p,i,c,!1,null,"0e005cc0",null);g.options.__file="Login.vue";var h,f,b=g.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-col",{attrs:{id:"login"}},[n("div",{attrs:{id:"mapcanvas"}})])},w=[],k=(n("456d"),n("ac6a"),n("7f7f"),n("ade3")),C=(n("e11e"),{}),y=(new google.maps.Marker({}),{name:"Lobby",data:function(){var e;return e={username:"",logged:"",connects:{},markers:{},active:!1,latLng:{}},Object(k["a"])(e,"markers",{}),Object(k["a"])(e,"circles",{}),Object(k["a"])(e,"initLoad",!0),Object(k["a"])(e,"inMatch",!1),Object(k["a"])(e,"activeMatchHost",""),Object(k["a"])(e,"activeMatchPlayers",{}),Object(k["a"])(e,"joinedMatch",!1),Object(k["a"])(e,"keep",[]),e},created:function(){},mounted:function(){var e=this;D.on("coords",function(t){if((!e.joinedMatch||t.name in e.keep)&&(console.log("Socket on location update ",t.name),l.a.put("api/users/location",{username:t.name,latitude:t.coords[0].lat,longitude:t.coords[0].lng}),t.name)){if(t.name in e.markers){var n=e.markers[t.name];n.setMap(null)}C[t.name]=t.coords;var a=new google.maps.LatLng(t.coords[0].lat,t.coords[0].lng),o=new google.maps.Marker({title:t.name,position:a,map:f});e.markers[t.name]=o,e.connects=JSON.stringify(C)}}),D.on("logout",function(t){if(console.log("Socket on logout"),t.name in e.markers){var n=e.markers[t.name];n.setMap(null),delete e.markers[t.name]}}),D.on("match-made",function(t){if(console.log("match made data: ",t),!e.joinedMatch)if(t.username in e.markers&&!(t.username in e.circles)){var n=e.markers[t.username],a=new google.maps.Circle({map:f,radius:1600*t.radius,fillColor:"#AA0000",clickable:!0,center:n.getPosition()});if(console.log("DEBUG",n.getPosition(),n.getPosition()),google.maps.event.addListener(a,"click",function(){Y.$emit("ask-to-join",{title:n.getTitle(),coords:n.getPosition().coords})}),console.log("Binding circle!!"),t.username in e.circles){var o=e.circles[t.username];o.setMap(null)}e.circles[t.username]=a}else console.log("not in markers")});var t=this;D.on("match-deleted",function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(n){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("circles upon match delete: ",t.circles,t.username),!t.inMatch&&!t.joinedMatch){e.next=11;break}if(n.username!==t.activeMatchHost){e.next=9;break}return t.inMatch=!1,t.joinedMatch=!1,e.next=7,this.populateMapMarkers();case 7:return e.next=9,this.populateMapMatches();case 9:e.next=12;break;case 11:n.username in t.circles&&(a=t.circles[n.username],a.setMap(null),delete t.circles[n.username]);case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),D.on("match-left",function(t){if(e.inMatch&&t.username in e.keep){var n=e.keep[t.username];n.setMap(null)}}),D.on("match-joined",function(t){t.host===e.activeMatchHost&&t.newPlayer!==e.username&&(e.keep.push(t.newPlayer),l.a.get("api/users/getLocation/".concat(t.newPlayer)).then(function(t){var n=new google.maps.LatLng(t.latitude,t.longitude),a=new google.maps.Marker({title:t.username,position:n,map:f});e.markers[t.username]=a}))}),navigator.geolocation?(h=navigator.geolocation.watchPosition(this.positionSuccess),console.log("Got that position")):console.log("Your browser is out of fashion, there's no geolocation!"),Y.$on("logout",function(e){navigator.geolocation.clearWatch(h);var t={name:e.data};D.emit("logout",t)}),Y.$on("match-joined",function(t){for(var n=0;n<t.length;n++){var a=t[n];e.keep.push(a.username),a.host&&(e.activeMatchHost=a.username)}Object.keys(e.markers).forEach(function(e){if(!(e in this.keep)){var t=this.markers[e];t.setMap(null),delete this.markers[e]}}),Object.keys(e.circles).forEach(function(e){if(e!==this.activeMatchHost){var t=this.circles[e];t.setMap(null),delete this.circles[e]}}),e.joinedMatch=!0,D.emit("match-joined",{host:e.activeMatchHost,newPlayer:e.username})})},methods:{positionSuccess:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var n,a,o,r,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=this,a=t.coords.latitude,o=t.coords.longitude,r=t.coords.accuracy,this.latLng=new google.maps.LatLng(a,o),!this.initLoad){e.next=13;break}return s={zoom:15,center:this.latLng,mapTypeControl:!1,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP},f=new google.maps.Map(document.getElementById("mapcanvas"),s),this.initLoad=!1,e.next=11,this.populateMapMarkers();case 11:return e.next=13,this.populateMapMatches();case 13:return e.next=15,l.a.get("api/users/getName").then(function(e){n.username=e.data;var t={name:e.data,coords:[{lat:a,lng:o,acr:r}]};D.emit("coords",t)});case 15:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),populateMapMarkers:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(e,n){l.a.get("api/users/getAllLocation").then(function(n){console.log("Locations: ",n.data);for(var a=0;a<n.data.length;a++){var o=n.data[a];if(!(o.username in t.markers)){var r=new google.maps.LatLng(o.latitude,o.longitude),s=new google.maps.Marker({title:o.username,position:r,map:f});t.markers[o.username]=s}}e(!0)}).catch(function(){n(!0)})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),populateMapMatches:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(e,n){l.a.get("api/requests/getAllMatches").then(function(n){console.log("Matches: ",n.data);for(var a=0;a<n.data.length;a++){var o,r=n.data[a],s=r.username,i=r.radius;if(s in t.markers&&!(s in t.circles))(function(){var e=t.markers[s],n=e.getPosition();o=new google.maps.Circle({map:f,radius:1600*i,fillColor:"#AA0000",clickable:!0,center:n}),google.maps.event.addListener(o,"click",function(){Y.$emit("ask-to-join",{title:e.getTitle(),coords:n.coords})}),t.circles[s]=o})()}e(!0)}).catch(function(){n(!0)})});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},beforeDestroy:function(){navigator.geolocation.clearWatch(h)}}),M=y,_=(n("bbc5"),Object(m["a"])(M,v,w,!1,null,"b34f1312",null));_.options.__file="Lobby.vue";var j=_.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-row",{staticClass:"cardFlex"},[n("b-card",{staticClass:"card",attrs:{title:"Choose game options:",tag:"article"}},[n("b-form",{on:{submit:function(t){return t.preventDefault(),e.initializeMatch(t)}}},[e._v("\n\n            Choose Game radius:\n\n            "),n("b-row",{staticClass:"rowFlex"},[n("b-input",{staticClass:"slider",attrs:{step:"0.1",min:"0",max:"10",id:"radius",placeholder:"Radius",type:"range",value:"1"},model:{value:e.radius,callback:function(t){e.radius=t},expression:"radius"}})],1),n("b-row",{staticClass:"rowFlex"},[e._v("\n                "+e._s(e.radius)+"\n            ")]),e._v("\n\n            Choose Hider or Seeker:\n            "),n("b-form-select",{staticClass:"mb-3",attrs:{required:"true"},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}},[n("option",{attrs:{value:"0"}},[e._v("Hider")]),n("option",{attrs:{value:"1"}},[e._v("Seeker")])]),n("b-row",{staticClass:"rowFlex"},[e._v("\n                More options to come in updates...\n            ")]),n("b-row",{staticClass:"rowFlex"},[n("b-button",{staticClass:"button",attrs:{id:"buttonsbmt",type:"submit"}},[e._v("Start Match!")])],1)],1)],1)],1)},L=[],O={name:"StartGame",data:function(){return{radius:1,role:"Select Hider or Seeker",username:""}},created:function(){},mounted:function(){},methods:{initializeMatch:function(){document.getElementById("buttonsbmt").disabled=!0,document.getElementById("buttonsbmt").backgroundColor="#6c757d",console.log("just changed button colors..."),Y.$emit("initialize-Match",{radius:this.radius,seeker:this.role})},updatePosition:function(){console.log("just entered updatePosition function..."),navigator.geolocation?(console.log("nav is good"),navigator.geolocation.getCurrentPosition(this.getCoords,this.errfunc,{timeout:6e3,enableHighAccuracy:!0})):console.log("Your browser is out of fashion, there's no geolocation!")},getCoords:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var n,a,o,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("just entered getCoords..."),n=t.coords.latitude,a=t.coords.longitude,o={latitude:n,longitude:a},console.log("got coords: ",n,a),l.a.put("/api/users/locationUpdate",o).then(function(e){var t={name:e.data,coords:[{lat:n,lng:a}]};D.emit("coords",t)}).catch("Error updating position").then(function(){Y.$emit("initialize-Match",{radius:r.radius,seeker:r.role})});case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),errfunc:function(){console.log("failure number 1"),navigator.geolocation.getCurrentPosition(this.getCoords,this.errfunc2,{timeout:6e4,enableHighAccuracy:!0})},errfunc2:function(){console.log("failure number 2")}}},S=O,P=(n("8a47"),Object(m["a"])(S,x,L,!1,null,"66e7f99c",null));P.options.__file="StartGame.vue";var R=P.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-row",{staticClass:"cardFlex"},[n("b-card",{staticClass:"card",attrs:{title:"Are You Sure?:",tag:"article"}},[n("b-form",{on:{submit:function(t){return t.preventDefault(),e.initializeMatch(t)}}},[n("b-row",{staticClass:"rowFlex"},[e._v("\n                Join "+e._s(e.host)+"'s game?\n            ")]),e._v("\n\n            Choose Hider or Seeker:\n            "),n("b-form-select",{staticClass:"mb-3",attrs:{required:"true"},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}},[n("option",{attrs:{value:"0"}},[e._v("Hider")]),n("option",{attrs:{value:"1"}},[e._v("Seeker")])]),n("b-row",{staticClass:"rowFlex"},[n("b-col",[n("b-button",{staticClass:"button",attrs:{id:"buttonsbmt"},on:{click:e.join}},[e._v("Join Match!")])],1),n("b-col",[n("b-button",{staticClass:"button",attrs:{id:"buttonsbmt"},on:{click:e.cancel}},[e._v("Cancel")])],1)],1),e.error?n("p",[e._v("Error: "+e._s(e.error))]):e._e()],1)],1)],1)},E=[],H={name:"StartGame",data:function(){return{username:"",role:"",error:""}},props:{host:String,coords:Object},methods:{cancel:function(){Y.$emit("cancel-ask",!1)},join:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.a.post("api/requests/join",{location:this.coords,hostName:this.host,seeker:this.role}).then(function(e){Y.$emit("cancel-ask",!0);var t=e.data;Y.$emit("match-joined",t)}).catch(function(e){t.error="You are not in range! Enter Circle to join."});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},J=H,A=(n("d42a"),Object(m["a"])(J,$,E,!1,null,"adc45280",null));A.options.__file="askJoin.vue";var I=A.exports,T=n("8055"),z=n.n(T),G={name:"app",components:{Login:b,Lobby:j,StartGame:R,askJoin:I},data:function(){return{logged:!1,setUp:!1,username:"",matchInitialized:!1,matchJoined:!1,askToJoin:!1,circleHost:"",coords:null}},created:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:Y.$on("login-action",function(e){t.logged=!0,t.username=e,D.connect()}),Y.$on("initialize-Match",function(e){console.log("destroy setup..."),t.setUp=!1,document.getElementById("maparea").style.opacity="1",l.a.post("api/requests/host",e).then(function(e){201!==e.status&&200!==e.status||console.log("Success!")}).catch(function(e){console.log("failure")}),D.emit("match-made",{username:t.username,radius:e.radius}),t.matchInitialized=!0}),Y.$on("ask-to-join",function(e){console.log("asking to join ",e),t.circleHost=e.title,t.coords=e.coords,t.askToJoin=!0}),Y.$on("cancel-ask",function(e){console.log("cancelling ask"),t.circleHost="",t.askToJoin=!1,e&&(t.matchJoined=!0)}),l.a.get("/api/users/isSigned").then(function(e){t.logged=!0,console.log(e,e.data),t.username=e.data}).catch(function(e){t.logged=!1});case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{logout:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.a.put("/api/users/logout").then(function(e){t.logged=!1,Y.$emit("logout",e),t.setUp=!1,document.getElementById("maparea").style.opacity="1",t.endMatch().then(function(){D.disconnect()}),t.matchJoined&&t.leaveMatch()});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),activateSetUp:function(){this.setUp=!0,document.getElementById("maparea").style.opacity="0.5"},sendPosition:function(){},start:function(){},endMatch:function(){var e=this;return new Promise(function(t,n){l.a.delete("api/requests/match/".concat(e.username)).then(function(){D.emit("match-deleted",{username:e.username}),e.matchInitialized=!1,t(!0)}).catch(function(){n(!0)})})},leaveMatch:function(){var e=this;l.a.delete("api/requests/leave/".concat(this.username)).then(function(){D.emit("match-left",{username:e.username})}).then(function(){e.matchJoined=!1})}}},U=G,q=(n("44a6"),n("b0a0"),Object(m["a"])(U,o,r,!1,null,"3583de63",null));q.options.__file="App.vue";var B=q.exports,F=n("9f7b");n.d(t,"socket",function(){return D}),n.d(t,"eventBus",function(){return Y});var D=z()(),Y=new a["a"];a["a"].config.productionTip=!1,a["a"].use(F["a"]),new a["a"]({render:function(e){return e(B)}}).$mount("#app")},"8a47":function(e,t,n){"use strict";var a=n("c751"),o=n.n(a);o.a},"9d83":function(e,t,n){},afdc:function(e,t,n){},b0a0:function(e,t,n){"use strict";var a=n("07bb"),o=n.n(a);o.a},bbc5:function(e,t,n){"use strict";var a=n("9d83"),o=n.n(a);o.a},c751:function(e,t,n){},d42a:function(e,t,n){"use strict";var a=n("19f5"),o=n.n(a);o.a}});
//# sourceMappingURL=app.ada54a53.js.map