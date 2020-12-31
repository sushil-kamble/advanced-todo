<template>
  <v-card tile>
    <v-list color="blue-grey darken-3" dense flat>
      <h3 class="ml-3 mb-1 h-font white--text">TODOs</h3>
      <v-list-item-group>
        <transition-group
          tag="div"
          name="custom-classes-transition"
          enter-active-class="animated bounceInDown"
          leave-active-class="animated bounceOutDown"
          ><v-list-item v-for="todo in filteredTodos" :key="todo.id">
            <v-list-item-content>
              <v-progress-linear
                :value="progressTime(todo.timestamp, todo.due)"
                :color="progressTimeClass(todo.timestamp, todo.due)"
                @click="
                  clicked().then((text) => {
                    clickType = text;
                    getInfo(todo.id, todo.title, todo.timestamp, todo.due);
                  })
                "
                height="30"
                dark
                background-color="blue-grey darken-4"
                rounded
              >
                <h5 class="todo-font text-capitalize">
                  {{ todo.title }}
                </h5>
              </v-progress-linear>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="light-green accent-3"
                class="ml-2 h-font"
                @click="doneTodo(todo.id)"
                small
                light
                >Done
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </transition-group>
      </v-list-item-group>
    </v-list>

    <!--    Snack bar-->
    <v-snackbar v-model="snackbar" app>
      <h5 class="todo-font text-capitalize" v-if="computedTodo">
        <span>{{ title }}</span> -
        <span>{{ computedTodo[2].value }}</span>
        <span class="blue--text ml-2">({{ computedTodo[3].value }})</span>
      </h5>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!--    Snack Bar-->
    <!--    Dialog Box-->
    <v-dialog
      v-model="dialog"
      max-width="500"
      overlay-color="blue-grey darken-2"
      overlay-opacity="0.8"
    >
      <v-card color="grey darken-4" dark>
        <v-card-title class="h-font blue--text text-capitalize">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <v-alert outlined color="primary" text>
            <v-card tile color="transparent">
              <v-list dense disabled v-if="computedTodo" color="transparent">
                <v-list-item-group>
                  <v-list-item
                    v-for="(content, id) in computedTodo"
                    :key="id"
                    :class="`my-1 todo-font ${content.color}`"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ content.name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action-text class="white--text">
                      {{ content.value }}
                    </v-list-item-action-text>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-alert>

          <v-alert outlined color="primary" text>
            <AddTodo
              :update="true"
              placeholder="Update Todo"
              :id="id"
              @false-dialog="dialog = false"
            />
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue accent-3" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    Dialog Box-->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "@/firebase/init";
import moment from "moment";
import AddTodo from "@/components/AddTodo";

export default {
  name: "DisplayTodo",
  components: { AddTodo },
  props: ["user"],
  data() {
    return {
      snackbar: false,
      dialog: false,

      title: "",
      start: null,
      due: null,
      id: "",

      click: undefined,
      clickType: "",
    };
  },
  computed: {
    ...mapGetters({
      todos: "todos",
    }),
    computedTodo() {
      if (this.start && this.due) {
        const percent = this.progressTime(this.start, this.due);
        return [
          {
            name: "% Time",
            value: percent <= 100 ? percent : "Completed",
            color:
              percent <= 100 ? "light-blue darken-3" : "deep-purple darken-4",
          },
          {
            name: "Started",
            value: this.formatDate(this.start),
            color: "blue-grey darken-3",
          },
          {
            name: "Due",
            value: this.formatDate(this.due),
            color: "blue-grey darken-3",
          },
          {
            name: percent <= 100 ? "Remaining Time" : "Completed",
            value: this.remTime,
            color:
              percent <= 100 ? "light-blue darken-3" : "deep-purple darken-4",
          },
        ];
      }
      return null;
    },
    filteredTodos() {
      return this.todos
        ? this.todos.filter((todo) => !todo.status)
        : this.todos;
    },
    remTime() {
      if (this.start && this.due) {
        return moment(this.due).fromNow();
      }
      return moment();
    },
  },
  methods: {
    clicked() {
      return new Promise((resolve) => {
        if (this.click) {
          clearTimeout(this.click);
          resolve("DoubleClick");
        }
        this.click = setTimeout(() => {
          this.click = undefined;
          resolve("SingleClick");
        }, 300);
      });
    },
    progressTime(start, due) {
      const percentage_complete =
        ((moment() - moment(start)) / (moment(due) - moment(start))) * 100;
      return Math.round(percentage_complete * 100) / 100;
    },
    progressTimeClass(start, due) {
      const per = this.progressTime(start, due);
      if (per < 10) {
        return "blue darken-1";
      } else if (per >= 10 && per <= 70) {
        return "blue accent-3";
      } else if (per >= 70 && per <= 90) {
        return "blue darken-4";
      } else if (per >= 90 && per <= 100) {
        return "indigo darken-4";
      } else {
        return "deep-purple darken-4";
      }
    },
    getInfo(id, title, start, due) {
      this.id = id;
      this.title = title;
      this.start = start;
      this.due = due;
      if (this.clickType === "SingleClick") {
        this.snackbar = true;
        this.dialog = false;
      } else if (this.clickType === "DoubleClick") {
        this.dialog = true;
        this.snackbar = false;
      }
    },
    formatDate(date) {
      return moment(date).format("lll");
    },
    doneTodo(id) {
      db.collection("users")
        .doc(this.user.id)
        .collection("todos")
        .doc(id)
        .update({
          status: true,
          completed: moment().format(),
        });
    },
  },
};
</script>

<style scoped></style>
