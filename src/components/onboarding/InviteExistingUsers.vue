<template>
<OnboardingStyleWrapper styleIs="onboarding">
  <div class="onb-body">
    <div class="body">
      <div class="content-wrapper">
        <Nav button="done" @next="$router.push({ name: 'Home' })" @prev="$emit('prev')" />
        <div class="onb-content-container">
          <div class="onb-top-content-container">
            <h1 class="onb-heading-large">Build your village</h1>
            <p class="onb-paragraph-subheading-2">
              Invite some KidsClub members to your upcoming event.  Here are
              some parents near you that might be interested.
            </p>
          </div>
          <div class="onb-copy-link-container">
            <div class="onb-copy-link-form-block w-form">
              <div class="list-container full-width">
                <InviteUserListItem v-for="person in users"
                :eventId="firstEventId"
                :person="person"
                :key="person.id"
                :v-on:inviteClicked="inviteClicked"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</OnboardingStyleWrapper>
</template>

<script>
import Nav from '@/components/onboarding/Nav.vue'
import * as api from '@/utils/api.js'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import InviteUserListItem from '@/components/onboarding/InviteUserListItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'InviteExistingUsers',
  components: { Nav, OnboardingStyleWrapper, InviteUserListItem },
  props: [ 'eventData' ],
  data () {
    return {
      users: null
    }
  },
  methods: {
    inviteClicked: function (userId) {
      console.log(userId)
    }
  },
  mounted: function () {
    const currentUser = this.currentUser
    api.fetchUsersWithinDistance(20, currentUser.latitude, currentUser.longitude).then(res => {
      if (res.length > 0) {
        this.users = res.filter(person => parseInt(person.id) !== currentUser.id)
      } else {
        // there are no users within 20 miles so we return to home
        this.$router.push({ name: 'Home' })
      }
    }).catch(err => console.log(err))
  },
  computed: {
    firstEventId: function () {
      return Object.keys(this.eventData.event).sort()[0]
    },
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>

.full-width {
  width:100%;
}

.onb-content-container {
  font-family: soleil;
}

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
  margin-top: 24px;
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
