import { createStore } from "vuex";

// create a new store instance
const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("IsLoggedIn", true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("IsLoggedIn", false);
    },
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
});

export default store;
