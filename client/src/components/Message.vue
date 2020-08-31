<template>
  <div class="d-flex mb-1" :class="isCurrentUser ? 'flex-row-reverse' : ''">
    <!-- <v-card @click="toggleTimestamp = !toggleTimestamp"
      class="primary pa-3 rounded-card" shaped hover> -->
    <div style="width: auto;">
            <v-chip
              @click="toggleTimestamp = !toggleTimestamp"
              class=" pa-3" large
              :class="isCurrentUser ? 'primary' : ''"
              style="height: auto;"
            >
      {{ message }} {{ isCurrentUser }}
    <!-- /v-card> -->
            </v-chip>
    </div>
    <div v-if="toggleTimestamp" class="caption align-self-end">{{ timestamp }}</div>
  </div>
</template>

<style scoped>
  .rounded-card {
    border-radius: 40px;
  }
</style>

<script>

export default {
  name: 'Message',
  props: ['isCurrentUser', 'message', 'timestamp'],
  data() {
    return {
      toggleTimestamp: true,
    };
  },
  /* computed: {
    formattedDate() {
      const date = this.message.createdAt;
      return '$(date)';
    }
  }, */
};
</script>
