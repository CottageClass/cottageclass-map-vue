<template>

<div class="modal-wrapper">

    <div class="title-bar-container">
      <a href="javascript:history.go(-1)">
        <img src="../assets/Close-X.svg">
      </a>
      <h5 class="heading-3">Request Care</h5><a href="#" class="title-bar-action-2 w-inline-block"></a></div>
    <div class="form-container">
      <div class="form-block w-form">
        <div id="email-form" class="form">
          <select v-model="day" class="select-field w-select">
            <!-- this is silly but saves us from using natural date libraries right now--> 
            <option value="today" select="selected">Today</option>
            <option value="tomorrow" select="selected">Tomorrow</option>
            <option value="Monday" select="selected">Monday</option>
            <option value="Tuesday" select="selected">Tuesday</option>
            <option value="Wednesday" select="selected">Wednesday</option>
            <option value="Thursday" select="selected">Thursday</option>
            <option value="Friday" select="selected">Friday</option>
            <option value="Saturday" select="selected">Saturday</option>
            <option value="Sunday" select="selected">Sunday</option>
          </select>
          <label>Start time?</label>
          <input type="time" v-model="startTime" class="select-field w-select">
          <label>End time?</label>
          <input type="time" v-model="endTime" class="select-field w-select">
          <select v-model="numberOfChildren" class="select-field w-select">
            <option value="1">1 child</option>
            <option value="2">2 children</option>
            <option value="3">3 children</option>
            <option value="4">4 children</option>
          </select>

          <div class="avatar-and-cta-container">
            <FacebookAvatar :facebookId="provider.facebookId" class="image" />
              <div class="text-block-4">
                Send a text message to<br><span class="text-span">{{ provider.firstName}} {{ provider.lastInitial }}.</span><span class="black-50"></span>
              </div>
            </div>

            <TextMessageLink
              v-if="!!twilioProxyNumberForProvider"
              :number="twilioProxyNumberForProvider"
              :message="messageForPerson()"
            >
              <button
                value="Send Text"
                class="button-small-3 w-button"
                @click="submitRequest"
              >
                Send Text
              </button>
            </TextMessageLink>
            <div class="small-text-black-40">You can edit it on the next screen.<br>Each booking costs ${{ network.price }}/hour<br> &amp; you only pay for what you use.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// todo:
// make close work.
// pass event back so that the main window has knowledge of this.
// format text message so that it gives a readable date and "tomorrow"
// consider showing start / end on same line side by side to make more room for avatar
// consider putting avatar at the top.
// try adding an animation so it fades in

import TextMessageLink from './TextMessageLink.vue'
import networks from '../assets/network-info.json'
import * as api from '@/utils/api.js'
import * as Token from '@/utils/tokens.js'
import FacebookAvatar from './FacebookAvatar.vue'

// import google sheets API service
import sheetsu from 'sheetsu-node'

// create a config file to identify which spreadsheet we push to.
var client = sheetsu({ address: 'https://sheetsu.com/apis/v1.0su/62cd725d6088' })


export default {
  name: 'RequestModal',
  components: { TextMessageLink, FacebookAvatar },
  data () {
    return {
      numberOfChildren: 1,
      day: "today",
      startTime: "19:00",
      endTime: "22:00",
      people: [],
      networks: networks,
      currentUserId: Token.currentUserId(this.$auth),
      currentUser: {},
      providerId: this.$route.params.id,
      twilioProxyNumberForProvider: null,
    }
  },
  computed: {
    network: function () {
      let networkId = Token.currentUserNetworkCode(this.$auth)
      return this.networks.find(network => network.stub === networkId)
    },
    provider: function () {
      return this.people.find(person => person.id === this.providerId)
    }
  },
  mounted: function () {
    // fetch users in network
    api.fetchUsersInNetwork(this.network.stub)
      .then(res => {
        this.people = res
        this.currentUser = res.find(person => person.id == this.currentUserId)
      })

    // init twilio proxy session to obtain SMS number
    api.initProxySession(this.currentUserId, this.providerId)
      .then(proxyNumberReceiver => {
        console.log("PROXY NUMBER RECEIVED: " + proxyNumberReceiver)
        this.twilioProxyNumberForProvider = proxyNumberReceiver
      })
  },
  methods: {
    submitRequest: function () {
      client.create({
        "Requester ID": this.currentUser.id,
        "Requester Name": this.currentUser.firstName + ' ' + this.currentUser.lastInitial,
        "Requester Phone": this.currentUser.phone,
        "Provider ID": this.provider.id,
        "Provider Name": this.provider.firstName + ' ' + this.provider.lastInitial,
        "Provider Phone #": this.provider.phone,
        "Request Made": Date(),
        "Request Day": this.day,
        "Start Time": this.startTime,
        "End Time": this.endTime,
        "# Children": this.numberOfChildren,
        "Network": this.network.name,
        "Network Code": this.network.stub
      }, "requests").then((data) => {
        console.log(data)
      }, (err) => {
        console.log(err)
      });
    },
    formatTime: function (time) {
      var minutes = time.slice(-2);
      var hours24 = time.substr(0, time.indexOf(':'));
      var ampm = (hours24 >= 12) ? 'pm' : 'am';
      var hours12 = hours24 % 12;
      if (hours12 == 0) {
        hours12 = 12
      }
      return hours12 + ':' + minutes + ampm
    },
    messageForPerson: function () {
      // ^^ Those crazy unicode characters are emojis :)
      let msg = 'Hi ' + this.provider.firstName + '!! I\'m a parent from ' + this.network.name + ', I\'m looking for care for ' + this.numberOfChildren + ' ' + ((this.numberOfChildren > 1) ? 'children' : 'child') + ' ' + this.day + ' from ' + this.formatTime(this.startTime) + ' to ' + this.formatTime(this.endTime) + ', and I saw you were often available at these times. Would this work? Thanks! \ud83c\udf08\u26a1\ud83e\udd84'
      return msg
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

a {
  text-decoration: none;
}

.list-item-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 16px;
  margin-bottom: 4px;
  margin-left: 16px;
  padding: 24px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, .1);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 6px 0 #fff;
}

.image {
  width: 60px;
  height: 60px;
  border-radius: 100px;
}

.list-item-content-left {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-right: 16px;
  margin-left: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.heading {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 15px;
  text-align: center;
}

.black-50 {
  color: rgba(0, 0, 0, .5);
}

.invite-friends-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 24px 16px;
  padding: 40px 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
}

.button {
  border-radius: 4px;
  background-color: #000;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.spacer-16 {
  width: 16px;
  height: 16px;
}

.friend-indicator {
  position: absolute;
  left: 13px;
  z-index: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 24px;
  height: 24px;
  clear: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: #0cba52;
}

.map-container {
  position: relative;
}

.calendar-button {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 56px;
  height: 56px;
  clear: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: #ff6550;
  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .26);
}

.avatar-on-map {
  position: absolute;
  left: 102px;
  top: 96px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border: 4px solid #1f88e9;
  border-radius: 100px;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, .2);
}

.avatar-on-map-2 {
  position: absolute;
  left: 217px;
  top: 153px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border: 4px solid #1f88e9;
  border-radius: 100px;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, .2);
}

.text-block {
  font-size: 13px;
}

.home-on-map {
  position: absolute;
  left: 158px;
  top: 131px;
  z-index: 3;
  box-shadow: none;
}

.app-bar-heading {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  text-align: center;
}

.navbar {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 400;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  height: 60px;
  padding-right: 24px;
  padding-left: 24px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .07);
}

.image-2 {
  width: 140px;
}

.wrapper {
  margin-top: 60px;
}

.body {
  background-color: #f2f2f2;
}

.map {
  height: 250px;
}

.div-block {
  height: 100px;
}

.group-title-container {
  margin-top: 0px;
  padding-top: 40px;
  padding-bottom: 10px;
}

.heading-2 {
  margin-top: 0px;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.send-message-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-width: 200px;
  clear: none;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.button-small {
  padding: 6px 12px;
  border: 1px solid #c5c5c5;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
  color: #000;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.button-small-2 {
  min-width: 117px;
  padding: 6px 8px;
  border-radius: 4px;
  background-color: #ff6550;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .2);
  font-size: 10px;
  font-weight: 400;
  text-align: left;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.brand-container {
  position: absolute;
  left: 0px;
  top: 24px;
  right: 0px;
  z-index: 14;
  width: 156px;
  padding: 16px 18px 16px 16px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #fff;
}

.cc-logo {
  width: 120px;
}

.message-button-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 60px;
  padding-top: 7px;
  padding-bottom: 7px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #d1eaff;
}

.send-message-text {
  margin-top: -4px;
  color: #1f88e9;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.div-block-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.button-send-message {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 6px 12px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(31, 136, 233, .15);
}

.button-send-message-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 38px;
  min-width: 38px;
  padding: 6px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(31, 136, 233, .15);
}

.div-block-3 {
  margin-top: 9px;
  padding: 11px 16px;
  border-style: none;
  border-color: #000;
  border-radius: 16px;
  background-color: #ddeefb;
}

.text-block-2 {
  padding: 12px 16px;
  border-style: none;
  background-color: #ddeefb;
}

.text-block-3 {
  font-size: 12px;
  line-height: 15px;
}

.modal-wrapper {
  position: fixed;
  z-index: 9999;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100vh;
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
  background-color: #fff;
}

.title-bar-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.button-small-3 {
  border-radius: 4px;
  background-color: rgba(31, 136, 233, .15);
  color: #1f88e9;
  font-size: 13px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.heading-3 {
  text-align: left;
}

.title-bar-action-2 {
  width: 24px;
  height: 24px;
}

.title-bar-action-l {
  width: 24px;
  height: 24px;
}

.form-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 32px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.form-block {
  display: block;
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

.form {
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

.select-field {
  border: 1px solid #e4e4e4;
  border-radius: 0px;
  background-image: -webkit-linear-gradient(270deg, #fff, #fff);
  background-image: linear-gradient(180deg, #fff, #fff);
}

.text-block-4 {
  margin-top: 16px;
  text-align: center;
}

.avatar-and-cta-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;
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

.text-span {
  font-weight: 700;
}

.small-text-black-40 {
  margin-top: 7px;
  color: rgba(0, 0, 0, .4);
  font-size: 11px;
  line-height: 16px;
}

@media (max-width: 479px) {
  .list-item-container {
    padding: 16px;
  }
  .friend-indicator {
    left: 56px;
    top: 53px;
  }
  .title-bar-container {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

/*
	.avatar-and-cta-container {
		display: none;
	}
	*/
/* This isn't working on android so I've hidden that thumbnail with the line above */

@media(max-height:600px) {
	.avatar-and-cta-container {
		display: none;
	}
}
</style>
