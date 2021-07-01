<template>
  <div>
    <ul id="users" v-for="user in users" :key=user.id>
      <li>{{ user.username }}</li>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: "Users",
  props: [
    'users'
  ]
};
</script>

<style>
</style>