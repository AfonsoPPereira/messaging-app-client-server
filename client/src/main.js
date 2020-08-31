import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const vuetifyOptions = {};
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  router,
  store,
  render: h => h(App),
}).$mount('#app');
