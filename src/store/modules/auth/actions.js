import firebase from "firebase/app";
import "firebase/auth";
import router from "../../../router";

export default {
  signUp({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        const newUser = {
          id: user.uid,
          registeredMeetups: [],
        };
        localStorage.setItem("user", newUser);
        commit("setUser", {
          newUser,
        });
        router.push("/coaches");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  login({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        localStorage.setItem("user", user.user.uid);
        commit("setUser", user.user.uid);
        router.push("/coaches");
      })
      .catch((e) => {
        console.log("Login failed: ", e);
      });
  },
  // logout({commit}) {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then((user) => {
  //       localStorage.removeItem('user');
  //       commit("setUser", user.user.uid)
  //       router.push("/coaches");
  //     })
  //     .catch((e) => {
  //       console.log("Logout failed: ", e);
  //     });
  // },
};
