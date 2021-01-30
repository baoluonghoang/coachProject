<template>
  <div>
    <coach-card>
      <h2>Requests Received</h2>
      <div class="list-message" v-if="hasRequests">
        <div class="box" v-for="request in receivedRequests" :key="request.id">
          <h4>Day: {{ request.id }}</h4>
          <a :href="mailTo(request.userEmail)"
            >Email: {{ request.userEmail }}</a
          >
          <h4>Message: {{ request.userMessage }}</h4>
        </div>
      </div>
      <h3 v-else>You haven't received any requests yet!</h3>
    </coach-card>
  </div>
</template>
<script>
export default {
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    mailTo(user) {
      return "mailto:" + user;
    },
  },
};
</script>
<style scoped>
h2,
h3 {
  text-align: center;
}

.list-message {
  text-align: left;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

.box {
  padding: 10px;
  border: 1px solid rgb(209, 206, 206);
  margin: 15px 0;
}
</style>
