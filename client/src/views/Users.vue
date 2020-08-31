<template>
  <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <v-layout row align-center wrap>
          <v-progress-circular v-if="0" :size="70"
            :width="7" indeterminate color="primary"></v-progress-circular>
          <v-list shaped>
            <v-subheader>All Users ({{ sortedUsers.length }})</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="curr_user in sortedUsers" :key="curr_user._id">
                <v-row>
                  <v-col cols="2">
                    <v-list-item-icon>
                      <v-icon :color="curr_user.online ? 'green' : 'red'">mdi-account</v-icon>
                    </v-list-item-icon>
                  </v-col>
                  <v-list-item-content>
                    <v-col cols="5">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-list-item-title
                            v-text="curr_user.displayName"
                            v-bind="attrs"
                            v-on="on"
                            :class="user.user._id === curr_user._id ? 'font-weight-black' : ''"
                          ></v-list-item-title>
                        </template>
                        <span>{{ curr_user.displayName }}</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="7">
                      <ModalMessage
                        @addMinimizedChat="addChat"
                        @removeMinimizedChat="removeChat"
                        :ref="curr_user._id"
                        v-if="user.user._id !== curr_user._id"
                        :targetUser="curr_user">
                      </ModalMessage>
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-layout>
      </v-slide-y-transition>
        <div class="d-flex align-end flex-column"
          style="position: fixed; bottom: 40px; right: 30px;">
          <MinimizedChat
            v-for="chat in usersChat"
            :key="chat._id"
            :user="chat"
            @removeMinimizedChat="removeChat">
          </MinimizedChat>
        </div>
  </v-container>
</template>

<script>
/* eslint-disable import/no-unresolved */
import { mapState, mapGetters, mapActions } from 'vuex';
import ModalMessage from '../components/ModalMessage.vue';
import MinimizedChat from '../components/MinimizedChat.vue';

export default {
  name: 'users',
  components: {
    ModalMessage,
    MinimizedChat,
  },
  mounted() {
    this.findUsers();
    if (localStorage.usersChat) this.usersChat = JSON.parse(localStorage.usersChat);
  },
  watch: {
    usersChat(newVal) {
      localStorage.usersChat = JSON.stringify(newVal);
    },
  },
  data() {
    return {
      usersChat: [],
    };
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' }),
    addChat(userObj) {
      this.usersChat.push(userObj);
    },
    removeChat(userObj) {
      const userIndex = this.usersChat.findIndex(item => item._id === userObj._id);
      if (userIndex !== -1) this.usersChat.splice(userIndex, 1);
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapGetters('users', { findUsersInStore: 'find' }),
    sortedUsers() {
      if (this.user) {
        const allUsers = this.findUsersInStore().data;
        const userId = this.user.user._id;

        allUsers.sort((x, y) => {
          if (x._id === userId) return -1;
          if (y._id === userId) return 1;
          if (x.online && !y.online) return -1;
          if (!x.online && y.online) return 1;
          if (x.displayName > y.displayName) return 1;
          return -1;
        });
        return allUsers;
      }

      return [];
    },
  },
};
</script>
