import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import io from 'socket.io-client';

export const socket = io();
export const eventBus = new Vue();

Vue.config.productionTip = false
Vue.use(BootstrapVue)


new Vue({
  render: h => h(App)
}).$mount('#app')
