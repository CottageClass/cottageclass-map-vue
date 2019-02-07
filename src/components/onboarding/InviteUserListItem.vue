<template>
  <span class="body">
    <div class="invite-user-list-item-container">
      <div class="invite-user-top-row">
        <div class="avatar-name-container">
          <AvatarImage :person="person" class="invite-user-avatar" />
          <div class="list-item-3-heading">
            <h5 class="heading">{{ person.firstName }} {{ person.lastInitial }}.</h5>
          </div>
        </div>
        <div
          class="invite-button"
          :class="{'invite-button-complete': inviteComplete, 'invite-button-ready': !inviteComplete}"
          @click="sendInvite">
          {{ inviteComplete ? 'Invited' : 'Invite' }}
        </div>
      </div>

    </div>
  </span>
</template>

<script>
import AvatarImage from '@/components/base/AvatarImage.vue'
import * as api from '@/utils/api'
import { mapGetters } from 'vuex'

export default {
  name: 'InviteUserListItem',
  data () {
    return {
      inviteComplete: false
    }
  },
  props: ['person', 'eventId'],
  components: { AvatarImage },
  methods: {
    sendInvite: function () {
      if (this.inviteComplete) return
      api.initProxySession(
        this.currentUser.id,
        this.person.id,
        this.messageForProvider,
        this.acknowledgmentMessage
      ).then(res => {
        this.setButtonToInvited()
      }).catch(err => {
        console.log(err)
      })
    },
    setButtonToInvited: function () {
      this.inviteComplete = true
    }
  },
  computed: {
    messageForProvider: function () {
      return `Hi ${this.inviteeFirstName}, ${this.hostFirstName} just joined and invited you to their first playdate. Are you interested? ${this.eventLink}`
    },
    inviteeFirstName: function () {
      return this.person.firstName
    },
    hostFirstName: function () {
      return this.currentUser.firstName
    },
    eventLink: function () {
      return `https://www.kidsclub.io/event/${this.eventId}`
    },
    ...mapGetters(['currentUser'])
  }
}
</script>

<style>
.invite-user-top-row {
  display: flex
}
.invite-user-avatar {
  width: 200px;
  height: 200px;
}
.invite-user-list-item-container {
  background-color: #7ab9ec;
  margin-bottom: 15px;
}
.invite-button {
  padding: 12px 32px;
  border-radius: 4px;
  text-align: center;
  width: 100px;
  align-self: flex-start;
  margin-top: 50px;
  margin-right: 20px;
  color: #fff;
}
.invite-button-complete {
  background-color: #c2cdd6;
}
.invite-button-ready {
  background-color: #1f88e9;
  cursor: pointer;
}
.invite-button-ready:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}
.invite-button-ready:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}
</style>
