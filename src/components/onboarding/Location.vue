<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your home address?</h1>
      <p class="onb-paragraph-subheading-2">Please enter your address so we can list your activity &amp; find activities near you.</p>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">

        <vue-google-autocomplete
            ref="address"
            id="map"
            classname="email-form-2 w-form location-text-field w-input"
            placeholder="e.g. 10 Main St. Anytown, NY"
            v-on:placechanged="getAddressData"
            country="us"
        >
        </vue-google-autocomplete>

      </div>
    </div>
    <p class="onb-paragraph-small-50">Only members who RSVP to your event will see your address. Non-members will see an approximate location within a few blocks.</p>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: "Location",
  data () {
  	return {
  		textEntered: ""
  	}
  },
  components: { VueGoogleAutocomplete },
  mounted: function () {
  		this.$emit('input', {
  			err: 'Please enter your street address.'
  		})
  	},
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
         this.address = addressData
         this.$emit('input', {
      	   fullAddress: this.address,
      	   lat: this.address.latitude,
      	   lng: this.address.longitude,
      	   error: false
        })
     }
 }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';
</style>