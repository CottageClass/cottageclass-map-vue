<template>
  <div class="container">
    <p v-if="showSelector" class="distance-selector">Within
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
import maps from '@/mixins/maps'
import screen from '@/mixins/screen'

const DISTANCE_OPTIONS = [ 1, 2, 5, 10, 20, 50 ]

export default {
  name: 'EventListMap',
  props: ['events', 'center'],
  mixins: [ maps, screen ],
  data () {
    return {
      map: null,
      maximumDistanceFromUserInMiles: DISTANCE_OPTIONS[2],
      circles: []
    }
  },
  methods: {
    mapClick () {
      if (this.isMobile) {
        this.$router.push('/events/map')
      }
    },
    updateEvents: async function () {
      this.map = await this.$refs.mapRef.$mapPromise

      // clear existing markers
      // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
      for (let circle of this.circles) {
        circle.setMap(null)
      }
      this.circles = []

      const that = this
      for (let event of this.events) {
        const circle = that.addCircle(
          { lat: event.hostFuzzyLatitude, lng: event.hostFuzzyLongitude },
          0.2,
          that.map
        )
        if (circle) {
          that.circles.push(circle)
          circle.addListener('click', function () {
            that.$router.push({ name: 'EventPage', params: { id: event.id } })
          })
        }
      }
    },
    setZoomLevelForMaxDistance: async function () {
      const minDim = Math.min(this.$refs.mapRef.$el.clientHeight, this.$refs.mapRef.$el.clientWidth)
      const pixelRadius = minDim / 2
      const map = await this.$refs.mapRef.$mapPromise
      const desiredMetersPerPixel = this.maximumDistanceFromUserInMiles * 1609.34 / pixelRadius
      let zoom = Math.floor(this.zoomLevelForScale(desiredMetersPerPixel, map))
      zoom = Math.min(Math.max(zoom, 0), 20) // ensure it's in the range of acceptable zooms
      map.setZoom(zoom)
    }
  },
  computed: {
    centerLatLng: function () {
      return this.latlng(this.center.lat, this.center.lng)
    },
    distanceOptions: () => DISTANCE_OPTIONS,
    mapOptions: function () {
      return {
        'disableDefaultUI': true, // turns off map controls
        'gestureHandling': this.isMobile ? 'none' : 'cooperative' // allow scrolling on desktop but not mobile'
      }
    },
    showSelector: function () {
      return this.$router.currentRoute.name === 'Events' && !this.isMobile
    }
  },
  watch: {
    events: function () {
      this.updateEvents()
    },
    maximumDistanceFromUserInMiles: async function () {
      const map = await this.$refs.mapRef.$mapPromise
      this.setZoomLevelForMaxDistance()
      this.$emit('maxDistanceSet', { center: map.center, miles: this.maximumDistanceFromUserInMiles })
    }
  },
  mounted: async function () {
    const map = await this.$refs.mapRef.$mapPromise
    if (this.events && this.events.length) {
      // draw in events if they are already loaded
      this.updateEvents()
    } else {
      map.setCenter(this.centerLatLng)
    }
    this.setZoomLevelForMaxDistance()
  }
}
</script>

<style scoped>
.distance-selector {
  text-align: center;
  margin: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
}
.map-wrapper {
  height: 412px;
  min-width: 100%;
  background-position: 50% 50%;
  background-size: cover;
}
@media (max-width: 991px) {
  .map-wrapper {
    height: 100%;
  }
}
</style>
