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
          :icon="facebookMapIcon(person.fbid)"
          @click="$router.push({name: 'ProviderProfile', params: { id: person.id }})"
        />
      </GmapMap>
    </div>

    <!-- calendar or "bookings / provider" button -->

    <router-link :to="{ name: 'Bookings' }"><div class="calendar-button-2"><img src="../assets/calendar-check.svg" class="calendar-button-2-image"></div></router-link>

    <!-- <div class="calendar-button-2"><img src="images/calendar-check.svg" class="calendar-button-2-image"></div> -->


    <!-- availability -->

    <div class="availability-container">
      <h5 class="heading-2-strong">See who&#x27;s available:</h5>
      <select v-model="timeSelected">
        <option value="now">Right now</option>
        <option value="7to3">7AM &ndash; 3PM</option>
        <option value="3to7">3PM &ndash; 7PM</option>
        <option value="after7">After 7PM</option>
        <option value="weekends">Weekends</option>
    </select><img src="../assets/Dropdown-Arrows.svg" class="dropdown-arrows"></a>
  </div>

  <!-- the list -->
  <div class="list-container">
    <div class="group-title-container">
      <h5 class="heading-2">Providers in &ldquo;{{ network.name }}&rdquo;</h5>
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
import * as Token from '@/utils/tokens.js'
// todo: use the token so that people get redirected to login screen if not logged in. either here or in vue router.

export default {
  name: 'MainView',
  components: { Provider, RequestModal, ShareButton },
  data () {
    return {
      timeSelected: "now", // or "7to3", "3to7", "after7", "weekends"
      people: [], // gets updated on mount by fetchUsersInNetwork
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
  mounted: function () {
    this.fetchUsersInNetwork()
      .then(res => {
        this.people = res.data
      })
  },
  methods: {
    facebookMapIcon: function (fbid) {
      return "https://graph.facebook.com/" + fbid + "/picture?width=30"
    },
    fetchUsersInNetwork: function () {
      let networkId = "demo" // todo: change this to be the user's own network 
      return this.axios.get(
        `${process.env.BASE_URL_API}/networks/${networkId}/users`
      ).then(res => {
        console.log("FETCH USERS IN NETWORK SUCCESS")
        console.log(res.data)
        // return data to next promise in the chain
        return res.data
      }).catch(err => {
        console.log("FETCH USERS IN NETWORK FAILURE")
        console.log(err.errors)
      })
    },
    // todo: update this so that it's the user's own network
    currentNetwork: function () {
      return this.networks.find(network => network.stub === this.$route.params.networkId)
    },
  },
  computed: {
    network: function () {
      return this.currentNetwork()
    },
    // todo: remove this because it's not necessary since this happens at the API level now
    peopleInNetwork: function () {
      return this.people.filter(person => (person.networks && person.networks.includes(this.$route.params.networkId)))
    },
    peopleAvailable: function () {
      let timeShown = function (time) {
        if (time != "now") return time
        else {// calculate what timeSlot is "now" and return that.
          var now = new Date()
          var day = now.getDay()
          if (day == 6 || day == 0) {
            return "weekends"
          } else {
            var hour = now.getHours()
            if (hour < 15 && hour >= 7) return "7to3"
            else if (hour < 19 && hour >= 14) return "3to7"
            else return "after7" 
          }
        }
      }
      return this.peopleInNetwork.filter(person => (!person.availability.includes("never")) && person.availability.includes(timeShown(this.timeSelected))) // availability can be "never" and we don't want to show people who say "never". 
    },
    // where is this getting used?? todo: remove
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

  label {
    position: relative;
    border: 1.5px solid #1f88e9;
    display: block;
    background-color: white;
    padding-left: 10px;
    border-radius: 5px;
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

  .availability-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 60px;
    padding-right: 16px;
    padding-left: 16px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    background-color: #fff;
    text-align: left;
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
