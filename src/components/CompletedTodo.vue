<template>
  <v-expansion-panels>
    <v-expansion-panel class="light-green accent-3">
      <v-expansion-panel-header class="h-font">
        Completed Todos
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-subheader v-if="filteredTodos.length === 0"
          >No Todos Are Completed</v-subheader
        >
        <v-list color="blue-grey darken-4" dark v-else dense flat>
          <v-list-item-group>
            <v-list-item v-for="todo in filteredTodos" :key="todo.id">
              <v-list-item-content>
                <v-list-item-title>{{ todo.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn-toggle class="transparent" dense
                  ><v-btn
                    class="h-font"
                    color="green darken-3"
                    @click="retriveTodo(todo.id)"
                    dark
                    x-small
                    >Ret
                  </v-btn>
                  <v-btn
                    class="h-font ml-4"
                    color="red accent-3"
                    @click="deleteTodo(todo.id)"
                    dark
                    x-small
                    >Del
                  </v-btn>
                </v-btn-toggle>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebase/init";

export default {
  name: "CompletedTodo",
  props: ["user"],
  computed: {
    ...mapGetters({
      todos: "todos",
    }),
    filteredTodos() {
      return this.todos ? this.todos.filter((todo) => todo.status) : 0;
    },
  },
  methods: {
    deleteTodo(id) {
      db.collection("users")
        .doc(this.user.id)
        .collection("todos")
        .doc(id)
        .delete();
    },
    retriveTodo(id) {
      db.collection("users")
        .doc(this.user.id)
        .collection("todos")
        .doc(id)
        .update({
          status: false,
          completed: null,
        });
    },
  },
};
</script>

<style scoped></style>
