import Vue from 'vue'
import * as Token from './tokens.js'
var moment = require('moment');

var childrenInNetwork = [] // this should be a local variable in a larger function that combines createperson and create people.

function createPersonObject (personInApi) {
    var p = personInApi.attributes
    let createChildrenList = function () {
      let parseChild = function (child) {
        let childAge = function (birthdayDateTime) {
          return moment().diff(birthdayDateTime, 'years')
        }
        return {
          birthday: moment(child.attributes.birthday).format('l'),
          firstName: child.attributes.first_name,
          age: childAge(child.attributes.birthday)
        }
      }
      return childrenInNetwork.filter(child => child.attributes.parent_id == personInApi.id).map(parseChild)
       // make sure this is an array.
    }
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
      children: createChildrenList(),
      // todo: add these once I have them
      title: "",
      employer: "",
      backgroundCheck: false, // add background check,
      phone: p.phone
    }
  }

function createPeopleObject (data) {
  let peopleDataArray = Object.values(data.data)
  return peopleDataArray.map(createPersonObject)
}

export function fetchUsersInNetwork(networkId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/networks/${networkId}/users`
    ).then(res => {
      console.log("FETCH USERS IN NETWORK SUCCESS")
      console.log(res.data)
          childrenInNetwork = res.data.included.filter(obj => obj.type === "child")
          // set this.people in the function that called us
          return createPeopleObject(res.data)
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