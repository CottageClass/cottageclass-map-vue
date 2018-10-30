<template>
<div class="body onb-body-splash">
  <div class="onb-login-logo-container-v4"><img src="@/assets/cc-logo-horiz-blue.svg" width="170" height="32" alt=""></div>
  <div class="onb-login-top-image-container"><img src="images/login-photo-2.jpg" width="640" srcset="@/assets/login-photo-2.jpg 500w, @/assets/login-photo-2.jpg 800w, @/assets/login-photo-2.jpg 1280w" sizes="(max-width: 767px) 100vw, 640px" alt="" class="image-8"></div>
  <div class="onb-login-text-container">
    <h1 class="onb-heading-large-black">Why Parent Alone?</h1>
    <p class="onb-paragraph-subheading-2-black-50">Sign in to build the childcare network of your dreams, by connecting with friends and parents in your community</p>
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
        currentUserId: Token.currentUserId(this.$auth),
        currentUser: {}
      }
    },
    mounted: function () {
      api.fetchUsersInNetwork(this.network.stub).then(res => {
      this.currentUser = res.find(person => person.id == this.currentUserId)
    })
  },
  computed: {
    network: function () {
    let networkId = Token.currentUserNetworkCode(this.$auth)
    return this.networks.find(network => network.stub == networkId)
    },
    isUserAlreadyOnboarded: function () {
      if (this.currentUser.phone && this.currentUser.firstName && this.currentUser.lastInitial && this.currentUser.location.lat && this.currentUser.location.lng && this.currentUser.facebookId) {
        return true
      } else {
        return false
      }
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
	    console.log(res)
      if (this.isUserAlreadyOnboarded) {
      this.$emit('userAlreadyOnboarded')
	  } else {
      this.$emit('next')
    }
  }).catch(function(err) {
	    console.log("auth FAILURE")
	    console.log(err)
	  })
}
}
};

</script>

<style scoped>

.onb-body-splash {
  overflow: visible;
  background-color: #fff;
}

.body {
  height: 100vh;
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
  margin-top: 16px;
  margin-bottom: 16px;
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
