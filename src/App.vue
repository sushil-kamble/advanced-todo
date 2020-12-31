<template>
  <v-app>
    <Navbar />
    <v-main>
      <div
        class="todo_content d-flex justify-space-between my-2 px-4"
        v-if="user"
      >
        <h3 class="h-font white--text">Hi, {{ user.displayName }}</h3>
        <div>
          <v-btn
            class="mt-1 h-font mr-2"
            color="blue-grey darken-4"
            x-small
            dark
            to="/"
            >Home
          </v-btn>
          <v-btn
            class="mt-1 h-font mr-2"
            color="blue accent-3"
            x-small
            dark
            to="/info"
            >Info
          </v-btn>
          <v-btn
            class="mt-1 h-font"
            color="light-green accent-3"
            x-small
            to="/about"
            >About
          </v-btn>
        </div>
      </div>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <transition
          appear
          name="custom-classes-transition"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutRight"
          :duration="{ enter: 600, leave: 300 }"
        >
          <!-- If using vue-router -->
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import { mapGetters } from "vuex";
export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    // Add your computed properties here
  },
};
</script>

<style>
.todo_content {
  max-width: 720px;
  margin: auto;
}
</style>
