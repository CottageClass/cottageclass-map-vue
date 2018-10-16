<template>

<!-- the modal, if it displays --> 

<div v-else>
<!-- the map! -->
  <div class="map-container">
  <GmapMap
    :disableDefaultUI="true"
    :center="network.location"
    :zoom="network.zoom"
    :options="mapOptions"
    style="width: 100%; height: 230px;">
      <GmapMarker
      :key="index"
      v-for="(person, index) in peopleAvailable"
      :position="person.location"
      :title="person.name"
      :icon="require(`@/assets/small-avatars/${person.pic}`)"
      @click="$router.push({name: 'ProviderProfile', params: { id: person.id }})"
      />
    </GmapMap>
  </div>

<!-- calendar or "bookings / provider" button -->

<router-link :to="{ name: 'Bookings' }"><div class="calendar-button-2"><img src="../assets/calendar-check.svg" class="calendar-button-2-image"></div></router-link>

<!-- <div class="calendar-button-2"><img src="images/calendar-check.svg" class="calendar-button-2-image"></div> -->


<!-- availability --> 

    <div class="availability-container-v2">
      <h1 class="landing-page-v2-h1">When do you need childcare?</h1>
      <label class="lpv2-choose-time-button w-inline-block">
        <div class="div-block-8"><img src="../assets/time-outline-blue.svg" width="15" height="15" alt="">
          <div class="lpv2-choose-time-button-text">{{ timePlaceholder }}</div><input type="datetime-local" v-model="dateTimeSelected" />
        </div><img src="../assets/Dropdown-Arrows.svg" alt=""></label>
    </div>

  <!-- the list --> 
  <div class="list-container">
    <div class="group-title-container">
      <h5 class="heading-2">{{ providersSectionTitle }}</h5>
    </div>
     <Provider v-for="person in peopleAvailable" :person="person" :key="person.id"></Provider>
  </div>
<!-- share button -->
<ShareButton/>
  <br><br>
      <h5 class="heading-2">Map data &#169; 2018 Google (<a href="https://www.google.com/intl/en-US_US/help/terms_maps.html">terms of use</a> - <a href="https://www.google.com/maps/@40.6782,-73.9442,12z/data=!10m2!1e3!2e10!12b1?rapsrc=apiv3">report a map error</a>)</h5>
  </div>
</template>

<script>
import Provider from './Provider.vue'
import RequestModal from './RequestModal.vue'
import people from '../assets/people.json'
import router from '../router'
import ShareButton from './ShareButton.vue'
import networks from '../assets/network-info.json'
var moment = require('moment');

export default {
        name: 'MainView',
        components: { Provider, RequestModal, ShareButton },
        data () { 
          return {
          dateTimeSelected: null,  
          people: people, // to bring from import into vue model
          networks: networks, // to bring from import into vue model
          selectedPerson: null,
          mapOptions: { // move this to map component when i separate it.
            "disableDefaultUI": true, // turns off map controls
            "gestureHandling": "greedy", // allows one finger pan.
          }
// these items are for the modal
          }
        },
        watch: {
          dateTimeSelected: function () {
            window.scrollTo({
              top: 367,
              behavior: "smooth"
            });
          } 
        },
        computed: {
          providersSectionTitle: function () {
            if (!this.dateTimeSelected) {
              return "Providers in \"" + this.network.name + "\""
            } else {
              var aMoment = moment(this.dateTimeSelected)
              var day = aMoment.format("dddd")
              var time = aMoment.format("h:mm a")
              return "The following providers in \"" + this.network.name + "\" are typically available at " + time + " on " + day + "s."
            }
          },
          timePlaceholder: function () {
            if (!this.dateTimeSelected) {
              return "Choose a time"
            } else {
              return moment(this.dateTimeSelected).format("dddd, h:mm a")
            }
          },
          timeSlot: function () {
              var dt = moment(this.dateTimeSelected)
              var hour = dt.hour()
              var day = dt.day()
              if (day == 0 || day == 6) {
                return "weekends"
              } else {
                if (hour < 15 && hour >= 7) {
                  return "7to3"
                } else if (hour < 19 && hour >= 14) {
                  return "3to7"
                } else if (hour >= 19) {
                  return "after7" 
              } else {
                return false
              }
            }
          },
          network: function () {
           return this.networks.find(network => network.stub === this.$route.params.networkId)
         },
          peopleInNetwork: function () {
            return this.people.filter(person => (person.networks && person.networks.includes(this.$route.params.networkId)))
          },
          peopleAvailable: function () {
            if (!this.timeSlot) {
                return this.peopleInNetwork
                } else {
                  return this.peopleInNetwork.filter(person => (person.availability.includes(this.timeSlot)))
                }
          },
          decodeLatLong: function () {
                let geocoder = new google.maps.Geocoder();
                let theLocation = this.location;
                let latLong = this.latLong;
                return new Promise(function (resolve, reject) {
                    geocoder.geocode({'address': theLocation}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            latLong.latitude = results[0].geometry.location.lat();
                            latLong.longitude = results[0].geometry.location.lng();
                        } else {
                            reject(status);
                        }
                    });
                });
            }
        },
      };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

input {
  font-size: 1px; 
  opacity: 0;
}

.calendar-button-2 {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 56px;
  height: 56px;
  clear: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: #1c8fe5;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

#clock-button {
  position: absolute;
  top: 170px;
  right: 36px;
  z-index: 8;
  filter: drop-shadow(2px 2px 2px #888);
}

select {
  color: #2b8eea;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  outline: none;
  background-color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  border: none;
  overflow: hidden;
  white-space: nowrap;
  background-color: transparent;
  height: 30px;
  z-index: 1; 
  margin-left: auto;
  margin-right: 2px;
  text-transform: uppercase;
}

#time-selected {
  position: absolute;
  top: 190px;
  right: 15px;
  z-index: 8;
  margin-top: -4px;
  color: #1f88e9;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
}

/* Availability container pull this out to component */

.landing-page-v2-h1 {
  margin-top: 0px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
}

.lpv2-choose-time-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .2);
}

.lpv2-choose-time-button-text {
  margin-right: 16px;
  margin-left: 16px;
  color: #1c8fe5;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.div-block-8 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.availability-container-v2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 24px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  text-align: left;
}

@media (max-width: 479px){
  .lpv2-choose-time-button {
    min-width: 100%;
  }
}

h5.heading-2-strong {
margin-top: 0px;
margin-bottom: 0px;
color: rgba(0, 0, 0, .5);
font-size: 13px;
font-weight: 700;
text-align: center;
}

.time-block {
  color: #2b8eea;
  font-size: 16px;
}

.dropdown-arrows img {
}

.availability-container a {
  text-decoration: none;
}
</style>
