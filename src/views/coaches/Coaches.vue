<template>
  <div>
    <section>
      <coach-filter @changeFilter="onChangeFilter"></coach-filter>
    </section>
    <section>
      <coach-card>
        <div class="list-button">
          <coach-button @click="fetchCoaches" background="light">
            Refresh
          </coach-button>

          <coach-button link to="/login?redirect=register" v-if="!user">
            Login to Register as Coach
          </coach-button>
        </div>

        <div class="list-coaches" v-if="existCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :hourlyRate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </div>
        <div v-else>
          <coach-loading></coach-loading>
        </div>
      </coach-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";
export default {
  components: { CoachFilter, CoachItem },
  data() {
    return {
      loading: false,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    existCoaches() {
      return !this.loading && this.$store.getters["coaches/existCoaches"];
    },
    filteredCoaches() {
      return this.$store.getters["coaches/allCoaches"].filter((coach) => {
        if (coach.areas.includes("frontend") && this.activeFilter.frontend) {
          return true;
        }
        if (coach.areas.includes("backend") && this.activeFilter.backend) {
          return true;
        }
        if (coach.areas.includes("career") && this.activeFilter.career) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.fetchCoaches();
  },
  methods: {
    onChangeFilter(data) {
      //data: nhận được từ this.filter của thằng con CoachFilter
      this.activeFilter = data;
      // console.log("data của thằng cha :", this.activeFilter);
    },
    async fetchCoaches() {
      this.loading = true;
      try {
        this.$store.dispatch("coaches/fetchCoaches").then(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.list-button {
  display: flex;
  justify-content: space-between;
}
</style>
