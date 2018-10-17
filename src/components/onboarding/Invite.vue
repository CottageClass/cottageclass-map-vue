<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Invite Friends</h1>
      <p class="onb-paragraph-subheading-2">It only takes 3 parents to build a trusted network! Invite friends you&#x27;d like to share care with.</p>
    </div>
    <div class="onb-copy-link-container">
    	<!-- 
      <div class="onb-copy-link-form-block w-form">
        <form id="email-form" name="email-form" data-name="Email Form" class="onb-copy-link-form"><input type="text" class="copy-text-link-field w-input" maxlength="256" name="name" data-name="Name" placeholder="goo.gl/gbXHjw" id="name"><a href="#" class="onb-button-copy-link w-button">Copy Link</a></form>
      </div>
  -->
    </div>
    <ul class="onb-social-button-list">
      <li class="onb-button-social-list-item"><TextMessageLink :message="shareMessage" number="" class="onb-button-social w-inline-block"><img src="@/assets/mms.svg" width="32" height="32" alt=""><div class="onb-button-social-text">Text message</div></TextMessageLink></li>
      <li class="onb-button-social-list-item"><a :href="fbMessengerLink" class="onb-button-social w-inline-block"><img src="@/assets/messenger.svg" width="32" height="32" alt=""><div class="onb-button-social-text">Facebook Messenger</div></a></li>
      <li class="onb-button-social-list-item"><a :href="fbLink" target="_blank" class="onb-button-social w-inline-block"><img src="@/assets/facebook-hover.svg" width="32" height="32" alt=""><div class="onb-button-social-text">Facebook timeline</div></a></li>
      <li class="onb-button-social-list-item"><a :href="tweetLink" target="_blank" class="onb-button-social w-inline-block"><img src="@/assets/twitter-hover.svg" width="32" height="32" alt=""><div class="onb-button-social-text">Twitter</div></a></li>
      <li class="onb-button-social-list-item"><a :href="emailLink" class="onb-button-social w-inline-block"><img src="@/assets/email.svg" width="32" height="32" alt=""><div class="onb-button-social-text">Email</div></a></li>
    </ul>
  </div>
</template>

<script>
// todo
// remove fake form and replace with something else
// test textmessage
// may want to add appId here https://developers.facebook.com/docs/sharing/messenger/web/
// test fb messenger
// test twitter
// test texting also in book
// add facebook meta tags to page

import TextMessageLink from '@/components/TextMessageLink.vue'

export default {
  name: "Invite",
  components: { TextMessageLink },
  data () {
  	return {
  		shareUrl: "app.cottageclass.com/",
  		prefix: "https://",
  		shareMessage: "Hey! I wanted to invite you share childcare in my network on CottageClass! Can you join?",
  		tweetText: "Everyone I know should join the network I\'m starting for sharing childcare on CottageClass!",
      emailBody: "Hi%20everyone!%0A%0AWe%20should%20all%20join%20my%20network%20on%20this%20new%20app%20for%20sharing%20childcare!%20Can%20you%20join%3F%0A%0A",
      emailSubject: "Sharing%20childcare%20(we%20should%20do%20this!)"

  	}
  },
  computed: {
  	textMessage: function () {
  		return "Hey! I wanted to invite you share childcare in my network on CottageClass! Can you join? " + this.link
  	},
  	link: function() {
  		return this.prefix + this.shareUrl
  	},
  	fbMessengerLink: function () {
  		return "fb-messenger://share/?link=" + this.link
  	},
  	fbLink: function () {
  		return 'https://www.facebook.com/sharer/sharer.php?u=' + this.link
  	},
  	tweetLink: function () {
  		return 'https://twitter.com/intent/tweet?text=' + this.tweetText + ' ' + this.link
  	},
    emailLink: function () {
      return 'mailto:?subject=' + this.emailSubject + '&body=' + this.emailBody + 'https%3A%2F%2F' + this.shareUrl + '%2F%0A%0AThanks!%0A%3C3'
    }
  },
  methods: {
  	copy: function () {
  		return true
  		// not sure how to do this. uncomment copy section later.
  }
}
};
</script>

<style scoped>
/* Remove inner shadow from inputs on mobile iOS */
textarea, input[type="text"] {
-webkit-appearance: none;
}
html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.scrolling-wrapper {
  overflow-x: auto;
}

.card {
  flex: 0 0 auto;
}
  .scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}
.scrolling-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
.onb-button-social {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 13px 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  cursor: pointer;
}

.onb-button-social:active {
  background-color: #fff;
}

.onb-button-social-text {
  margin-left: 10px;
  color: #1d8ae7;
}

.onb-social-button-list {
  width: 100%;
  margin-bottom: 0px;
  padding-left: 0px;
  list-style-type: none;
}

.onb-button-social-list-item {
  margin-bottom: 8px;
}

.onb-copy-link-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.copy-text-link-field {
  width: 100%;
  height: 56px;
  margin-bottom: 0px;
  padding-top: 8px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: #fff;
  color: #fff;
  font-size: 16px;
}

.copy-text-link-field:active {
  background-color: #fff;
}

.copy-text-link-field:focus {
  background-color: #fff;
}

.copy-text-link-field::-webkit-input-placeholder {
  color: #333;
  font-weight: 700;
}

.copy-text-link-field:-ms-input-placeholder {
  color: #333;
  font-weight: 700;
}

.copy-text-link-field::placeholder {
  color: #333;
  font-weight: 700;
}

.onb-copy-link-form {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #333;
}

.onb-copy-link-form-block {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.button-2 {
  position: absolute;
  right: -1px;
}

.onb-button-copy-link {
  position: absolute;
  right: 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 100%;
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #bbddf7;
  color: #1d8ae7;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.onb-button-copy-link:active {
  background-color: #4cb2ff;
  color: #fff;
}

.onb-button-facebook:active {
  opacity: 0.8;
}


</style>