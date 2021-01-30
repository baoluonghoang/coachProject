//bên trong action của module, context.state sẽ expose ra local state và root state sẽ được expose như là context.rootState

//Để dispatch các action và commit các mutation trong global namespace, truyền { root: true } như là tham số thứ 3 vào dispatch và commit

export default {
  contact({ commit }, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      userMessage: payload.message,
    };
    commit("addRequest", newRequest);
  },
};
