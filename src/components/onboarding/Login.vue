<template>
<div class="onb-body-splash">
  <div class="onb-login-logo-container-v4"><img src="@/assets/cc-logo-horiz-blue.svg" width="127" height="24" alt=""></div>
  <div class="onb-login-top-image-container"><img src="images/login-photo-2.jpg" width="640" srcset="@/assets/login-photo-2.jpg 500w, @/assets/login-photo-2.jpg 800w, @/assets/login-photo-2.jpg 1280w" sizes="(max-width: 767px) 100vw, 640px" alt="" class="image-8"></div>
  <div class="onb-login-text-container">
    <h1 class="onb-heading-large-black">Share childcare with friends and neighbors (testing staging!)</h1>
    <p class="onb-paragraph-subheading-2-black-50">Sign in to find trusted childcare near you, save money by sharing care, and make money by offering care.</p>
  </div>
      <div class="onb-fb-button-container">
      <a @click="authenticate('facebook')" class="onb-button-continue-with-facebook w-inline-block">
  <img src="@/assets/facebook-button-icon.svg" width="24" height="24" alt=""><div class="onb-button-facebook-text">Continue with Facebook</div>
      </a>
    </div>
</div>
</template>

<script>

import networks from '@/assets/network-info.json'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'

export default {
    name: 'Login',
    data () {
      return {
        networks: networks,
        currentUser: {}
      }
    },
    mounted: function () {
      api.fetchCurrentUser(Token.currentUserId(this.$auth)).then(currentUser => {
    if (currentUser.hasAllRequiredFields) {
      this.$emit('userAlreadyOnboarded')
    } else if (currentUser.id) {
      this.$emit('userNotYetOnboarded')
    } else {
      return false
    }});
    },
    methods: {
      authenticate: function(provider) {
	/*
	 *  Logs in the user (Facebook)
	 * - follows OAuth flow using VueAuth to get OAuth code
	 * - sends code to backend to exchange for access_token
	 * - backend fetches access_token, stores it in DB, and sends back JWT for user
	 * - VueAuthenticate stores JWT for future API access authorization
	 */

	/* TODO: Refactor front and backend to authenticate via the following:
	 * - use FB library to obtain access token and store in cookies
	 * - send FB access_token to backend
	 * - backend decodes token using Koala, finds user by fbId or email, and sends back JWT for future API access
	 * - VueAuthenticate or other JWT auth library stores JWT token in localStorage or otherwise for us
	 */

	// store value of this to access this.$emit during callback
	let component = this
	this.$auth.authenticate(provider)
	  .then(res => {
	    console.log("auth SUCCESS")
  }).then(res => api.fetchCurrentUser(Token.currentUserId(component.$auth))).then(currentUser => {
    if (currentUser.hasAllRequiredFields) {
      this.$emit('userAlreadyOnboarded')
    } else if (currentUser.id) {
      this.$emit('userNotYetOnboarded')
    } else {
      return false
    }
  }).catch(function(err) {
	    console.log("auth FAILURE or user not onboarded yet")
	    console.log(err) 
	  })
}
}
};

</script>

<style scoped>

.onb-login-top-image-container {
  text-align: center;
}

.onb-body-splash {
  overflow: visible;
  background-color: #fff;
  padding-top: 12px;
  height: 100vh;
}

.body {
  height: 100vh;
}

.image-8 {
  margin-bottom: 0;
} 

.onb-paragraph-subheading-2-black-50 {
  margin-bottom: 8px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  line-height: 21px;
  text-align: center;
}

.onb-login-logo-container-v4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 12px;
  padding-right: 32px;
  padding-left: 32px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.onb-heading-large-black {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}

.onb-login-text-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px 32px 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
}

  .onb-button-continue-with-facebook {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 16px 24px 16px 16px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 4px;
    background-color: #3b5998;
    color: #fff;
  }


  .onb-button-continue-with-facebook:active {
    background-image: -webkit-linear-gradient(270deg, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15));
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15));
  }

  .onb-button-facebook-text {
    margin-left: 12px;
    font-size: 14px;
    text-align: left;
    letter-spacing: 0.4px;
  }

  .onb-fb-button-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    cursor: pointer;
    padding-right: 32px;
    padding-left: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  @media (max-width: 479px) {

    .onb-button-continue-with-facebook {
      width: 100%;
      padding-bottom: 17px;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    .onb-button-continue-with-facebook:active {
      background-color: #3b5998;
    }
    .onb-button-facebook-text {
      font-weight: 400;
    }
  }

</style>
