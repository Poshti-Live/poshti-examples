<template>
  <div>
    <button @click="sendMessage">Send Message</button>
  </div>
</template>

<script>
import { Poshti, USER_ROLES } from 'poshti';
const config = {
  poshti_id: "<poshti-id>",
  channel_name: "<channel-name>",
  token: "<admin token>"
};


export default {
  created() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      const poshti = new Poshti({
        userRole: USER_ROLES.admin,
        params: {
          auth: config.token,
          pid: config.poshti_id,
        },
      })
      poshti.connect()
      this.channel = poshti.channel(config.channel_name);
      this.channel.join()
    },
    sendMessage() {
      this.channel.push("TopicMessage", { message: prompt('message:'), date: Date.now() })
        .receive("ok", (payload) => console.log("replied:", payload))
        .receive("error", (err) => console.log("errored", err))
        .receive("timeout", () => console.log("pushing"));
    }
  }
};
</script>
