export default {
  allCoaches: (state) => state.coaches,
  existCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
}