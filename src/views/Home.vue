<template>
  <div class="home">
    <div class="todo_content" v-if="user">
      <AddTodo class="my-2" :update="false" placeholder="Add Todo" />
      <DisplayTodo :user="user" />
      <CompletedTodo :user="user" class="my-2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddTodo from "@/components/AddTodo";
import DisplayTodo from "@/components/DisplayTodo";
import CompletedTodo from "@/components/CompletedTodo";
export default {
  name: "Home",
  components: {
    CompletedTodo,
    DisplayTodo,
    AddTodo,
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
    // Add your computed properties here
  },
};
</script>

<style scoped>
</style>
