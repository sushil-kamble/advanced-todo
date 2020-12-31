<template>
  <v-app-bar class="blue-grey darken-4" dense dark app>
    <v-toolbar-title class="h-font">My Todos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="user" @click="logout" color="error" class="h-font" small
      >Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { auth } from "@/firebase/init.js";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    // Add your computed properties here
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace({ name: "Auth" });
      });
    },
  },
};
</script>
