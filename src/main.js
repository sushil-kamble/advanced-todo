import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "@/firebase/init.js";
import "./registerServiceWorker";

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
    // SET OR RESET USER
    store.dispatch("fetchUser", user);
    // SET IF ONLINE : RESET IF OFFLINE
  }
});
