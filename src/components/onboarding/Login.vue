<template>
  <div id="body onb-body-splash">
    <div class="div-block-6"><img src="@/assets/cc-splash-logo.svg" width="150" alt=""></div>
    <div class="onb-splash-title-container">
      <h1 class="onb-heading-large-black">Why parent alone?</h1>
      <p class="onb-paragraph-subheading-2-black">Sign in to build the free, flexible, childcare of your dreams, by connecting with friends and parents in your community.</p>
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

<style>
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
