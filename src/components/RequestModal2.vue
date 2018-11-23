<template>
<div class="body">
<Nav :button="nextButtonState" @next="saveBookingRequestToSpreadsheet" @prev="$router.go(-1)" />
 <RequestCare class="request-container" v-model="bookingRequest" />
</div>
</template>

<script>
import Nav from '@/components/onboarding/Nav.vue'
import RequestCare from '@/components/onboarding/RequestCare.vue'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
import sheetsu from 'sheetsu-node'
import networks from '@/assets/network-info.json'

var moment = require('moment');

// create a config file to identify which spreadsheet we push to.
var client = sheetsu({ address: 'https://sheetsu.com/apis/v1.0su/62cd725d6088' })

export default {
  name: 'RequestModal2',
  components: { RequestCare, Nav },
  data: function () {
    return {
      currentUser: {},
      currentUserId: Token.currentUserId(this.$auth),
      bookingRequest: {
        dateTimeSelected: null,
        description: "",
        err: "skippable",
        showCountdownPromo: false
      }
    }
  },
  mounted: function () {
    // fetch users in network
    api.fetchCurrentUser(this.currentUserId)
      .then(person => {
        this.currentUser = person
      })
  },
  computed: {
    network: function () {
      let networkId = Token.currentUserNetworkCode(this.$auth)
      return this.networks.find(network => network.stub === networkId)
    },
    nextButtonState: function () {
      if (this.bookingRequest.dateTimeSelected == null) {
        return "inactive"
      } else {
        return "next"
      }
    }
  },
  methods: {
    saveBookingRequestToSpreadsheet: function () {
      client.create({
        "User ID": this.currentUserId,
        "Name": this.currentUser.firstName + ' ' + this.currentUser.lastInitial + '.',
        "Phone": this.currentUser.phone,
        "Time submitted": moment(Date()).format("LT"),
        "Date submitted": moment(Date()).format("L"),
        "Date requested": moment(this.bookingRequest.dateTimeSelected).format("L"),
        "Time requested": moment(this.bookingRequest.dateTimeSelected).format("LT"),
        "Request Description": this.bookingRequest.description,
      }, "generalRequests").then((data) => {
        console.log(data)
        alert("Request sent. You'll hear from us shortly!")
        this.$router.push('home')
      }, (err) => {
        console.log(err)
      });
    },
  }
};

</script>

<style scoped>

.body {
  background-color: #1d8be7;
}

.request-container {
  padding-top: 48px;
}
</style>