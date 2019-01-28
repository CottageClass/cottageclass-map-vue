<template>
  <div v-if="userParticipating" class="button w-button user-participating">&check; RSVP REQUESTED</div>
  <div v-else-if="full" class="button w-button full">&check; EVENT IS FULL</div>
  <router-link
  v-else
  :to="{ path: '/event/' + eventId + '/edit' }"
  class="button w-button"
  >EDIT
  </router-link>
</template>

<script>

export default {
  name: 'EditButton',
  props: ['eventId']
}

</script>

<style scoped>

.button {
  padding: 12px 32px;
  border-radius: 4px;
  background-color: #1f87e900;
  text-align: center;
  color: #1f88e9;
  border: 1px solid #1f88e9;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.user-participating {
  background-color: transparent !important;
  color: rgb(12, 186, 82);
}

.full {
  background-color: transparent !important;
  color: #ff672f;
}

@media (max-width: 479px) {
  .button {
    width: 100%;
    margin-top: 20px;
  }
}

</style>
