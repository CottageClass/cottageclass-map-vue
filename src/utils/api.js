import Vue from 'vue'
import * as Token from './tokens.js'
var moment = require('moment');

// TODO: this should be a local variable in a larger function that combines createperson and create people.
var childrenInNetwork = []

/*
 * PROXY SESSIONS
 */
export function initProxySession(currentUserId, receiverId, requestMessage, acknowledgmentMessage) {
  console.log("INITIATING PROXY WITH users " + currentUserId + ", " + receiverId)
  // no postData currently
  let postData = {
    twilioSession: {
      requestMessage: requestMessage,
      acknowledgmentMessage: acknowledgmentMessage,
    }
  }
  return Vue.axios.post(
    `${process.env.BASE_URL_API}/users/${receiverId}/proxy_sessions`,
    postData,
  ).then(res => {
    console.log("proxy session init SUCCESS, returning proxy phone number for receiver")
    console.log(res)
    // return proxy number for receiver
    return res.data.data.attributes.proxyIdentifierReceiver
  }).catch(err => {
    console.log("proxy session init FAILURE")
    console.log(err)
    throw err
  })
}

/*
 * USERS
 */

function createPersonObject (personInApi) {
  var p = personInApi.attributes
  let hasAllRequiredFields = function () {
    if (p.phone && p.facebook_id && p.latitude && p.longitude && p.network_code) {
      return true
    } else {
      return false
    }
  }
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
    agreeTos: p.agree_tos,
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
    phone: p.phone,
    networkCode: p.network_code,
    dateCreated: p.date_created,
    hasAllRequiredFields: hasAllRequiredFields(),
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
  }).catch(err => {
    console.log("FETCH USERS IN NETWORK FAILURE")
    console.log(err.errors)
  })
}

export function fetchUsersWhoHaveMadeInquiries(currentUserId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users/${currentUserId}/inquiries`
    ).then(res => {
      console.log("FETCH USERS WHO HAVE MADE INQUIRIES SUCCESS")
      console.log(res.data)
          childrenInNetwork = res.data.included.filter(obj => obj.type === "child")
          // set this.people in the function that called us
          return createPeopleObject(res.data)
        }).catch(err => {
          console.log("FETCH USERS WHO HAVE MADE INQUIRIES FAILURE")
          console.log(err.errors)
        })
}

export function fetchCurrentUser(userId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users/${userId}`
  ).then(res => {
    console.log("FETCH CURRENT USER SUCCESS")
    console.log(createPersonObject(res.data.data))
    return createPersonObject(res.data.data)
  }).catch(err => {
    console.log("FETCH CURRENT USER FAILURE")
    console.log(err.errors)
  })
}
