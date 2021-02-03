export default {
  allCoaches: (state) => state.coaches,

  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },

  isCoach(_, getters, _2, rootGetters) {
    const userId = rootGetters["auth/user"];
    return getters.allCoaches.some((coach) => coach.id === userId);
    //kiểm tra xem có ít nhất 1 phần tử thoả điều kiện ở hàm được tryền vào không?
  },
};
