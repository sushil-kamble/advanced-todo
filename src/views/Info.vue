<template>
  <div class="todo_content">
    <div
      class="px-2 d-flex justify-space-between align-center blue-grey darken-4 white--text"
    >
      <h1 class="h-font">Info</h1>
      <v-btn-toggle class="transparent" v-if="!user">
        <v-btn small class="primary" to="/auth"> Login </v-btn>
        <v-btn small class="ml-2" color="secondary" to="/about"> About </v-btn>
      </v-btn-toggle>
    </div>
    <v-card class="px-2" color="pa-2 blue-grey darken-3" dark>
      <div class="todo-font">
        <h3 class="h-font text-decoration-underline">How to Add Todo?</h3>
        <div>
          <span class="orange px-1">This is Awesome</span
          ><span class="blue px-1">@</span><span class="green px-1">4h</span>
        </div>
        <div>
          <span class="orange px-1">Message</span
          ><span class="blue px-1">Seprator [@-]</span
          ><span class="green px-1">Due</span>
        </div>
        <span>
          This means that due date/ deadline of above todo will be 4 hours from
          now.
        </span>
        <div class="">
          <span class="blue-grey px-1">s : seconds</span
          ><span class="blue-grey darken-2 px-1">m : minutes</span
          ><span class="blue-grey px-1">h : hours</span><br /><span
            class="blue-grey px-1"
            >d : days</span
          ><span class="blue-grey darken-2 px-1">w : weeks</span
          ><span class="blue-grey px-1">mm : months</span>
        </div>
        <span>You can also chain DUE. eg. 4d5h means 4 days and 5 hours.</span>
        <v-card light class="mt-1 pa-2">
          <v-text-field
            v-model="title"
            class="mt-2"
            solo-inverted
            dense
            label="Starting Typing..."
            autocomplete="off"
          ></v-text-field>
          <div class="px-2">
            <span>Todo Message: {{ sep[0] }}</span
            ><br />
            <span>
              Due:
              <span v-if="parseDue">{{ parseDue }}</span>
              <span v-else class="blue-grey px-3 ml-2 white--text"
                >Use @ or -
              </span>
            </span>
          </div>
        </v-card>
      </div>
      <div class="mt-4">
        <h3 class="h-font text-decoration-underline">Walkthrough</h3>
        <ol class="todo-font">
          <li>You have to register if you are a new user else login.</li>
          <li><span class="blue--text">Add</span> a todo.</li>
          <li>
            Click <span class="green--text text--accent-3">Done</span> when that
            todo is completed.
          </li>
          <li>
            Double tap/click on the todo to
            <span class="blue--text">Update</span> the todo. Single tap to see
            the deadline.
          </li>
          <li>
            Completed todo will appearing
            <span class="light-green--text text--accent-3">Completed todo</span>
            Section. You can undo step 3 by clicking on
            <span class="light-green--text text--accent-2">RET</span> and also
            <span class="blue--text">Delete</span> completed todo by just
            clicking <span class="red--text text--accent-3">DEL</span> .
          </li>
        </ol>
      </div>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Info",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    sep() {
      return this.title.split(/[@-]+/);
    },
    parseDue() {
      if (this.sep.length > 1) {
        const due = this.sep[1].split(/([0-9]+)/);
        let i = 1,
          len = due.length;
        let tempDue = moment().format();
        while (i < len) {
          const long = this.shortLong(due[i + 1]);
          if (long !== "un_justified") {
            tempDue = moment(tempDue).add(parseInt(due[i]), long);
          }
          i += 2;
        }
        return moment(tempDue).format("lll");
      }
      return null;
    },
  },
  methods: {
    shortLong(short) {
      if (short === "h") {
        return "hours";
      } else if (short === "s") {
        return "seconds";
      } else if (short === "m") {
        return "minutes";
      } else if (short === "d") {
        return "days";
      } else if (short === "w") {
        return "weeks";
      } else if (short === "mm") {
        return "months";
      } else {
        return "un_justified";
      }
    },
  },
};
</script>
