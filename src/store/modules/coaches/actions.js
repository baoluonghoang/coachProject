import axios from "axios";
const url = "https://coaches-e0de4-default-rtdb.firebaseio.com/coaches.json";

export default {
  async fetchCoaches({ commit }) {
    const response = await axios.get(`${url}`);
    const responseData = response.data;
    const coaches = [];
    //Vì mỗi thằng có mỗi id nên for qua cái keyItem
    for (var keyItem in responseData) {
      const coach = {
        id: keyItem,
        firstName: responseData[keyItem].firstName,
        lastName: responseData[keyItem].lastName,
        description: responseData[keyItem].description,
        hourlyRate: responseData[keyItem].hourlyRate,
        areas: responseData[keyItem].areas,
      };
      coaches.push(coach);
    }
    commit("setCoaches", coaches);
  },
};
