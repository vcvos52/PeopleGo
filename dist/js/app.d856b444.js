(function(e){function t(t){for(var r,s,i=t[0],u=t[1],c=t[2],p=0,g=[];p<i.length;p++)s=i[p],o[s]&&g.push(o[s][0]),o[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(g.length)g.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"082a":function(e,t,n){"use strict";var r=n("9df7"),o=n.n(r);o.a},"09f3":function(e,t,n){},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",{attrs:{fluid:"",id:"app"}},[!0===e.logged?n("b-row",{attrs:{"no-gutters":!0,id:"nav"}},[n("b-col",{attrs:{lg:"11"}},[n("h2",{attrs:{id:"home-button"}},[e._v("Welcome to People Go!")])]),n("b-col",{attrs:{lg:"1"}},[n("button",{staticClass:"button",attrs:{id:"signout-button"},on:{click:e.logout}},[e._v("Log Out")])])],1):e._e(),!0===e.logged?n("b-row",{attrs:{"no-gutters":!0}},[n("Lobby")],1):e._e(),!1===e.logged?n("b-row",[!1===e.logged?n("b-col",{attrs:{"no-gutters":!0,id:"nav",lg:"12"}},[n("h2",{attrs:{id:"home-button"}},[e._v("Welcome to People Go!")])]):e._e()],1):e._e(),!1===e.logged?n("b-row",{staticClass:"not-logged"},[n("Login")],1):e._e(),e.error?n("div",{staticClass:"error-message"},[n("b",[e._v(e._s(e.error))])]):e._e(),n("b-row",[n("b-col",{attrs:{id:"copyrights"}},[e._v("Made by The Cakes")])],1)],1)},a=[],s=(n("96cf"),n("1da1")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-col",{attrs:{id:"login"}},[n("b-row",{attrs:{id:"login"}},[n("b-row",[n("h3",[e._v("Sign in")])]),n("b-row",[n("b-form",{attrs:{method:"post",inline:""},on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[n("b-input",{attrs:{id:"usernameLog",placeholder:"Username"},model:{value:e.usernameLog,callback:function(t){e.usernameLog=t},expression:"usernameLog"}}),n("b-input-group",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{left:"@"}},[n("b-input",{attrs:{id:"passLog",placeholder:"Password",type:"password"},model:{value:e.passLog,callback:function(t){e.passLog=t},expression:"passLog"}})],1),n("b-button",{attrs:{type:"submit"}},[e._v("Log In")])],1)],1)],1),n("b-row",{attrs:{id:"login"}},[n("b-row",[n("h3",[e._v("Create Account")])]),n("b-row",[n("b-form",{attrs:{method:"post",inline:""},on:{submit:function(t){return t.preventDefault(),e.create(t)}}},[n("b-input",{attrs:{id:"usernameCreate",placeholder:"Username"},model:{value:e.usernameCreate,callback:function(t){e.usernameCreate=t},expression:"usernameCreate"}}),n("b-input-group",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{left:"@"}},[n("b-input",{attrs:{id:"passCreate",placeholder:"Password",type:"password"},model:{value:e.passCreate,callback:function(t){e.passCreate=t},expression:"passCreate"}})],1),n("b-button",{attrs:{type:"submit"}},[e._v("Create Account")])],1)],1)],1),e.error?n("p",[e._v("Error: "+e._s(e.error))]):e._e()],1)},u=[],c=(n("f9e3"),n("2dd8"),n("bc3a")),l=n.n(c),p=(n("4be7"),{name:"Login",data:function(){return{usernameLog:"",usernameCreate:"",passLog:"",passCreate:"",success:"",error:"",coords:null}},methods:{login:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t={username:this.usernameLog,password:this.passLog},l.a.post("/api/users/login",t).then(function(e){201!==e.status&&200!==e.status||$.$emit("login-action")}).catch(function(e){n.error="Incorrect username or password; please try again"});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),create:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t={username:this.usernameCreate,password:this.passCreate},l.a.post("/api/users/create",t).then(function(e){200===e.status&&($.$emit("login-action"),n.updatePosition())}).catch(function(e){n.error="The username is either taken or invalid."});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),updatePosition:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:navigator.geolocation?navigator.geolocation.getCurrentPosition(this.getCoords,this.errorFunc,{timeout:6e4,enableHighAccuracy:!0}):console.log("Your browser is out of fashion, there's no geolocation!");case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getCoords:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var n,r,o,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.coords.latitude,r=t.coords.longitude,o={username:this.usernameCreate,latitude:n,longitude:r},l.a.put("/api/users/location",o).then().catch(function(e){a.error=e});case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},created:function(){this.error="",this.sucess=""}}),g=p,d=(n("082a"),n("2877")),f=Object(d["a"])(g,i,u,!1,null,"5e373272",null);f.options.__file="Login.vue";var m,h,b=f.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-col",{attrs:{id:"login"}},[n("div",{attrs:{id:"mapcanvas"}})])},w=[],y=(n("7f7f"),n("ade3")),_=(n("e11eb"),n("8055")),L=n.n(_),C=null,O={},k=(new google.maps.Marker({title:"Balls"}),{name:"Lobby",data:function(){var e;return e={username:"",logged:"",connects:{},markers:{},active:!1,latLng:{}},Object(y["a"])(e,"markers",{}),Object(y["a"])(e,"initLoad",!0),e},created:function(){C=L()()},mounted:function(){var e=this;C.on("coords",function(t){if(t.name in e.markers){var n=e.markers[t.name];n.setMap(null)}O[t.name]=t.coords;var r=new google.maps.LatLng(t.coords[0].lat,t.coords[0].lng),o=new google.maps.Marker({title:t.name,position:r,map:h});e.markers[t.name]=o,e.connects=JSON.stringify(O)}),navigator.geolocation?(m=navigator.geolocation.watchPosition(this.positionSuccess),console.log("Got that position")):console.log("Your browser is out of fashion, there's no geolocation!")},methods:{positionSuccess:function(e){var t=this,n=e.coords.latitude,r=e.coords.longitude,o=e.coords.accuracy;if(this.latLng=new google.maps.LatLng(n,r),this.initLoad){var a={zoom:15,center:this.latLng,mapTypeControl:!1,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeId:google.maps.MapTypeId.ROADMAP};h=new google.maps.Map(document.getElementById("mapcanvas"),a),this.initLoad=!1}l.a.get("api/users/getName").then(function(e){t.username=e.data;var a={name:e.data,coords:[{lat:n,lng:r,acr:o}]};C.emit("coords",a)})}},beforeDestroy:function(){navigator.geolocation.clearWatch(m)}}),j=k,x=(n("7475"),Object(d["a"])(j,v,w,!1,null,"7765bc85",null));x.options.__file="Lobby.vue";var P=x.exports,S={name:"app",components:{Login:b,Lobby:P},data:function(){return{logged:!1}},created:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:$.$on("login-action",function(){t.logged=!0}),l.a.get("/api/users/isSigned").then(function(){t.logged=!0}).catch(function(e){t.isSignedIn=!1});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{logout:function(){var e=this;l.a.put("/api/users/logout").then(function(){e.logged=!1})}}},M=S,R=(n("034f"),Object(d["a"])(M,o,a,!1,null,null,null));R.options.__file="App.vue";var T=R.exports,A=n("9f7b");n.d(t,"eventBus",function(){return $});var $=new r["a"];r["a"].config.productionTip=!1,r["a"].use(A["a"]),new r["a"]({render:function(e){return e(T)}}).$mount("#app")},"64a9":function(e,t,n){},7475:function(e,t,n){"use strict";var r=n("09f3"),o=n.n(r);o.a},"9df7":function(e,t,n){}});
//# sourceMappingURL=app.d856b444.js.map