<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your home address?</h1>
      <p class="onb-paragraph-subheading-2">Please enter your address so we can list your playdate &amp; find playdates near you. Only your guests will see this.*</p>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">

        <vue-google-autocomplete
            ref="address"
            id="map"
            classname="email-form-2 w-form location-text-field w-input"
            placeholder="Street address (not apt #)"
            v-on:placechanged="getAddressData"
            country="us"
        >
        </vue-google-autocomplete>

      </div>

        <form id="email-form-2" v-on:submit.prevent>
        <input 
          v-if="showApartmentField"
          @keyup.enter="$emit('pressedEnter')"
          name="apartmentNumber"
          v-model="apartmentNumber"
          placeholder="Apartment #"
          class="location-text-field w-input"
        ></form>
    </div>
    <a v-if="!showApartmentField" @click="toggleApartmentField" class="onb-button-add-group w-inline-block"><img src="@/assets/add.svg" alt="" class="image-7"><div class="onb-button-add-group-text">Add apartment #</div></a>
    <p class="onb-paragraph-small-50">* Members who RSVP to your playdate will see your address. Non-members will see an approximate location within a few blocks.</p>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
  name: "Location",
  data () {
  	return {
  		textEntered: '',
      showApartmentField: false,
      apartmentNumber: '',
      address: {}
  	}
  },
  components: { VueGoogleAutocomplete },
  mounted: function () {
  		this.$emit('input', {
  			err: 'Please enter your street address.'
  		})
  	},
  methods: {
    toggleApartmentField: function () {
      this.showApartmentField = true
    },
    getAddressData: function(addressData, placeResultData, id) {
      let placeResultObject = {};
      placeResultData.address_components.forEach(e =>
        e.types.forEach(type => (placeResultObject[type] = e.long_name))
      );
      this.address = { ...addressData, ...placeResultObject };
      this.emitAddress()
    },
    emitAddress: function () {
      this.$emit('input', {
        fullAddress: this.address,
        lat: this.address.latitude,
        lng: this.address.longitude,
        apartmentNumber: this.apartmentNumber,
        error: false
      });
    }
  },
  watch: {
    apartmentNumber: function () {
      this.emitAddress()
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';
</style>
