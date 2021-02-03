export default {
  user: (state) => state.user,

  token: (state) => state.token,

  isLogin: (state) => !!state.token,
};
