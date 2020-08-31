import Vue from 'vue';
import Vuex from 'vuex';

import feathersVuex from './feathersVuex';

import localAuth from './localAuth';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex;

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  modules: {
    localAuth,
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        online: false,
      },
    }),
    service('messages', {
      instanceDefaults: {
        status: 'sent',
        reaction: undefined,
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});
