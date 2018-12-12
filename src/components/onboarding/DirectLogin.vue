<template>
  <div class="onb-body-splash">
    <input v-model="email" placeholder="email">
    <input type="password" v-model="password" placeholder="password">

    <a @click="login()">Login</a>
  </div>
</template>

<script>
// nospam.sd@gmail.com
import networks from "@/assets/network-info.json";
import * as Token from "@/utils/tokens.js";
import * as api from "@/utils/api.js";

export default {
  name: "DirectLogin",
  data: function() {
    return {
      networks: networks,
      currentUser: {},
      email: "",
      password: ""
    };
  },
  mounted: function() {
    if (!!this.$auth) {
      let current_user_identifier = Token.currentUserId(this.$auth);
      if (!!current_user_identifier) {
        api
          .fetchCurrentUser(current_user_identifier)
          .then(currentUser => {
            if (currentUser.hasAllRequiredFields) {
              this.$emit("userAlreadyOnboarded");
            } else if (currentUser.id) {
              this.$emit("userNotYetOnboarded");
            } else {
              return false;
            }
          })
          .catch(function(error) {
            console.log("auth FAILURE or user not onboarded yet");
            console.warn(error);
          });
      } else {
        console.warn("current user does not exist");
      }
    } else {
      console.warn("this.$auth is blank");
    }
  },
  methods: {
    login: function() {
      let component = this;
      let email = this.email && this.email.trim();
      let password = this.password && this.password.trim();
      if (email && password) {
        this.$auth
          .login({ email, password })
          .then(res => {
            console.log("auth success:", res);
          })
          .then(res =>
            api.fetchCurrentUser(Token.currentUserId(component.$auth))
          )
          .then(currentUser => {
            if (currentUser.hasAllRequiredFields) {
              this.$emit("userAlreadyOnboarded");
            } else if (currentUser.id) {
              this.$emit("userNotYetOnboarded");
            } else {
              return false;
            }
          })
          .catch(function(err) {
            console.log("auth FAILURE or user not onboarded yet");
            console.error(err);
          });
      } else {
        console.log("email or password missing");
      }
    },

    register: function() {
      this.$auth.register({ name, email, password }).then(() => {
        // Execute application logic after successful registration
      });
    }
  }
};
</script>
