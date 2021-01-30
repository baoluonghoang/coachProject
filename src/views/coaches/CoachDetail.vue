<template>
  <div>
    <section>
      <coach-card>
        {{ chooseCoach.firstName }} {{ chooseCoach.lastName }}
        <h4>${{ chooseCoach.hourlyRate }}/hour</h4>
      </coach-card>

      <coach-card>
        <h2>Interested? Reach out now!</h2>
        <coach-button link :to="linkToContact"> Contact </coach-button>
        <!--render ra thằng children trong routes-->
        <router-view :key="$route.path"></router-view>
      </coach-card>

      <coach-card>
        <coach-badge
          v-for="area in chooseCoach.areas"
          :key="area.id"
          :color="area"
          :title="area"
        >
          {{ area }}
        </coach-badge>
        <br />
        {{ this.$route.params.id }}
      </coach-card>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CoachesDetail",
  props: [],
  data() {
    return {
      chooseCoach: [],
    };
  },
  created() {
    // this.chooseCoach = this.$store.getters["coaches/allCoaches"].find((x) => {
    //   return this.id === x.id;
    // });
    axios
      .get(
        `https://coaches-e0de4-default-rtdb.firebaseio.com/coaches/${this.$route.params.id}.json`
      )
      .then((response) => {
        this.chooseCoach = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    linkToContact() {
      return this.$route.path + "/" + this.$route.params.id + "/contact";
    },
  },
  //so sánh list trùng với id
};
</script>

<style scoped></style>
