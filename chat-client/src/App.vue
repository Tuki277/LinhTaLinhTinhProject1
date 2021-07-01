<template>
  <div>
    <div class="join-container" v-if="statusFormChat === true">
      <header class="join-header">
        <h1><i class="fas fa-smile"></i> ChatCord</h1>
      </header>
      <main class="join-main">
        <form @submit="handleForm">
          <div class="form-control">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              v-model="username"
              required
              
            />
          </div>
          <div class="form-control">
            <label for="room">Room</label>
            <select name="room" id="room">
              <option value="JavaScript">ROOM</option>
              <!-- <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option> -->
            </select>
          </div>
          <button type="submit" class="btn">Join Chat</button>
        </form>
      </main>
    </div>

    <div class="chat-container" v-else>
      <header class="chat-header">
        <h1><i class="fas fa-smile"></i> ChatCord</h1>
        <button class="btn" @click="leaveRoom">Leave Room</button>
      </header>
      <main class="chat-main">
        <div class="chat-sidebar">
          <h3><i class="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">JavaScript</h2>
          <h3><i class="fas fa-users"></i> Users</h3>
          <Users :users="userInSystem"/>
        </div>
        <div class="chat-messages">
          <Message :message="messageList"/>
        </div>
      </main>
      <div class="chat-form-container">
        <form id="chat-form" @submit="sendMessage">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autocomplete="off"
            v-model="message"
          />
          <button class="btn"><i class="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './components/Message.vue';
import Users from './components/Users.vue'
import io from 'socket.io-client'
import axios from 'axios'

export default {
  name: "App",
  components: {
    Users,
    Message
  },
  created() {
    this.socket.on('data', data => {
      this.messageList.push({ message: data.message, id: Math.random(), username: data.username })
    })
  },
  data() {
    return {
      userInSystem: [],
      messageList: [],
      username: "",
      statusFormChat: true,
      message: '',
      socket: io("http://localhost:3000")
    };
  },
  methods: {
    handleForm(e) {
      e.preventDefault();
      var username = this.username
      console.log(username);
      if(username === "" || username.length < 4) {
        alert("Error create username")
      } else {
        this.userInSystem.push({ username: username, id: Math.random() })
        this.statusFormChat = false
        console.log("user array"  ,this.userInSystem)
        localStorage.setItem('username', username)
      }
    },
    leaveRoom () {
      this.statusFormChat = true
      localStorage.removeItem('username')
    },
    sendMessage(e) {
      e.preventDefault()

      var message = this.message
      var dataPost = {
        message: message,
        username: localStorage.getItem('username')
      }
      axios.post("http://localhost:3000/sentMessage", dataPost).then(res => {
        console.log(res)
        this.message = ''
      }).catch(err => {
        console.log(err)
      })
    }
  },
};
</script>

<style>
</style>