<template>

  <!-- wrapper for desktop screens -->  

    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">

<!-- nav -->

    <div class="title-bar">
      <a @click="$emit('activateScreen', 'directLogin')" class="title-bar-back-button w-inline-block"></a>
      <a @click="signup" class="title-bar-next-button w-inline-block">
        <div class="title-bar-next-button-text">NEXT</div>
      </a>
    </div>

<!-- title & form --> 

    <div v-if="!success">
    <div class="onb-content-container-2">
      <div v-if="showError && errors.all()" class="onb-error-container">
        <div class="onb-error-text">
          <ul>
            <li v-for="error in errors.all()">{{ error }}</li>
          </ul>
        </div>
      </div>
          <div class="onb-top-content-container">
            <h1 class="onb-heading-large">Sign up</h1>
            <p class="onb-paragraph-subheading-2">Already have an account? <a @click="$emit('activateScreen', 'directLogin')">Sign in here</a>.</p>            
          </div>
        </div>
  <div class="onb-child-info-container">
    <div class="form-block-3 w-form">
      <form v-on:submit.prevent="signup" class="form-2">
        <fieldset :disabled="disableForm === true">
          <div class="onb-child-group-2">
              <label class="onb-field-label">First Name</label>
              <input
                v-validate="'required'"
                name="first_name"
                v-model="first_name"
                placeholder="First Name"
                :class="{'invalid': errors.has('first_name') }"
                class="name-text-field w-input"
              >
              <label class="onb-field-label">Last Name</label>
              <input
                v-validate="'required'"
                name="last_name"
                v-model="last_name"
                placeholder="Last Name"
                :class="{'invalid': errors.has('last_name') }"
                class="name-text-field w-input"
              >
              <label class="onb-field-label">Email</label>
              <input
                v-validate="'required|email'"
                name="email"
                v-model="email"
                placeholder="e.g. your-email@example.com"
                :class="{'invalid': errors.has('email') }"
                class="name-text-field w-input"
              >
              <label class="onb-field-label">Password</label>
              <input
                type="password"
                v-validate="'required'"
                name="password"
                v-model="password"
                placeholder="Password"
                :class="{'invalid': errors.has('password') }"
                class="name-text-field w-input"
              >
            </div>
            <div class="avatar-photo" v-if="!!avatar_url">
              <img :src="avatar_url" height="128">
            </div>
            <label for="avatar" class="onb-button-add-group w-inline-block"><img src="@/assets/add.svg" alt="" class="image-7">
              <div 
              class="onb-button-add-group-text" 
              :class="{'invalid': errors.has('avatar') }">
                <span v-if="!avatar_url">Add profile photo</span>
                <span v-else>Replace photo</span>
              </div>
            </label>
              <input
                type="file"
                style="visibility:hidden;"
                v-validate="'required'"
                id="avatar"
                name="avatar"
                v-on:change="upload"
                accept="image/*"
              >
        </fieldset>
      </form>
    </div>
  </div>
  </div>
     <div v-if="!!success" class="onb-content-container-2" >
       <div class="onb-top-content-container">
        <br><br><br>
         <h1 class="onb-heading-large">Registration complete!</h1>
           <p class="onb-paragraph-subheading-2">Sign in to continue.</p>            
       </div>
       <button @click="$emit('activateScreen', 'directLogin')" class="button-text splash-button w-inline-block">Sign in</button>
     </div>
    </div>
    </div>
  </div>
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
      disableForm: false,
      currentUser: {},
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      avatar_url: null,
      showError: false,
      cloudinary: {
        uploadPreset: 'avatar',
        apiKey: '415594396214129',
        cloudName: 'cottageclass2'
      }
    };
  },
  computed: {
    cloudinaryUploadUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/image/upload`;
    },
    formHasErrors: function () {
      return this.errors
    }
  },
  mounted: function () {
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
    upload: function(event) {
      let files = event.target.files;

      let formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);

      this.disableForm = true;

      fetch(this.cloudinaryUploadUrl, { method: 'POST', body: formData })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(response => {
          console.log('cloudinary upload success', response);
          this.disableForm = false;
          this.avatar_url = response.secure_url;
        })
        .catch(error => {
          console.error('cloudinary upload error', error);
          this.disableForm = false;
        });
    },
    signup: function() {
      let component = this;

      this.$validator
        .validateAll()
        .then(function(result) {
          if (result) {
            component.disableForm = true;

            let first_name =
              component.first_name && component.first_name.trim();
            let last_name = component.last_name && component.last_name.trim();
            let email = component.email && component.email.trim();
            let password = component.password && component.password.trim();
            let avatar = component.avatar_url && component.avatar_url.trim();

            component.$auth
              .register({ first_name, last_name, email, password, avatar })
              .then(response => {
                console.log('signup success:', response);
                component.success = true;
                component.disableForm = false;
              })
              .catch(function(error) {
                console.error('signup failure:', error);
                component.disableForm = false;
              });
          } else {
            component.showError = true
          }
        })
        .catch(function(error) {
          console.error('validation error', error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';

.content-wrapper {
  position: 0px;
  padding-top: 0px;
}

.full-height-background {
  min-height: 100vh;
  background-color: #1d8be7;
}

.onb-content-container-2 {
  padding-top: 83px;
}

.splash-button {
  background-color: white;
  width: 100%;
}

.avatar-photo {
  text-align: center;
}

.avatar-photo img {
  height: 96px;
}

.onb-button-add-group-text.invalid {
  border: red;
}

.onb-button-add-group {
  margin-bottom: 16px;
}

p a {
  text-decoration: underline
}

input.invalid {
  border: 1px solid red;
}

</style>
