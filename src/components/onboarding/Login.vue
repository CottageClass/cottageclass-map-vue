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
  import Vue from 'vue';
  import VueAxios from 'vue-axios';
  import VueAuthenticate from 'vue-authenticate';
  import axios from 'axios';

  /*
   * Config for VueAuthenticate
   * - stores our auth token
   * - sends it back and forth with every request for us
   * - gives us auth/login/logout methods
   * - see: https://www.npmjs.com/package/vue-authenticate
   */

  let origin = window.location.origin

  Vue.use(VueAxios, axios)
  Vue.use(VueAuthenticate, {
    baseUrl: 'https://cottageclass-app-api.herokuapp.com',
    withCredentials: true,
    tokenName: 'jwt',
    providers: {
      facebook: {
	clientId: '905335782985620',
	redirectUri: `${origin}/oauth-callback`,
	// Add additional scopes (properties) to be retrieved from Facebook here
	// - see link below for properties accessible by default and properties requiring app review:
	// - https://developers.facebook.com/docs/facebook-login/permissions/#reference-default
	// scope: [],
      },
    },
  })


  export default {
    name: 'Login',
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
	  .then(function(res) {
	    console.log("auth SUCCESS")
	    console.log(res)
	    component.$emit('next')
	  })
	  .catch(function(err) {
	    console.log("auth FAILURE")
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
