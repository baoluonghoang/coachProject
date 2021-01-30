//bên trong getters của module, root state sẽ được expose như là tham số thứ 3
//Nếu ta muốn sử dụng state và getters ở global, rootState và rootGetters sẽ được truyền vào như là tham số thứ 3 hoặc thứ 4 tới function getters,

export default {
  requests: (state, getters, rootState, rootGetters) => {
    //lấy thằng id ở thằng index cha
    const id = rootGetters.userId;
    return state.requests.filter((request) => request.id === id);
  },

  //getters: check những thằng request khi filter ở trên
  hasRequests: (state, getters) =>
    getters.requests && getters.requests.length > 0,
};
