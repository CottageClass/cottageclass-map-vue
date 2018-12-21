<template>
<div>
    <div class="onb-title-bar">
      <a @click="$emit('activateScreen', 'facebook')" class="onb-title-bar-back-button w-inline-block"></a>
    </div>
  <div class="onb-content-container _100vh">
        <div v-if="showError && (errors.first('email') || errors.first('password'))" class="onb-error-container">
      <div class="onb-error-text">{{ errors.first('email') }}</div>
      <div class="onb-error-text">{{ errors.first('password') }}</div>
    </div>
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Sign in</h1>
      <p>Don't have an account? <a @click="$emit('activateScreen', 'signup')">Sign up here</a>.</p>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" v-on:submit.prevent="login">
        <input
          v-validate="'required|email'"
          name="email"
          v-model="email"
          placeholder="Email"
          class="location-text-field w-input"
          :class="{'invalid': errors.has('email') }"
        >
        <input
          v-validate="'required'"
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
          :class="{'invalid': errors.has('password') }"
          class="location-text-field w-input"
        >
          <button type="submit" class="button-text splash-button w-inline-block">Sign in</button>
      </form>
    </div>
    <p><a @click="$emit('activateScreen', 'facebook')">Sign in here</a> if you sign in using Facebook. Forgot your password? <br><a href="mailto:info@cottageclass.com">Email us</a></p>
  </div>

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
      password: '',
      showError: false
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
    // override for better error messages on this screen and on signup screen.
    // note: changes here affect all vee-validate error messages until page reload.
    const dict = {
      custom: {
        email: {
          required: 'Please enter your email address.',
          email: 'Please enter a valid email address.'
        },
        first_name: {
          required: 'Please enter your first name.'
        },
        last_name: {
          required: 'Please enter your last name.'
        },
        password: {
          required: 'Please choose a password.'
        },
        avatar: {
          required: 'You must add a profile photo, below.'
        }
      }
    };
    // Override and merge the dictionaries
    this.$validator.localize('en', dict);
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
          } else {
            component.showError = true
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

p {
  text-align: center;
  color: white;
}
p a {
  text-decoration: underline;
}

button {
  background: none;
}

.splash-button {
  background-color: white;
  width: 100%;
}
.onb-content-container {
  padding-top: 96px;
}

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
