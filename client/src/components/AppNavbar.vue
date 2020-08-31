<template>
  <v-app-bar
    app>
    <v-toolbar-title>
      <v-btn text :to="{ name: 'home' }">Social Media</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn text :to="{ name: 'login' }">Login</v-btn>
      <v-btn text :to="{ name: 'signup' }">SignUp</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <app-avatar :user="user.user"></app-avatar>
      <v-btn text @click="logout">LogOut</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import AppAvatar from '@/components/AppAvatar';

export default {
  props: ['user', 'logout'],
  components: {
    AppAvatar,
  },
};
</script>

