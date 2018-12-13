<template>
  <div class="onb-body-splash">
    <form v-on:submit.prevent="login">
      <div class="form-grid">
        <input
          v-validate="'required|email'"
          name="email"
          v-model="email"
          placeholder="email"
          :class="{'invalid': errors.has('email') }"
        >
        <input
          v-validate="'required'"
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
          :class="{'invalid': errors.has('password') }"
        >
        <button type="submit">Login</button>
        <span>{{ errors.first('email') }}</span>
        <span>{{ errors.first('password') }}</span>
      </div>
    </form>
    <div>
      Do not have an account?
      <a @click="$emit('activateScreen', 'signup')">Sign Up</a>
    </div>
    <div>
      <a @click="$emit('activateScreen', 'facebook')">Go Back</a>
    </div>
  </div>
</template>

<script>
// import networks from '@/assets/network-info.json';
import * as Token from '@/utils/tokens.js';
import * as api from '@/utils/api.js';

export default {
  name: 'DirectLogin',
  data: function() {
    return {
      // networks: networks,
      currentUser: {},
      email: '',
      password: ''
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
              this.$emit('userAlreadyOnboarded');
            } else if (currentUser.id) {
              this.$emit('userNotYetOnboarded');
            } else {
              return false;
            }
          })
          .catch(function(error) {
            console.log('auth FAILURE or user not onboarded yet');
            console.warn(error);
          });
      } else {
        console.warn('current user does not exist');
      }
    } else {
      console.warn('this.$auth is blank');
    }
  },
  methods: {
    login: function(event) {
      event.preventDefault();
      let component = this;

      this.$validator
        .validateAll()
        .then(function(result) {
          if (result) {
            let email = component.email && component.email.trim();
            let password = component.password && component.password.trim();
            component.$auth
              .login({ email, password })
              .then(res => {
                console.log('auth success:', res);
              })
              .then(res =>
                api.fetchCurrentUser(Token.currentUserId(component.$auth))
              )
              .then(currentUser => {
                if (currentUser.hasAllRequiredFields) {
                  component.$emit('userAlreadyOnboarded');
                } else if (currentUser.id) {
                  component.$emit('userNotYetOnboarded');
                } else {
                  return false;
                }
              })
              .catch(function(err) {
                console.log('auth FAILURE or user not onboarded yet');
                console.error(err);
              });
          }
        })
        .catch(function(error) {
          console.warn('validation error', error);
        });
    }
  }
};
</script>

<style scoped>
input.invalid {
  border: 1px solid red;
}
.form-grid {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
}
.form-grid button {
  border: 1px solid black;
}
.form-grid span {
  color: red;
}
</style>
