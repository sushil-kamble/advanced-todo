<template>
  <div>
    <div v-if="!update">
      <v-card tile color="blue-grey darken-3">
        <v-form
          class="d-flex justify-center pa-3"
          @submit.prevent="addTodo"
          autocomplete="off"
        >
          <v-text-field
            v-model="title"
            dark
            solo-inverted
            :error-messages="feedback"
            dense
            :label="placeholder"
          ></v-text-field>
          <v-btn type="submit" color="blue accent-3 h-font" class="ml-4" dark>
            Add
          </v-btn>
        </v-form>
      </v-card>
      <v-card class="px-1 pt-2 pb-1 mt-3" v-if="!update">
        <div
          class="px-3 text-center text-capitalize todo-font blue accent-3 white--text"
        >
          {{ sep[0] }}
        </div>
        <div class="d-flex justify-space-between">
          <v-chip class="ma-2" color="success" small>
            {{ now.format("MMM D, h:mm A") }}
          </v-chip>
          <v-chip class="ma-2" color="primary" v-if="parseDue" small>
            {{ parseDue.format("lll") }}
          </v-chip>
        </div>
      </v-card>
    </div>
    <div v-else>
      <v-card tile color="transparent">
        <v-form @submit.prevent="updateTodo" autocomplete="off">
          <v-text-field
            v-model="title"
            solo-inverted
            :error-messages="feedback"
            dense
            :label="placeholder"
          ></v-text-field>
          <v-btn type="submit" color="blue accent-3 h-font" x-small block>
            Update
          </v-btn>
        </v-form>
      </v-card>
      <v-card tile class="mt-2" color="blue-grey darken-3">
        <div class="d-flex justify-space-between">
          <v-chip class="ma-2" color="success" x-small>
            {{ now.format("h:mm A") }}
          </v-chip>
          <v-chip class="ma-2" color="primary" v-if="parseDue" x-small>
            {{ parseDue.format("lll") }}
          </v-chip>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import moment from "moment";

export default {
  name: "AddTodo",
  props: ["update", "placeholder", "id"],
  data() {
    return {
      title: "",
      feedback: "",
      now: moment(),
    };
  },
  created() {
    setInterval(this.nowDate, 60000);
  },
  computed: {
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
        return moment(tempDue);
      }
      return null;
    },
  },
  methods: {
    nowDate() {
      this.now = moment();
    },
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
    addTodo() {
      if (this.title.length) {
        const currDate = moment().format();
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("todos")
          .add({
            title: this.sep[0],
            status: false,
            timestamp: currDate,
            due: this.parseDue ? this.parseDue.format() : currDate,
          })
          .then(() => {
            this.title = "";
            this.feedback = "";
          });
      } else {
        this.feedback = "Required";
      }
    },
    updateTodo() {
      if (this.title.length) {
        const currDate = moment().format();
        // console.log(`${this.todo[4].value}-${this.todo[1].value}`);
        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("todos")
          .doc(this.id)
          .update({
            title: this.sep[0],
            status: false,
            timestamp: currDate,
            due: this.parseDue ? this.parseDue.format() : currDate,
          })
          .then(() => {
            this.title = "";
            this.feedback = "";
            this.$emit("false-dialog");
          });
      } else {
        this.feedback = "Required";
      }
    },
  },
};
</script>

<style scoped></style>
