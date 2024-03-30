import { createStore } from "vuex";
import router from "../router/index";
//import axios from 'axios'

export default createStore({
  state: {
    email: "",
  },
  getters: {},
  mutations: {
    login(state, email) {
      state.email = email;
    },
    logout(state) {
      state.email = "";

      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      localStorage.removeItem("pictureUrl");
      router.push({ path: "/" });
    },
    initializeStore(state) {
      if (localStorage.getItem("email")) {
        state.email = localStorage.getItem("email");
      }
    },
  },
});
