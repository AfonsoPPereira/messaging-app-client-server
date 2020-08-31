<template>
  <v-container fluid>
    <v-alert v-if="errorMsg" type="error">
      {{ errorMsg }}
    </v-alert>
    <v-alert v-if="successMsg" type="success">
      {{ successMsg }}
    </v-alert>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="customLogin({ valid, user })"
          @keydown.prevent.enter>
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            @input="clearError"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            @input="clearError"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Login</v-btn>
        </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '@/validators';

export default {
  name: 'login',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params !== {} && to.params.successMsg) {
        vm.successMsg = to.params.successMsg;
      }

      next();
    });
  },
  data: () => ({
    valid: false,
    errorMsg: '',
    successMsg: '',
    user: {
      username: '',
      password: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('localAuth', ['login']),
    async customLogin(obj) {
      this.successMsg = '';
      await this.login(obj).catch((error) => {
        this.errorMsg = error;
      });
    },
    clearError() {
      this.errorMsg = '';
    },
  },
};
</script>
