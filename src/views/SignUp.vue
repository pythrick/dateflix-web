<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                :rules="dateRules"
                label="Birthday date"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-textarea
            solo
            v-model="bio"
            :rules="biographyRules"
            label="Biography"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree with our terms of use?"
            required
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="createUser"
          >
            Create account
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { createUser } from "../services/users";

export default {
  name: "SignIn",
  components: {},
  data: () => ({
    valid: false,
    firstName: "",
    lastName: "",
    bio: "",
    code: "",
    firstNameRules: [
      (v) => !!v || "First name is required",
      (v) => v.length <= 10 || "First name must be less than 10 characters",
    ],
    lastNameRules: [
      (v) => !!v || "Last name is required",
      (v) => v.length <= 10 || "Last name must be less than 10 characters",
    ],
    biographyRules: [
      (v) => !!v || "Biography is required",
      (v) => v.length <= 300 || "Biography must be less than 300 characters",
    ],
    dateRules: [(v) => !!v || "Birthday date is required"],
    date: null,
    menu: false,
    checkbox: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  mounted() {
    this.code = this.$route.query.code;
  },
  methods: {
    // validate() {
    //   // this.$refs.form.validate()
    //   this.createUser();
    // },
    save(date) {
      this.$refs.menu.save(date);
    },
    async createUser() {
      try {
        const resp = await createUser(
          this.code,
          this.firstName,
          this.lastName,
          this.bio,
          this.date
        );
        localStorage.setItem("token", resp.data.access);
        this.$router.push({ path: "/movies-list" });
      } catch (e) {
        this.$router.push({ path: "/", query: { registration: "failed" } });
      }
    },
  },
};
</script>
