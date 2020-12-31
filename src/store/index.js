import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vue from "vue";
import Vuex from "vuex";
import { db, auth } from "@/firebase/init";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    todos: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    todos(state) {
      return state.todos;
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    ...vuexfireMutations
  },
  actions: {
    fetchUser(context, user) {
      if (user) {
        context.commit("SET_USER", {
          id: user.uid,
          displayName: user.displayName,
          email: user.email
        });
        return context.dispatch("bindTodosRef");
      } else {
        context.commit("SET_USER", null);
      }
    },
    bindTodosRef: firestoreAction(context => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
      return context.bindFirestoreRef(
        "todos",
        db
          .collection("users")
          .doc(auth.currentUser.uid)
          .collection("todos")
          .orderBy("timestamp", "desc")
      );
    })
  }
});
