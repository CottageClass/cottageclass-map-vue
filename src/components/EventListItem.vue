<template>
  <router-link :to="{ name: 'EventPage', params: { id: event.id }}">
  <li class="event-list-item">
    <div class="event-list-item-graphic" 
    :style="{ backgroundColor: backgroundColor(index)}">
      <img 
      :src="iconUrl(iconImage(event.activityName))" 
      width="100" 
      height="100" 
      alt="">
    </div>
    <div class="event-list-item-content">
      <a href="event-detail.html" class="link-block-4 w-inline-block">
        <h2 class="event-heading">{{ event.name }}</h2>
      </a>
      <div class="event-summary">
        <div class="event-time">{{ formatTime(event.startsAt) }} – {{ formatTime(event.endsAt) }}</div>
        <!-- <div class="event-location">Park Slope</div> NO NEIGHBORHOOD YET-->
      </div>
      <div class="action-bar">
        <div class="host-info"><AvatarImage className="avatar-small" :person="{facebookId: event.hostFacebookUid, avatar: event.hostAvatar}"/>
          <div class="text-block">Hosted by <a href="#" class="link">{{ event.hostFirstName }}</a></div>
        </div><a href="#" class="button w-button">RSVP</a></div>
      </div>
    </li>
  </router-link>
</template>

<script>
// todo: pass "person" object to AvatarImage

import AvatarImage from './AvatarImage.vue'
var moment = require('moment');

export default {
  name: 'EventListItem',
  props: ['event', 'index'],
  components: { AvatarImage },
  methods: {
    backgroundColor: function (index) {
      let colors = ['#e82d55', '#0cba52', '#aff0fc', '#fd6f77', '#64426b']
      return colors[index % colors.length]
    },
    formatTime: function (time24) {
      return moment(time24).format('LT')
    },
    iconUrl: function (imageName) {
      return require('@/assets/' + imageName)
    },
    iconImage: function (category) {
        switch(category) {
          case 'movie night':
            return 'movie-camera.svg'
          case 'arts & crafts':
            return 'artist-palette.svg'
          case 'board games':
            return 'chess-pawn.svg'
          case 'baking':
            return 'birthday-cake.svg'
          default:
            return 'grinning-face-with-smiling-eyes.svg' // party-popper.svg 
        }
      }
  },
};

</script>

<style scoped>
a {
  text-decoration: none;
}

.avatar-small {
  width: 40px;
  height: 40px;
}
</style>