<template>
<div class="body-homepage">
  <div data-collapse="medium" data-animation="default" data-duration="400" class="nav-section w-nav">
    <div class="nav-container w-container"><a href="#" class="brand w-clearfix w-nav-brand"><img src="@/assets/cottageclass-logo.svg" alt="" class="image-2"></a>
      <div class="tag-container-desktop w-hidden-medium w-hidden-small w-hidden-tiny">
        <div class="nav-tag">free kids&#x27; activities</div>
      </div>
      <div class="nav-flex-space"></div>
      <nav role="navigation" class="nav-menu w-nav-menu">
        <div class="nav-links w-container">
          <!-- Additional nav links go here
          <div class="div-block-32"><a href="#" class="nav-link w-nav-link">Sign In</a><a href="#" class="nav-link w-nav-link">Sign up</a></div>
        -->
        </div>
      </nav>
      <div class="chat-action-container"><a href="#" class="button-nav w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny w-button">Chat</a></div>
      <div class="menu-button w-nav-button"><a href="#signup" class="button-nav menu w-button">SIGN IN</a></div>
    </div>
    <div class="tag-container-mobile w-hidden-main w-hidden-medium w-container">
      <div class="nav-tag w-hidden-main w-hidden-medium w-hidden-small w-hidden-tiny">free kids&rsquo; activities</div>
    </div>
  </div>
  <div class="hero-section">
    <div class="hero-container w-container">
      <div class="hero-content">
        <h1 class="h1-display">The best kids&rsquo; activities in Brooklyn are now <span class="highlight">free</span></h1>
        <div class="hero-subtitle">Host kids once a month at your home to get free, unlimited access to Brooklyn&rsquo;s best sitters: other experienced parents like you.</div>
        <div class="how-wrapper">
          <ul class="unordered-list">
            <li class="list-item"><img src="@/assets/give-care.svg" alt="" class="image-262">
              <div class="hero-list-item-heading">Give Care.</div>
              <div class="hero-list-item-subtitle">Host an activity once a month at your home for kids age 3 to 11.</div>
            </li>
            <li class="list-item"><img src="@/assets/get-care.svg" alt="" class="image-262">
              <div class="hero-list-item-heading">Get Care.</div>
              <div class="hero-list-item-subtitle">For each child you host (how many is up to you) you get 1 point to spend on <a href="#events" class="links">activities like these</a>.</div>
            </li>
            <li class="list-item"><img src="@/assets/socially.svg" alt="" class="image-262">
              <div class="hero-list-item-heading">Socially.</div>
              <div class="hero-list-item-subtitle">Every activity is a playdate led by a local parent, so you can make new friends too!</div>
            </li>
            <!-- So we can direct link to the sign in button--> 
            <span id="signup"></span>
          </ul>
        </div>

        <div class="signup-wrapper"><a @click="authenticate('facebook')" class="fb-button w-inline-block" v-if="!!facebookLogin"><img src="@/assets/facebook-button-icon.svg" width="24" height="24" alt=""><div class="fb-button-text">Continue with Facebook</div></a>
          <div class="use-password-text" v-if="!!directLogin">Or <a href="#" class="links" @click="$emit('activateScreen', 'directLogin')">use a password instead</a></div>
          <div class="terms-text">By signing in you agree to our <a href="https://cottageclass.com/terms-of-service">Terms of Service</a> and <a href="https://cottageclass.com/privacy-policy">Privacy Policy</a>.</div>
        </div>
      </div>
    </div>
  </div>


<!-- Events --> 

  <Events limitTo="5" id="events" />
  <!-- 
      <div class="event-date-section-more-events"><a href="events.html" class="links more-link">All Events</a></div>
  -->

  <div class="content-section">
    <div class="divider-2px"></div>
    <div class="content-container-2 w-container">
      <h1 class="h1-display">Why kids club?</h1>
      <ul class="cottage-class-is-list">
        <li class="cottageclass-is-list-item"><img src="@/assets/easy-to-start.svg" alt="" class="cottageclass-is-list-item-image">
          <div class="cottageclass-is-list-item-text">
            <h2 class="heading-2">Build a village to raise your child.</h2>
            <p class="p-center-black desktop-align-left">Being a parent is hard, so why should you have to do it alone? On Kidsclub, you can share parenting with friends and neighbors. Your child will make new friends...and you will too!</p>
          </div>
        </li>
        <li class="cottageclass-is-list-item"><img src="@/assets/pay-nothing.svg" alt="" class="cottageclass-is-list-item-image">
          <div class="cottageclass-is-list-item-text">
            <h2 class="heading-2">Pay nothing for childcare.</h2>
            <p class="p-center-black desktop-align-left">Childcare is expensive, but at KidsClub, it’s always free! Parents spend more than 20% of their income on childcare. What would you buy if you got 20% of your income back? A boat, a family trip to Paris?</p>
          </div>
        </li>
        <li class="cottageclass-is-list-item"><img src="https://uploads-ssl.webflow.com/5ba3c28cff7d47030870c8e2/5ba5420373b5d2f4e4a03438_heart%202.svg" alt="" class="cottageclass-is-list-item-image">
          <div class="cottageclass-is-list-item-text">
            <h2 class="heading-2">Get quality care when you need it.</h2>
            <p class="p-center-black desktop-align-left">Finding a good sitter is hard, but on KidsClub all the “sitters” are amazing parents like you! KidsClub will help you find reliable care with parents you trust, even if it's at the last minute.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="content-section background-01">
    <div class="divider-2px"></div>
    <div class="content-container-2 w-container">
      <h1 class="h1-display">Our Story</h1>
      <div class="photo-group-container"><img src="@/assets/manishaholmes-2.png" alt="" class="our-story-photo">
        <p class="p-center-black">Manisha is a teaching artist and learning specialist with 15 years of experience teaching over 1,000 kids in three countries. Holmes is a techie/activist step-dad who was never satisfied with the educational options available to his bilingual family. Together, they’re working to build a new network that respects the uniqueness of each family and the creative passion of every child.</p>
      </div>
    </div>
  </div>
  <div class="content-section">
    <div class="divider-2px"></div>
    <div class="content-container-2 w-container">
      <div class="parents-heart-us-container">
        <h1 class="h1-display-parents-align-r">Parents</h1><img src="@/assets/heart-red.svg" alt="" class="image-263">
        <h1 class="h1-display-parents-align-l">Us</h1>
      </div>
    <ul class="testimonial-list-group">
      <li class="testimonial-list-item"><img src="@/assets/photo-12.png" alt="" class="testimonial-desktop-image w-hidden-small w-hidden-tiny">
        <div class="blockquote-container w-clearfix"><img src="@/assets/quotation.svg" alt="" class="quotation-mark-icon">
          <blockquote class="parents-love-us-blockquote">William has been very excited ...and often comes home singing a new song or talking about an activity he did that day. More than anything we&#x27;re hoping interacting with multiple children will get him better at being gentle, sharing and taking turns... things that he&#x27;s been trying very hard to understand :) &quot;</blockquote>
          <div class="testimonial-image-name-group"><img src="@/assets/photo-12.png" alt="" class="testimonial-mobile-image w-hidden-main w-hidden-medium">
            <div class="testimonial-mobile-text-content">
              <div class="testimonial-list-item-name"><strong class="parent-name">Mary Summers</strong></div>
              <div class="parent-location p-small-black-50">Brooklyn</div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-item-divider"></li>
      <li class="testimonial-list-item"><img src="@/assets/photo-62x.png" alt="" class="testimonial-desktop-image w-hidden-small w-hidden-tiny">
        <div class="blockquote-container w-clearfix"><img src="@/assets/quotation.svg" alt="" class="quotation-mark-icon">
          <blockquote class="parents-love-us-blockquote">CottageClass has transformed our son's learning and life! We can now customize his education to his learning style. He has found teachers that embrace him as a student and a human being. He feels valued and is thriving.</blockquote>
          <div class="testimonial-image-name-group"><img src="@/assets/photo-62x.png" alt="" class="testimonial-mobile-image w-hidden-main w-hidden-medium">
            <div class="testimonial-mobile-text-content">
              <div class="testimonial-list-item-name">Sara Fitzpatrick</div>
              <div class="parent-location p-small-black-50">Brooklyn</div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-item-divider"></li>
      <li class="testimonial-list-item"><img src="@/assets/eva-vandock-pinkley.jpg" alt="" class="testimonial-desktop-image w-hidden-small w-hidden-tiny">
        <div class="blockquote-container w-clearfix"><img src="@/assets/quotation.svg" alt="" class="quotation-mark-icon">
          <blockquote class="parents-love-us-blockquote">EMMETT LOVES LOVES LOVES this program. He is beaming when he walks out...thank you so much.&quot;</blockquote>
          <div class="testimonial-image-name-group"><img src="@/assets/eva-vandock-pinkley.jpg" alt="" class="testimonial-mobile-image w-hidden-main w-hidden-medium">
            <div class="testimonial-mobile-text-content">
              <div class="testimonial-list-item-name">Eva van Dok Pinkley</div>
              <div class="parent-location p-small-black-50">Brooklyn</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    </div>
  </div>
  <div class="content-section">
    <div class="divider-2px"></div>
    <div class="content-container-2 w-container">
      <h1 class="h1-display">As covered in</h1>
      <div class="featured-container">
      <a href="https://www.bloomberg.com/company/announcements/bloomberg-and-ny-tech-meetup-spotlight-female-led-startups-at-winter-2016-womens-demo-night/" target="_blank" class="featured-card w-inline-block"><img src="@/assets/bloomberg.png" alt="" class="press-logo"></a><a href="https://www.wsj.com/articles/haute-home-schools-designed-to-give-kids-a-bespoke-education-1455807796" target="_blank" class="featured-card w-inline-block"><img src="@/assets/thewallstreetjournal.png" alt="" class="image-261"></a><a href="https://www.nytimes.com/slideshow/2016/06/26/nyregion/not-just-the-teachers-pets/s/26PETCITY-slide-IKW9.html" target="_blank" class="featured-card w-inline-block"><img src="@/assets/thenewyorktimes.png" alt="" class="image-261"></a><a href="https://mommypoppins.com/new-york-city-kids/camps/8-new-summer-camps-for-nyc-kids-in-2017" target="_blank" class="featured-card w-inline-block"><img src="@/assets/mommypoppins.png" alt="" class="image-261"></a><a href="http://www.gettingsmart.com/2017/01/cottageclass-expanding-access-to-microschools-and-learning-experiences/" target="_blank" class="featured-card w-inline-block"><img src="@/assets/gettingsmart.png" alt="" class="image-261"></a>
      </div>
    </div>
    </div>
  <div class="footer">
    <div class="divider-2px"></div>
    <div class="footer-container w-container">
      <div class="div-block-33">
        <ul class="footer-unordered-list">
          <li class="footer-link-list-item"><a href="mailto:contact@cottageclass.com" class="links footer-link">contact@cottageclass.com</a></li>
          <li class="footer-link-list-item"><a href="tel:+18622944859" class="links footer-link">‭(862) 294-4859‬</a></li>
          <!-- Additional footer links here -->
        </ul>
        <ul class="footer-social-unordered-list">
          <li class="footer-social-list-item"><a href="https://twitter.com/cottageclass" class="link-block-2 w-inline-block"><img src="@/assets/social---twitter---gray.svg" width="32" height="32" alt=""></a></li>
          <li class="footer-social-list-item"><a href="https://instagram.com/cottageclass" class="link-block-2 w-inline-block"><img src="@/assets/social---instagram---gray.svg" width="32" height="32" alt=""></a></li>
          <li class="footer-social-list-item"><a href="https://cottageclass.tumblr.com/" class="link-block-2 w-inline-block"><img src="@/assets/social---tumblr---gray.svg" width="32" height="32" alt=""></a></li>
          <li class="footer-social-list-item"><a href="https://pinterest.com/cottageclass" class="link-block-2 w-inline-block"><img src="@/assets/social---pinterest---gray.svg" width="32" height="32" alt=""></a></li>
          <li class="footer-social-list-item"><a href="https://facebook.com/cottageclass" class="link-block-2 w-inline-block"><img src="@/assets/social---facebook---gray.svg" width="32" height="32" alt=""></a></li>
        </ul>
      </div>
      <div>
        <ul class="terms-unordered-list">
          <li class="terms-list-item"><a href="#" class="links footer-bottom">© CottageClass 2018</a></li>
          <li class="terms-list-item"><a href="https://cottageclass.com/terms-of-service" class="links footer-bottom">Terms of Service</a></li>
          <li class="terms-list-item"><a href="https://cottageclass.com/privacy-policy" class="links footer-bottom">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import networks from '@/assets/network-info.json'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
import Events from '@/components/Events.vue'


export default {
    name: 'Login',
    components: { Events },
    data () {
      return {
        networks: networks,
        currentUser: {},
        facebookLogin: !this.hideFacebookLogin(),
        directLogin: true
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
      hideFacebookLogin: () => {
        return ['(iPhone|iPod|iPad)(?!.*Safari)'].every(expression => {
          return !!navigator.userAgent.match(new RegExp(`(${expression})`, 'ig'));
        });
      },
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

.onb-body {
  all: unset;
}

.onb-login-top-image-container {
  text-align: center;
}

.onb-body-splash {
  overflow: visible;
  background-color: #fff;
  padding-top: 12px;
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

/* Naming necessary to avoid CSS bleed in production */
.body-homepage {
  all: unset;
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  background-color: #fff;
}

h1 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 55px;
  line-height: 44px;a
  font-weight: 700;
  text-align: center;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 36px;
  font-weight: bold;
}

a {
  color: #1f88e9;
  text-decoration: none;
}

.body {
  overflow: visible;
  background-color: #fff;
  font-family: soleil, sans-serif;
}

.nav-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
}

.chat-action-container {
  margin-left: 12px;
}

.button-nav {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #ff6550;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  font-size: 0.89rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.button-nav:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .06)), to(rgba(0, 0, 0, .06)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .06), rgba(0, 0, 0, .06));
}

.nav-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 0px 32px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.tag-container-desktop {
  padding-top: 0px;
}

.nav-links {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 0px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.nav-link {
  display: block;
  padding: 16px 10px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.89rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.nav-link:hover {
  color: #7e7e7e;
}

.nav-tag {
  padding-top: 2px;
  color: #a6a6a6;
  font-size: 0.8rem;
}

.image-2 {
  margin-right: 17px;
  float: left;
  opacity: 0.8;
}

.nav-section {
  position: static;
  top: 0px;
  width: 100%;
  background-color: #fff;
}

.nav-flex-space {
  height: 8px;
  min-height: 16px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.brand {
  width: 168px;
  margin-right: 12px;
  padding-left: 0px;
}

.div-block-32 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.hero-section {
  margin-top: 0px;
  padding-top: 0px;
  background-image: url('../../assets/hero-3---r.svg'), url('../../assets/hero-4---l.svg');
  background-position: 111% 50%, -125px 50%;
  background-size: 240px, 240px;
  background-repeat: no-repeat, no-repeat;
}

.hero-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
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

.h1-display {
  margin-bottom: 24px;
  line-height: 66px;
}

.hero-subtitle {
  margin-bottom: 32px;
  font-size: 19px;
  line-height: 26px;
  text-align: center;
}

.signup-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
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
}

.highlight {
  color: #0dba52;
}

.hero-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 90%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.how-wrapper {
  padding: 32px;
  border-radius: 8px;
}

.p-center-black {
  margin-bottom: 1rem;
}

.event-detail-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 32px 32px 112px;
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
}

.content-section {
  display: block;
  margin-top: 0px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff; 
}

.content-section.background-01 {
  background-color: #f6f6f6;
}

.p-small-black-50 {
  color: rgba(0, 0, 0, .5);
  font-size: 0.88rem;
  line-height: 1.2rem;
  text-align: left;
}

.divider-2px {
  width: 100%;
  height: 2px;
  background-color: #f3f3f3;
}

.content-container-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
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
}

.featured-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 90%;
  margin-top: 48px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.featured-card {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 33.3%;
  padding: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.image-261 {
  max-width: 90%;
}

.footer-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 112px 32px 0px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.footer {
  background-color: #fff;
  background-image: url('../../assets/footer-bottom-image-2.svg');
  background-position: 50% -82%;
  background-size: auto;
  background-repeat: no-repeat;
}

.footer-link {
  color: grey;
  text-decoration: none;
}

.footer-link-list-item {
  margin-right: 6px;
  margin-bottom: 0px;
  margin-left: 6px;
  color: #818181;
  list-style-type: none;
}

.footer-unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 21px;
  padding-left: 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.footer-social-unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0px;
}

.footer-social-list-item {
  margin-right: 6px;
  margin-left: 6px;
  list-style-type: none;
}

.terms-list-item {
  margin-right: 6px;
  margin-bottom: 8px;
  margin-left: 6px;
  color: #c49696;
  list-style-type: none;
}

.terms-unordered-list {
  position: static;
  bottom: -1px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0px;
  padding-left: 0px;
}

.terms-link {
  color: #9fc2e2;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
}

.div-block-33 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 99px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.hero-list-item-heading {
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
}

.hero-list-item-subtitle {
  color: #717171;
  text-align: center;
}

.image-262 {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
}

.list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 28%;
  margin: 24px;
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
  list-style-type: none;
}

.unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  list-style-type: none;
}

.testimonial-image-name-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.quotation-mark-icon {
  min-width: 52px;
  margin-right: 16px;
  padding-left: 0px;
  float: left;
  clear: left;
  opacity: 1;
}

.image-263 {
  min-width: 80px;
  margin-right: 8px;
  margin-left: 8px;
}

.h1-display-parents-align-r {
  margin-top: 7px;
  margin-bottom: 0.5rem;
  text-align: left;
}

.parents-love-us-blockquote {
  width: 100%;
  margin-bottom: 24px;
  padding: 0px;
  border-style: none;
  font-size: 1.1rem;
  line-height: 1.8rem;
  text-align: left;
}

.testimonial-desktop-image {
  max-width: 250px;
  min-width: 250px;
  border-radius: 4px;
}

.testimonial-list-item-name {
  margin-bottom: 4px;
  font-weight: 700;
  text-align: left;
}

.h1-display-parents-align-l {
  margin-top: 7px;
  margin-bottom: 0.5rem;
  text-align: left;
}

.testimonial-list-item-divider {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 1px;
  margin-bottom: 64px;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, .07);
}

.testimonial-mobile-image {
  max-width: 75px;
  min-width: 75px;
  margin-right: 16px;
}

.blockquote-container {
  margin-left: 40px;
}

.testimonial-list-item-location {
  text-align: left;
}

.testimonial-list-item-location.p-small-black-50 {
  margin-bottom: 4px;
}

.testimonial-list-group {
  width: 80%;
  margin-bottom: 0px;
  padding-left: 0px;
  list-style-type: none;
}

.testimonial-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 64px;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.testimonial-list-item-role {
  text-align: left;
}

.parents-heart-us-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 80px;
}

.photo-group-container {
  width: 65%;
  margin-top: 64px;
}

.our-story-photo {
  width: 100%;
  margin-bottom: 24px;
  border-style: none;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .09);
  border-radius: 4px;
  box-shadow: none;
}

.unordered-list-events {
  width: 100%;
  margin-bottom: 32px;
  padding-left: 0px;
  list-style-type: none;
}

.event-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .1);
}

.event-list-item-graphic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 180px;
  min-width: 180px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #cbcbcb;
}

.event-list-item-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.event-heading {
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5px;
}

.action-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: 24px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.host-info {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.avatar-small {
  border-radius: 50%;
}

.event-time {
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 17px;
}

.event-location {
  margin-bottom: 16px;
}

.text-block {
  margin-top: -4px;
  margin-right: 17px;
  margin-left: 10px;
  line-height: 17px;
}

.button {
  padding: 12px 32px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
  color: white;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.event-summary {
  width: 100%;
}

.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.events-list-wrapper {
  width: 100%;
  margin-top: 60px;
}

.event-date-section-tittle {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 68px;
  margin-bottom: 16px;
  padding: 16px 16px 16px 0px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
}

.event-date-section-tittle.cancel-top-margin {
  margin-top: 0px;
}

.date-title {
  font-size: 24px;
  line-height: 28px;
  text-align: center;
}

.bold-text {
  color: #ff6550;
}

.more-link {
  color: #1f88e9;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
}

.color-1 {
  background-color: #e82d55;
}

.color-2 {
  background-color: #0cba52;
}

.color-3 {
  background-color: #aff0fc;
}

.color-4 {
  background-color: #fd6f77;
}

.color-5 {
  background-color: #64426b;
}

.body-2 {
  background-color: #f6f6f6;
}

.event-detail-graphic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  min-height: 240px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #e82d55;
}

.div-block-36 {
  width: 100%;
  padding: 32px;
  background-color: #fff;
}

.event-detail-heading {
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 35px;
  line-height: 49px;
  text-align: left;
  letter-spacing: -0.5px;
}

.host-info-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.hosted-by {
  margin-top: -4px;
  margin-right: 17px;
  margin-left: 0px;
  font-size: 15px;
  line-height: 22.4px;
}

.background-checked {
  margin-left: 4px;
  padding-left: 0px;
  color: #000;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.background-checked-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 2px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.avatar-large {
  border-radius: 50%;
}

.summary-info {
  margin-top: 32px;
  padding-left: 0px;
  list-style-type: none;
}

.summary-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 12px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.summary-text {
  margin-left: 10px;
}

.map {
  min-height: 300px;
  min-width: 100%;
  background-image: url('../../assets/map.png');
  background-position: 50% 50%;
  background-size: cover;
}

.event-specifics-card {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: 16px;
  padding: 32px 32px 50px;
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
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .08);
}

.card-large-text {
  width: 80%;
  margin-top: 16px;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
}

.card-small-text {
  margin-top: 8px;
  font-size: 13px;
  line-height: 20px;
}

.card-small-text-gray {
  margin-top: 0px;
  color: #969696;
  font-size: 13px;
  line-height: 20px;
}

.button-bottom-event {
  margin-top: 24px;
  padding: 12px 91px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
}

.button-bottom-event:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.avatar-x-large {
  border-radius: 50%;
}

.mobile-cards-wrapper {
  width: 100%;
}

.link-block-4 {
  color: #000;
  text-decoration: none;
}

.link-block-4:hover {
  text-decoration: underline;
}

.content-container-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
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
}

.content-container-4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 64px 32px 112px;
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
}

.fb-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 24px 12px 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #3b5998;
  color: #fff;
  text-decoration: none;
}

.fb-button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .15)), to(rgba(0, 0, 0, .15)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15));
}

.fb-button-text {
  margin-top: 1px;
  margin-left: 12px;
  font-size: 14px;
  text-align: left;
  letter-spacing: 0.4px;
  text-decoration: none;
}

.use-password-text {
  margin-top: 16px;
  line-height: 21px;
  text-align: center;
  text-decoration: none;
}

.terms-text {
  margin-top: 10px;
  color: #b3b3b3;
  font-size: 12px;
  text-align: center;
}

.links:hover {
  text-decoration: underline;
}

.links.footer-bottom {
  color: #fff;
}

.links.footer-link {
  text-align: center;
}

.cottageclass-is-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 90%;
  padding: 24px 32px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.cottageclass-is-list-item-text {
  margin-left: 24px;
}

.cottage-class-is-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: 64px;
  padding-left: 0px;
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
  list-style-type: none;
}

.cottageclass-is-list-item-image {
  max-width: 230px;
  margin-bottom: 16px;
}

.heading-2 {
  margin-top: 0px;
  font-size: 24px;
}

.date-text-wrapper {
  padding-left: 16px;
}

.event-date-section-more-events {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  padding: 16px 16px 16px 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
}

.image-264 {
  width: 40px;
  background-color: #fff;
}

.image-265 {
  width: 40px;
}

.fb-container-2 {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 10px;
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
  background-color: #fff;
  box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, .05);
}

.fb-button-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 24px 12px 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #3b5998;
  color: #fff;
  text-decoration: none;
}

.fb-button-2:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .15)), to(rgba(0, 0, 0, .15)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15));
}

@media (max-width: 991px) {
  .nav-menu {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-top: 0px;
    padding-top: 0px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    background-color: transparent;
  }
  .button-nav {
    padding: 4px 12px;
    font-size: 0.8rem;
    letter-spacing: 0.12rem;
  }
  .button-nav.menu {
    padding: 4px 12px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
    font-size: 0.8rem;
    letter-spacing: 0.12rem;
  }
  .nav-container {
    margin-top: 24px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .nav-links {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 32px;
    padding-left: 32px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
  }
  .nav-link {
    margin-right: 0px;
    margin-bottom: 8px;
    margin-left: 0px;
    padding: 8px 0px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
  }
  .nav-section {
    position: relative;
    padding-bottom: 0px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1);
    opacity: 1;
  }
  .menu-button {
    padding: 0px 0px 0px 12px;
  }
  .menu-button.w--open {
    background-color: #fff;
  }
  .div-block-32 {
    width: 40%;
    padding: 24px 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    border-top: 1px solid #f4f4f4;
    background-color: #fff;
    box-shadow: 0 14px 20px 0 rgba(0, 0, 0, .11);
  }
  .hero-section {
    background-image: url('../../assets/group-5.svg');
    background-position: 50% -123px;
    background-size: 800px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-top: 112px;
    padding-bottom: 112px;
  }
  .h1-display {
    font-size: 32px;
    line-height: 42px;
  }
  .hero-subtitle {
    font-size: 16px;
    line-height: 22px;
  }
  .hero-content {
    width: 100%;
    padding-top: 16px;
  }
  .event-detail-container {
    padding-top: 32px;
    padding-bottom: 128px;
  }
  .content-container-2 {
    padding-top: 100px;
    padding-bottom: 128px;
  }
  .featured-container {
    width: 100%;
  }
  .featured-card {
    width: 33.3%;
    padding: 8px;
  }
  .footer {
    background-position: 50% -84%;
    background-size: auto;
  }
  .unordered-list {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .testimonial-image-name-group {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .quotation-mark-icon {
    min-width: 45px;
    margin-right: 16px;
  }
  .image-263 {
    min-width: 50px;
  }
  .h1-display-parents-align-r {
    font-size: 2.21rem;
    line-height: 2.652rem;
  }
  .parents-love-us-blockquote {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .testimonial-mobile-text-content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .h1-display-parents-align-l {
    font-size: 2.21rem;
    line-height: 2.652rem;
  }
  .testimonial-mobile-image {
    max-width: 75px;
    min-width: 75px;
    margin-right: 16px;
  }
  .parents-heart-us-container {
    margin-bottom: 56px;
  }
  .photo-group-container {
    width: 90%;
  }
  .content-container-3 {
    padding-top: 100px;
    padding-bottom: 128px;
  }
  .content-container-4 {
    padding-bottom: 128px;
  }
  .fb-button {
    width: 80%;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .cottageclass-is-list-item {
    width: 100%;
    padding: 16px;
  }
  .cottageclass-is-list-item-image {
    width: 33%;
  }
  .fb-button-2 {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .body {
    padding-bottom: 100px;
  }
  .nav-menu {
    margin-top: 0px;
  }
  .nav-container {
    margin-top: 12px;
    margin-bottom: 12px;
    padding-right: 32px;
    padding-left: 32px;
  }
  .nav-links {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 0px;
    padding-left: 0px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .nav-tag {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-bottom: 2px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    color: #a6a6a6;
    font-size: 0.71rem;
  }
  .nav-section {
    padding-bottom: 0px;
  }
  .div-block-32 {
    width: 260px;
    margin-right: 32px;
  }
  .tag-container-mobile {
    padding-right: 32px;
    padding-left: 32px;
  }
  .hero-section {
    background-image: url('../../assets/group-5.svg');
    background-position: 50% -123px;
    background-size: 600px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-right: 20px;
    padding-left: 20px;
  }
  .h1-display {
    font-size: 28px;
    line-height: 34px;
  }
  .hero-content {
    width: 80%;
  }
  .how-wrapper {
    width: 100%;
    margin-bottom: 24px;
  }
  .p-center-black {
    font-size: 0.89rem;
    line-height: 1.34rem;
  }
  .p-center-black.desktop-align-left {
    font-size: 14px;
    line-height: 21px;
  }
  .event-detail-container {
    padding: 0px 0px 100px;
  }
  .p-small-black-50 {
    font-size: 0.75rem;
  }
  .content-container-2 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
  .featured-card {
    width: 50%;
    padding: 16px;
  }
  .footer-container {
    padding-right: 20px;
    padding-left: 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .footer {
    background-position: 50% -80%;
    background-size: auto;
  }
  .list-item {
    width: auto;
    margin-bottom: 22px;
  }
  .unordered-list {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .quotation-mark-icon {
    min-width: 41px;
    margin-right: 8px;
  }
  .image-263 {
    min-width: 40px;
  }
  .h1-display-parents-align-r {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .parents-love-us-blockquote {
    font-size: 0.89rem;
    line-height: 1.4rem;
  }
  .h1-display-parents-align-l {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .testimonial-mobile-image {
    max-width: 90px;
    min-width: 90px;
  }
  .blockquote-container {
    margin-left: 0px;
  }
  .testimonial-list-group {
    width: 80%;
  }
  .testimonial-list-item-role.p-small-black-50 {
    margin-bottom: 8px;
  }
  .photo-group-container {
    width: 100%;
  }
  .event-list-item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .event-list-item-graphic {
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
  }
  .date-title {
    font-size: 22px;
    line-height: 26px;
  }
  .event-detail-graphic {
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
  }
  .card-large-text {
    width: 88%;
  }
  .mobile-cards-wrapper {
    padding-right: 16px;
    padding-left: 16px;
  }
  .content-container-3 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
  .content-container-4 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
  .terms-text {
    line-height: 18px;
  }
  .cottageclass-is-list-item {
    width: 100%;
    padding: 32px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .cottageclass-is-list-item-text {
    margin-left: 0px;
  }
  .cottage-class-is-list {
    margin-top: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .cottageclass-is-list-item-image {
    width: 30%;
    margin-top: -14px;
    margin-right: 24px;
    margin-bottom: 0px;
  }
  .heading-2 {
    font-size: 20px;
    line-height: 26px;
  }
  .fb-container-2 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 32px;
    padding-left: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
  }
  .fb-button-2 {
    position: static;
    width: 320px;
  }
  .div-block-37 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
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
}

@media (max-width: 479px) {
  .body {
    padding-bottom: 110px;
  }
  .nav-menu {
    position: absolute;
    margin-top: 0px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .nav-container {
    padding-right: 20px;
    padding-left: 20px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .nav-links {
    padding-right: 0px;
    padding-left: 0px;
  }
  .nav-tag {
    padding-left: 20px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .brand {
    width: 140px;
  }
  .div-block-32 {
    width: 100%;
    margin-right: 0px;
  }
  .tag-container-mobile {
    padding-right: 0px;
    padding-left: 0px;
  }
  .hero-section {
    background-image: url('../../assets/group-5.svg');
    background-position: 50% -66px;
    background-size: 400px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-top: 32px;
    padding-bottom: 64px;
  }
  .hero-content {
    width: 100%;
  }
  .how-wrapper {
    padding: 0px;
  }
  .p-center-black {
    margin-bottom: 1rem;
  }
  .p-center-black.desktop-align-left {
    text-align: center;
  }
  .event-detail-container {
    padding-bottom: 32px;
    background-color: #f4f4f4;
  }
  .content-container-2 {
    padding-top: 64px;
    padding-bottom: 64px;
  }
  .featured-card {
    padding: 0px;
  }
  .image-261 {
    max-width: 100%;
  }
  .footer-container {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .footer {
    background-position: 50% 153px;
    background-size: cover;
  }
  .footer-link-list-item {
    margin-bottom: 16px;
    text-align: center;
  }
  .footer-unordered-list {
    margin-bottom: 26px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .terms-list-item {
    text-align: center;
  }
  .terms-unordered-list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .terms-link {
    text-align: center;
  }
  .testimonial-image-name-group {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .h1-display-parents-align-r {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .h1-display-parents-align-l {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .testimonial-list-item-divider {
    margin-bottom: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .testimonial-mobile-image {
    max-width: 75px;
    min-width: 75px;
    margin-top: 6px;
  }
  .testimonial-list-group {
    width: 100%;
  }
  .testimonial-list-item {
    margin-bottom: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .parents-heart-us-container {
    margin-bottom: 40px;
  }
  .photo-group-container {
    margin-top: 32px;
  }
  .our-story-photo {
    margin-bottom: 16px;
  }
  .event-heading {
    font-size: 18px;
    line-height: 25px;
  }
  .action-bar {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .button {
    width: 100%;
    margin-top: 20px;
  }
  .events-list-wrapper {
    margin-top: 32px;
  }
  .date-title {
    font-size: 18px;
    line-height: 24px;
    text-align: left;
  }
  .div-block-36 {
    padding: 24px;
  }
  .event-detail-heading {
    font-size: 20px;
    line-height: 26px;
  }
  .card-large-text {
    width: 100%;
    font-size: 16px;
    line-height: 26px;
  }
  .button-bottom-event {
    width: 100%;
    margin-top: 20px;
  }
  .content-container-3 {
    padding: 64px 16px;
  }
  .content-container-4 {
    padding: 64px 16px;
  }
  .fb-button {
    width: 100%;
    padding-bottom: 17px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .fb-button:active {
    background-color: #3b5998;
  }
  .fb-button-text {
    font-weight: 400;
  }
  .terms-text {
    width: 80%;
    margin-top: 6px;
  }
  .cottageclass-is-list-item {
    margin-bottom: 32px;
    padding: 0px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .cottageclass-is-list-item-image {
    width: 50%;
    margin-top: 0px;
    margin-right: 16px;
  }
  .heading-2 {
    text-align: center;
  }
  .image-264 {
    width: 32px;
  }
  .image-265 {
    width: 32px;
  }
  .fb-container-2 {
    padding-right: 20px;
    padding-left: 20px;
  }
  .fb-button-2 {
    width: 100%;
    padding-bottom: 17px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .fb-button-2:active {
    background-color: #3b5998;
  }
  .div-block-37 {
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
  }
}


</style>
