import Vue from 'vue'
import * as Token from './tokens.js'

function createPersonObject (personInApi) {
    var p = personInApi.attributes
    return {
      id: personInApi.id,
      firstName: p.first_name,
      lastInitial: p.last_name[0],
      activities: p.activities.map(activity => activity.replace(/_/g, " ")),
      availableMornings: p.available_mornings,
      availableEvenings: p.available_evenings,
      availableAfternoons: p.available_afternoons,
      availableWeekends: p.available_weekends,
      location: {
        lat: parseFloat(p.latitude),
        lng: parseFloat(p.longitude)
      },
      // todo: add these once API has them
      title: "",
      employer: "",
      backgroundCheck: false,
      facebookId: p.facebook_id,
      facebookMapIcon: 'https://graph.facebook.com/' + p.facebook_id + '/picture?width=30',
      // todo: add children now somehow 
      children: [],
      // todo: add these once I have them
      title: "",
      employer: "",
      backgroundCheck: false, // add background check
    }
  }

function createPeopleObject (data) {
  let peopleDataArray = Object.values(data.data)
  return peopleDataArray.map(createPersonObject)
}

export function fetchUsersInNetwork() {
  let networkId = Token.currentUserNetworkCode(this.$auth)
  return this.axios.get(
    `${process.env.BASE_URL_API}/networks/${networkId}/users`
    ).then(res => {
      console.log("FETCH USERS IN NETWORK SUCCESS")
      console.log(res.data)
          // return data to next promise in the chain
          this.people = createPeopleObject(res.data)
          return res.data
        }) /* .catch(err => {
          console.log("FETCH USERS IN NETWORK FAILURE")
          console.log(err.errors)
        })*/
}

export function fetchUser(userId) {
  return {
    id: userId
  }
}

export function fetchNetworkInfo(vueAuth) {
  return {

  }
}