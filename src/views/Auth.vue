<template>
  <div>
    <transition
      appear
      name="custom-classes-transition"
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutRight"
      :duration="{ enter: 600, leave: 400 }"
    >
      <div v-if="toggle" key="login">
        <Login @registerView="toggle = !toggle" />
      </div>

      <div v-if="!toggle" key="register">
        <Register @loginView="toggle = !toggle" />
      </div>
    </transition>
  </div>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { auth } from "@/firebase/init.js";

export default {
  name: "Auth",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      toggle: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (auth.currentUser) {
      next({ name: "Home" });
    } else {
      next();
    }
  },
};
</script>

<style scoped></style>
