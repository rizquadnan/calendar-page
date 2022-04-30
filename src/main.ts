import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.commit("initStore");
  },
}).$mount("#app");
