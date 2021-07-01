<template>
  <div v-if="message.length > 0">
    <div class="message" v-for="message in message" :key=message.id  >
      <p class="meta">{{ message.username }} 
        <!-- <span>9:12pm</span> -->
      </p>
      <p class="text">
        {{ message.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: [
    "message"
  ]
};
</script>

<style>
</style>