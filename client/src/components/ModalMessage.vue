<template>
  <v-dialog
    v-model="dialog"
    width="500"
    @keydown.esc.prevent="minimizeWindow"
    open-on-focus
    persistent
    scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="primary" dark v-bind="attrs" v-on="on" @click="openDialog">Chat</v-btn>
    </template>
    <v-card>
      <v-system-bar height="60" class="mb-1">
          <v-avatar size="40" class="mr-3 mb-1 mt-1">
            <img
              :src="targetUser.imageUrl"
              :alt="targetUser.displayName"
            >
          </v-avatar>
        <h3>
          <b>
            {{ targetUser.displayName }}
          </b>
        </h3>
        <v-spacer></v-spacer>
        <v-btn icon @click="minimizeWindow" small>
          <v-icon small>mdi-minus</v-icon>
        </v-btn>
        <v-btn icon @click="dialog = false;" small>
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-system-bar>
      <v-card-text id="chat">
        <Message v-for="currMessage in allMessages" :key="currMessage._id"
          :isCurrentUser="user.user._id === currMessage.userId"
          :message="currMessage.message"
          :timestamp="currMessage.formattedDate">
        </Message>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container
          fluid>
          <v-form
            @submit.prevent="sendMessage" class="row">
            <v-text-field
              label="Message"
              v-model.trim="message.message"
              class="ml-3"
              clear-icon="mdi-close-circle"
              clearable
              :counter="200"></v-text-field>
            <v-btn class="mx-2 mt-4" icon color="primary"
              type="submit" :disabled="!message.message">
              <v-icon large>mdi-send-circle-outline</v-icon>
            </v-btn>
          </v-form>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Message from './Message.vue';

export default {
  name: 'ModalMessage',
  components: {
    Message,
  },
  props: ['targetUser'],
  mounted() {
    this.findMessages();
  },
  data() {
    return {
      dialog: false,
      message: {
        targetIds: [this.targetUser._id],
        message: '',
      },
    };
  },
  watch: {
    dialog(val) {
      if (val) this.$emit('removeMinimizedChat', this.targetUser);
    },
  },
  methods: {
    ...mapActions('messages', { findMessages: 'find' }),
    openDialog() {
      if (!this.dialog) this.dialog = true;
    },
    minimizeWindow() {
      if (this.dialog) {
        this.dialog = false;
        this.$emit('addMinimizedChat', this.targetUser);
      }
    },
    sendMessage() {
      if (this.dialog && this.message.message) {
        const { Message } = this.$FeathersVuex;
        const newMessage = new Message(this.message);
        newMessage.save()
          .catch(() => {});
      }

      this.message.message = '';
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapGetters('messages', { findMessagesInStore: 'find' }),
    allMessages() {
      /* Falta o srt by createdAt!!! */
      return this.findMessagesInStore({
        query: {
          $or: [
            {
              targetIds: { $in: this.targetUser._id },
              userId: { $eq: this.user.user._id },
            },
            {
              targetIds: { $in: this.user.user._id },
              userId: { $eq: this.targetUser._id },
            },
          ],
        },
      }).data;
    },
  },
};
</script>

<style scoped>
  #chat::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  #chat::-webkit-scrollbar {
    width: 10px;
  }

  #chat::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #CCCAC4;
  }
</style>
