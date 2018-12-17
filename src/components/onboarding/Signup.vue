<template>
  <div class="onb-body-splash">
    <div v-if="!success">
      <form v-on:submit.prevent="signup">
        <fieldset :disabled="disableForm === true">
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
            <div>
              <input
                type="file"
                v-validate="'required'"
                name="avatar"
                :class="{'invalid': errors.has('avatar') }"
                v-on:change="upload"
                accept="image/*"
              >
              <span>{{ errors.first('avatar') }}</span>
            </div>
            <div v-if="!!avatar_url">
              <img :src="avatar_url" height="128">
            </div>
            <button type="submit">Sign Up</button>
          </div>
        </fieldset>
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
      disableForm: false,
      currentUser: {},
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      avatar_url: null,
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
    }
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
          }
        })
        .catch(function(error) {
          console.error('validation error', error);
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
