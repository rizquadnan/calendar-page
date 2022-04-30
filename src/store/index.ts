import Vue from "vue";
import Vuex from "../../node_modules/vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedDate: "",
  },
  getters: {},
  mutations: {
    initStore: (state) => {
      const cachedSelectedDate = localStorage.getItem("selectedDate");
      if (cachedSelectedDate) {
        state.selectedDate = cachedSelectedDate;
      }
    },
    saveSelectedDate: (state, date) => {
      localStorage.setItem("selectedDate", date);
      state.selectedDate = date;
    },
  },
  actions: {},
  modules: {},
});
