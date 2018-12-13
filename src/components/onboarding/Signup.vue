<template>
  <div class="onb-body-splash">
    <div v-if="!success">
      <form v-on:submit.prevent="signup">
        <div class="form-grid">
          <div>
            <input
              v-validate="'required'"
              name="first_name"
              v-model="first_name"
              placeholder="first name"
              :class="{'invalid': errors.has('first_name') }"
            >
            <span>{{ errors.first('first_name') }}</span>
          </div>
          <div>
            <input
              v-validate="'required'"
              name="last_name"
              v-model="last_name"
              placeholder="last name"
              :class="{'invalid': errors.has('last_name') }"
            >
            <span>{{ errors.first('last_name') }}</span>
          </div>
          <div>
            <input
              v-validate="'required|email'"
              name="email"
              v-model="email"
              placeholder="email"
              :class="{'invalid': errors.has('email') }"
            >
            <span>{{ errors.first('email') }}</span>
          </div>
          <div>
            <input
              type="password"
              v-validate="'required'"
              name="password"
              v-model="password"
              placeholder="password"
              :class="{'invalid': errors.has('password') }"
            >
            <span>{{ errors.first('password') }}</span>
          </div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        <a @click="$emit('activateScreen', 'directLogin')">Go Back</a>
      </div>
    </div>
    <p v-if="!!success">
      Your registration is complete! Click
      <a @click="$emit('activateScreen', 'directLogin')">here</a>
      to sign in.
    </p>
  </div>
</template>

<script>
import * as Token from '@/utils/tokens.js';
import * as api from '@/utils/api.js';

export default {
  name: 'Signup',
  data: function() {
    return {
      success: false,
      currentUser: {},
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signup: function() {
      let component = this;

      this.$validator
        .validateAll()
        .then(function(result) {
          if (result) {
            let first_name =
              component.first_name && component.first_name.trim();
            let last_name = component.last_name && component.last_name.trim();
            let email = component.email && component.email.trim();
            let password = component.password && component.password.trim();

            component.$auth
              .register({ first_name, last_name, email, password })
              .then(response => {
                console.log('signup success:', response);
                component.success = true;
              })
              .catch(function(error) {
                console.error('signup failure:', error);
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
  grid-template-columns: auto;
  grid-row-gap: 10px;
}
.form-grid button {
  border: 1px solid black;
}
.form-grid span {
  display: block;
  color: red;
}
</style>
