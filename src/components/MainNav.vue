<template>
  <div class="main-nav">
    <div class="container w-container">
      <div class="logo-wrapper"><router-link :to="{ name: 'NewUser' }" class="w-inline-block"><img src="@/assets/kc-logo-landscape.svg" alt="" class="logo"></router-link>
      </div>
      <div class="actions-wrapper">
      	<AvatarImage
      	v-if="currentUser" 
      	:person="currentUser" 
      	className="image" />
      	<a @click="toggleMenu" class="button w-button">Menu</a></div>
      <div 
      v-if="showMenu" 
      v-on-clickaway="clickedAway"
      class="nav-links-expanded">
        <ul class="unordered-list-2 w-list-unstyled">
          <li class="nav-link">
            <router-link to="/home" class="link-block w-inline-block">
              <div class="text-block">Activities</div>
            </router-link>
          </li>
          <li class="nav-link" v-if="isAuthenticated">
            <router-link to="/request" class="link-block w-inline-block">
              <div class="text-block">Request Care</div>
            </router-link>
          </li>
          <li class="nav-link" v-if="isAuthenticated">
            <router-link to="/offer" class="link-block w-inline-block">
              <div class="text-block">Offer Care</div>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link to="/faq" class="link-block w-inline-block">
              <div class="text-block">FAQ</div>
            </router-link>
          </li>
          <li class="nav-link" v-if="isAuthenticated">
            <a @click="logout" class="link-block w-inline-block">
              <div class="text-block">Logout</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import AvatarImage from '@/components/AvatarImage.vue'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'

export default {
	name: 'MainNav',
	components: { AvatarImage },
  mixins: [ clickaway ],	
  props: ['user'],
  data () {
  	return {
  		showMenu: false,
      menuButtonText: 'Menu',
      currentUser: null,
      currentUserId: null,
      isAuthenticated: null
  	}
  },
  mounted: function () {
    if (this.$auth && this.$auth.isAuthenticated()) {
      this.isAuthenticated = true
      this.currentUserId = Token.currentUserId(this.$auth)
      this.fetchCurrentUser()      
    } 
  },
  methods: {
  	toggleMenu: function () {
  		this.showMenu = !this.showMenu
  	},
  	clickedAway: function () {
  		this.showMenu = false
  	},
    logout: function () {
      this.$auth.logout()
      this.$router.push('/')
    },
    fetchCurrentUser: function () {
      api.fetchCurrentUserNew(Token.currentUserId(this.$auth)).then(currentUser => {
        this.currentUser = currentUser
        })
    }
  }
};
</script>

<style scoped>

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

a {
  color: #000;
  text-decoration: none;
}

.text-block {
  width: 100%;
  color: #000;
  text-decoration: none;
}


.main-nav {
  position: relative;
  background-color: #fff;
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;  
}

.container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 24px 32px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.actions-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.button {
  min-height: 40px;
  margin-left: 16px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .04)), to(rgba(0, 0, 0, .04)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .04), rgba(0, 0, 0, .04));
}

.button:active {
  border-color: #1f88e9;
  background-color: #1f88e9;
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
  color: #fff;
}

.image {
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  min-width: 40px;
  border-radius: 50%;
}

.logo {
  max-width: 130px;
}

.body {
  background-color: #f5f5f5;
}

.nav-link {
  border-bottom: 1px solid rgba(0, 0, 0, .04);
  border-top-width: 1px;
}

.nav-links-expanded {
  position: absolute;
  top: 88px;
  right: 32px;
  width: 320px;
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
  box-shadow: 0 17px 30px 0 rgba(0, 0, 0, .04);
  z-index: 99999999;
}

.unordered-list-2 {
  margin-bottom: 8px;
  padding-left: 0px;
}

.link-block {
  width: 100%;
  padding: 14px 16px 14px 24px;
}

.link-block:hover {
  background-color: rgba(0, 0, 0, .04);
}

.link-block:active {
  background-color: #1f88e9;
  color: #fff;
}

.temporary-spacer-between-navs {
  height: 30px;
}

@media (max-width: 767px) {
  .container {
    padding: 16px 20px;
  }
  .nav-links-expanded {
    top: 72px;
    right: 0px;
    width: 100%;
  }
  .link-block {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

@media (max-width: 479px) {
  .container {
    padding-top: 11px;
    padding-bottom: 11px;
  }
  .button {
    min-height: auto;
    margin-left: 10px;
    padding: 6px 10px;
  }
  .image {
    max-height: 34px;
    max-width: 34px;
    min-height: 34px;
    min-width: 34px;
  }
  .logo {
    max-width: 120px;
  }
  .nav-links-expanded {
    top: 56px;
  }
}


</style>