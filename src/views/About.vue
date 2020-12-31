<template>
  <div class="todo_content">
    <div
      class="px-2 d-flex justify-space-between align-center blue-grey darken-4 white--text"
    >
      <h1 class="h-font ml-3">About</h1>
      <v-btn-toggle class="transparent" v-if="!user">
        <v-btn small class="primary" to="/auth"> Login </v-btn>
        <v-btn small class="ml-2" color="secondary" to="/info"> Info </v-btn>
      </v-btn-toggle>
    </div>
    <v-card class="px-2" color="blue-grey darken-3" dark>
      <h2 class="pt-2 pl-3 todo-font">Hi, I am Sushil Kamble</h2>
      <hr />
      <h3 class="ml-3 mt-3 text-decoration-underline h-font">Introduction</h3>

      <div class="px-3 todo-font">This is a Advance Todo App.</div>
      <h3 class="ml-3 mt-3 text-decoration-underline h-font">Features</h3>
      <div class="ml-3 todo-font">
        <ul>
          <li>Authentication</li>
          <li>CRUD Oprations on todo</li>
          <li>Realtime todo sync</li>
          <li>Set a deadline for a todo</li>
          <li>Very responsive UI</li>
        </ul>
      </div>

      <h3 class="ml-3 mt-3 text-decoration-underline h-font">
        Technology Stack
      </h3>
      <div class="ml-3 todo-font">
        <ul>
          <li>
            <a
              target="_blank"
              href="https://vuejs.org/v2/guide/"
              class="white--text"
              >vue.js@2.6.11</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://router.vuejs.org/"
              class="white--text"
            >
              vue-routers@3.2.0
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://vuex.vuejs.org/"
              class="white--text"
              >vuex@3.4.0
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://vuetifyjs.com/en/"
              class="white--text"
              >vuetify@2.2.11
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://firebase.google.com/docs/auth"
              class="white--text"
              >Firebase Authentication
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://firebase.google.com/docs/firestore"
              class="white--text"
              >Firebase Cloud Firestore
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://vuefire.vuejs.org/vuexfire/"
              class="white--text"
              >vuexfire@3.2.4
            </a>
          </li>
          <li>
            <a target="_blank" href="https://momentjs.com/" class="white--text">
              Moment@2.29.1
            </a>
          </li>
        </ul>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "About",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>