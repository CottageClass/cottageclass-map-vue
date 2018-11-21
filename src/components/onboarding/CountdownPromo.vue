<template>
  <div v-if="showPromo" class="promo-container"><img src="@/assets/free.svg" alt="" class="image-free-tag">
    <div class="counter-title">Book in 24 hours for a free first day!</div>
    <div class="counter-subtitle">You're welcome! Offer expires in...</div>
    <div class="counter">
      <div class="counter-item">
        <div id="hour-count" class="count">{{ hours }}</div>
        <div class="label-time-interval">Hours</div>
      </div>
      <div class="counter-item">
        <div id="min-count" class="count">{{ minutes }}</div>
        <div class="label-time-interval">Minutes</div>
      </div>
      <div class="counter-item">
        <div id="sec-count" class="count">{{ seconds }}</div>
        <div class="label-time-interval">Seconds</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
var moment = require('moment');

export default {
  name: 'CountdownPromo',
  data () {
    return {
      currentUser: {},
      currentUserId: Token.currentUserId(this.$auth),
      dateCreated: Date(),
      showPromo: false,
      hours: 23,
      minutes: 59,
      seconds: 59
    }
  },
  mounted: function () {
    setInterval(() => {
      var now = new moment()
      var promoExpires = new moment(this.currentUser.dateCreated).add(24, 'hours')
      var duration = moment.duration(promoExpires.diff(now))
      this.showPromo = moment().isBefore(promoExpires)
      this.hours = duration.hours()
      this.minutes = duration.minutes()
      this.seconds = duration.seconds()
    }, 1000)
    // fetch current user
    api.fetchCurrentUser(this.currentUserId)
      .then(person => {
        this.currentUser = person
      })
  },
};
</script>

<style scoped>

html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

.body {
  background-color: #1d8ae7;
}

.title-container {
  margin-bottom: 32px;
  color: #fff;
}

.title {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}


.content-container {
  margin-bottom: 0px;
  padding: 32px 32px 8px;
  background-color: #1d8be7;
}

.radio-form-block {
  width: 100%;
  margin-bottom: 32px;
}

.radio-button-field {
  margin-bottom: 8px;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
}

.radio-button-field:active {
  background-color: #fff;
}

.radio-button-field:focus {
  background-color: #fff;
}

.radio-button {
  margin-top: 22px;
}

.radio-button-label {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 6px;
  color: #1d8ae7;
  font-weight: 400;
}

.field-i-agree {
  display: block;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .05);
}

.label-checkbox {
  width: 100%;
  padding: 18px 16px 18px 6px;
  color: #fff;
}

.form-i-agree {
  margin-bottom: 32px;
}

.link {
  color: hsla(0, 0%, 100%, .6);
}

.checkbox-i-agree {
  margin-top: 22px;
}

.promo-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 32px;
  padding: 24px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  border-radius: 4px;
  background-color: #fff;
  background-image: linear-gradient(343deg, #0cba52, rgba(12, 186, 82, .7));
}

.counter {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.counter-item {
  width: 33.33333333%;
}

.count {
  color: #fff;
  font-size: 60px;
  line-height: 68px;
  font-weight: 300;
  text-align: center;
}

.label-time-interval {
  color: #fff;
  font-size: 10px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.counter-title {
  margin-bottom: 8px;
  color: #fff;
  font-size: 25px;
  line-height: 32.5px;
  font-weight: 400;
  text-align: center;
}

.counter-subtitle {
  margin-bottom: 4px;
  color: hsla(0, 0%, 100%, .7);
  line-height: 18.2px;
  text-align: center;
}

.image-free-tag {
  height: 40px;
  margin-bottom: 8px;
}

.text-area-decribe-need {
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.text-area-decribe-need:active {
  background-color: #fff;
}

.text-area-decribe-need:focus {
  background-color: #fff;
}

.text-area-decribe-need::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::placeholder {
  color: rgba(0, 0, 0, .3);
}

.describe-label {
  margin-bottom: 8px;
  color: #fff;
  line-height: 21px;
  text-align: left;
}

.form-describe-need {
  margin-bottom: 24px;
}

@media (max-width: 479px) {
  .title-bar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}


</style>