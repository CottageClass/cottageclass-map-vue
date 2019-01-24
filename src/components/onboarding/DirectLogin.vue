<template>

  <!-- wrapper for desktop screens -->  

    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">

  <!-- nav -->           
    <div class="title-bar">
      <a @click="$emit('activateScreen', 'facebook')" class="button-back w-inline-block"></a>
    </div>

    <div class="content-container">

        <div v-if="showError && (errors.first('email') || errors.first('password')) || errorMessage" class="onb-error-container">
      <div class="onb-error-text">{{ errors.first('email') }}</div>
      <div class="onb-error-text">{{ errors.first('password') }}</div>
      <div class="onb-error-text">{{ errorMessage }}</div>
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
    <p><a @click="$emit('activateScreen', 'facebook')">Sign in here</a> if you sign in using Facebook. Forgot your password? <br><a href="mailto:contact@cottageclass.com">Email us</a></p>
  </div>
</div>
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
      showError: false,
      errorMessage: null
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
              }).catch(err => {
                component.showError = true
                component.errorMessage = 'There was a problem signing you in. If you forgot your password, email  contact@cottageclass.com for help.'
                console.log('auth failure', err)
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

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';

.body {
  font-family: soleil
}

.content-wrapper {
  position: 0px;
  padding-top: 0px;
}

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

.content-container {
  padding-top: 83px;
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

.button-back {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 7px;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: transparent;
  background-image: url('../../assets/arrow-back-white.svg');
  background-position: 50% 50%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  color: #1f88e9;
}

.button-back:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-image: url('../../assets/arrow-back-white.svg');
  background-size: 24px;
}
</style>
