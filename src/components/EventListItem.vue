<template>
  <router-link :to="{ name: 'EventPage', params: { id: event.id }}">
  <li class="event-list-item">
    <div class="event-list-item-graphic" 
    :style="{ backgroundColor: backgroundColor(index)}">
      <img 
      :src="iconUrl(iconImage(event.activityCategory))" 
      width="100" 
      height="100" 
      alt="">
    </div>
    <div class="event-list-item-content">
      <a href="event-detail.html" class="link-block-4 w-inline-block">
        <h2 class="event-heading">{{ event.title }}</h2>
      </a>
      <div class="event-summary">
        <div class="event-time">{{ formatTime(event.startTime) }} – {{ formatTime(event.endTime) }}</div>
        <!-- <div class="event-location">Park Slope</div> NO NEIGHBORHOOD YET-->
      </div>
      <div class="action-bar">
        <div class="host-info"><img src="@/assets/avatar-placeholder.png" width="40" height="40" alt="" class="avatar-small">
          <div class="text-block">Hosted by <a href="#" class="link">{{ event.hostFirstName }}</a></div>
        </div><a href="#" class="button w-button">RSVP</a></div>
      </div>
    </li>
  </router-link>
</template>

<script>

export default {
  name: 'EventListItem',
  props: ['event', 'index'],
  methods: {
    backgroundColor: function (index) {
      let colors = ['#e82d55', '#0cba52', '#aff0fc', '#fd6f77', '#64426b']
      return colors[index % colors.length]
    },
    formatTime: function (time24) {
      return time24
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
            return 'birthday-cake.svg'
        }
      }
  },
};

</script>

<style scoped>
a {
  text-decoration: none;
}
</style>