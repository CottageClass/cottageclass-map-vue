// A handy place to store utility functions for any page with a map
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  computed: {
    google: VueGoogleMaps.gmapApi,
    circlePath () {
      return function (center, radius, numPoints) {
        numPoints = numPoints || 40
        const d2r = Math.PI / 180
        const circleLatLngs = []
        const circleLat = radius * 0.014483
        const circleLng = circleLat / Math.cos(center.lat * d2r)
        for (var i = 0; i < numPoints + 1; i++) {
          var theta = Math.PI * (i / (numPoints / 2))
          var vertexLat = center.lat + (circleLat * Math.sin(theta))
          var vertexLng = center.lng + (circleLng * Math.cos(theta))
          var vertextLatLng = new this.google.maps.LatLng(vertexLat, vertexLng)
          circleLatLngs.push(vertextLatLng)
        }
        return circleLatLngs
      }
    }
  },
  methods: {
    addCircle (center, radius, map) {
      return new this.google.maps.Polygon({
        paths: this.circlePath(center, radius),
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map
      })
    }
  }
}
