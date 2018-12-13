<template>
  <div class="onb-body-splash">
    <p v-if="!success">
      <input v-model="first_name" placeholder="first name">
      <input v-model="last_name" placeholder="last name">
      <input v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <a @click="signup()">Sign Up</a>
      <a @click="$emit('activateScreen', 'directLogin')">Go Back</a>
    </p>
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
      let first_name = component.first_name && component.first_name.trim();
      let last_name = component.last_name && component.last_name.trim();
      let email = component.email && component.email.trim();
      let password = component.password && component.password.trim();

      if (first_name && last_name && email && password) {
        component.$auth
          .register({ first_name, last_name, email, password })
          .then(response => {
            console.log('signup success:', response);
            component.success = true;
          })
          .catch(function(error) {
            console.error('signup failure:', error);
          });
      } else {
        console.log('first_name, last_name, email or password missing');
      }
    }
  }
};
</script>
