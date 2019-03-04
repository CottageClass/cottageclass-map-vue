<template>
  <div class="container">
    <p v-if="isAuthenticated">Within
      <select v-model="maximumDistanceFromUserInMiles">
        <option v-for="distance in distanceOptions">{{distance}}</option>
      </select> miles
    </p>
    <div class="map-wrapper" @click="mapClick">
      <GmapMap
      class="google-map"
      ref="mapRef"
      :disableDefaultUI="true"
      :center="{ lat: 40.689587754466, lng: -73.9978254887843 }"
      :zoom="13"
      :options="mapOptions"
      style="width: 100%; height: 100%;">
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import maps from '@/mixins/maps.js'
import screen from '@/mixins/screen.js'

export default {
  name: 'EventListMap',
  props: ['events'],
  mixins: [ maps, screen ],
  data () {
    return {
      map: null
    }
  },
  methods: {
    mapClick () {
      if (this.isMobile) {
        this.$router.push('/events/map')
      }
    }
  },
  computed: {
    distanceOptions: () => [ 1, 2, 5, 10, 20, 50 ],
    mapOptions: function () {
      return {
        'disableDefaultUI': true, // turns off map controls
        'gestureHandling': this.isMobile ? 'none' : 'cooperative' // allow scrolling on desktop but not mobile'
      }
    },
    ...mapGetters([ 'isAuthenticated' ])
  },
  watch: {
    events: async function () {
      this.map = await this.$refs.mapRef.$mapPromise
      this.circles = []
      const that = this
      for (let event of this.events) {
        const circle = that.addCircle(
          { lat: event.hostFuzzyLatitude, lng: event.hostFuzzyLongitude },
          0.2,
          that.map
        )
        if (circle) {
          circle.addListener('click', function () {
            that.$router.push({ name: 'EventPage', params: { id: event.id } })
          })
        }
      }
    }
  },
  mounted: async function () {
  }
}
</script>

<style scoped>
.map-wrapper {
  height: 300px;
  min-width: 100%;
  background-position: 50% 50%;
  background-size: cover;
}
@media (max-width: 991px) {
  .map-wrapper {
    height: 200px;
  }
}
</style>
