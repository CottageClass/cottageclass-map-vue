import Vue from 'vue'
import camelcaseKeys from 'camelcase-keys'
import * as Token from './tokens.js'
import normalize from 'json-api-normalizer';

var moment = require('moment');

/*
 * PROXY SESSIONS
 */
export function initProxySession(currentUserId, receiverId, requestMessage, acknowledgmentMessage) {
  console.log("INITIATING PROXY WITH users " + currentUserId + ", " + receiverId)
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

function createPersonObject (personInApi, availableChildren = []) {
  var p = personInApi.attributes
  let hasAllRequiredFields = function () {
    if (p.phone && p.latitude && p.longitude && p.network_code) {
      return true
    } else {
      return false
    }
  }
  let createChildrenList = function () {
    let parseChild = function (child) {
      return {
        age: child.attributes.age
      }
    }
    return availableChildren.filter(child => child.attributes.parent_id == personInApi.id).map(parseChild)
    // make sure this is an array.
  }

  let activities = p.activities || []
  activities = activities.map(activity => activity.replace(/_/g, " "))

  return {
    agreeTos: p.agree_tos,
    id: personInApi.id,
    firstName: p.first_name,
    lastInitial: p.last_name && p.last_name[0],
    avatar: p.avatar,
    activities: activities,
    availableMornings: p.available_mornings,
    availableEvenings: p.available_evenings,
    availableAfternoons: p.available_afternoons,
    availableWeekends: p.available_weekends,
    location: {
      lat: parseFloat(p.fuzzy_latitude),
      lng: parseFloat(p.fuzzy_longitude)
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
    verified: p.verified,
    phone: p.phone,
    networkCode: p.network_code,
    dateCreated: p.date_created,
    hasAllRequiredFields: hasAllRequiredFields(),
    blurb: p.profile_blurb
  }
}

// parses responseData into peopleArray and childrenArray
function createPeopleObject (responseData) {
  let peopleDataArray = responseData.data
  let included = responseData.included || []
  let childrenArray = included.filter(obj => obj.type === "child")
  return peopleDataArray.map(personInApi => createPersonObject(personInApi, childrenArray))
}

export function fetchUsersInNetwork(networkId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/networks/${networkId}/users`
  ).then(res => {
    console.log("FETCH USERS IN NETWORK SUCCESS")
    console.log(res.data)
    return createPeopleObject(res.data)
  }).catch(err => {
    console.log("FETCH USERS IN NETWORK FAILURE")
    console.log(err.errors)
    throw err
  })
}

export function fetchUsersWhoHaveMadeInquiries(currentUserId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users/${currentUserId}/inquiries`
    ).then(res => {
      console.log("FETCH USERS WHO HAVE MADE INQUIRIES SUCCESS")
      console.log(res.data)
          return createPeopleObject(res.data)
        }).catch(err => {
          console.log("FETCH USERS WHO HAVE MADE INQUIRIES FAILURE")
          console.log(err.errors)
          throw err
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
    throw err
  })
}


// same as above but using 'normalize' json normalizer to correctly extract children
export function fetchCurrentUserNew(userId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users/${userId}`
  ).then(res => {
    console.log("FETCH CURRENT USER SUCCESS")
    console.log(res)
    let normalizedData = normalize(res.data)
    let user = normalizedData.user[userId].attributes
    user.hasAllRequiredFields = user.phone && user.latitude && user.longitude && user.networkCode
    let childrenById = normalizedData.child
    let childIds = Object.keys(childrenById)
    let generateChild = function (aChildId) {
      let child = childrenById[aChildId].attributes
      child.id = aChildId
      child.firstName = capitalize(child.firstName)
      return child
    } 
    user.children = childIds.map(generateChild)
    return user
  }).catch(err => {
    console.log("FETCH CURRENT USER FAILURE")
    console.log(err.errors)
    throw err
  })
}

// backend requires user to be an admin
export function fetchAllUsers() {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users`
  ).then(res => {
    console.log("FETCH ALL USERS SUCCESS")
    console.log(createPeopleObject(res.data))
    return createPeopleObject(res.data)
  }).catch(err => {
    console.log("FETCH ALL USERS FAILURE")
    console.log(err.errors)
    throw err
  })
}

/*
 * MESSAGES
 */

function createMessagesObject(msgListFromApi) {
  return msgListFromApi.map(createMessageObject)
}

function createMessageObject(msgFromApi) {
  return {
    id: msgFromApi.id,
    ...camelcaseKeys(msgFromApi.attributes, {deep: true})
  }
}

export function fetchMessagesForUserPair(participantId1, participantId2) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/users/${participantId1}/messages/${participantId2}`
  ).then(res => {
    console.log("FETCH Messages for User Pair SUCCESS")
    console.log(createMessagesObject(res.data.data))
    return createMessagesObject(res.data.data)
  }).catch(err => {
    console.log("FETCH Messages for User Pair FAILURE")
    console.log(err)
    console.log(err.errors)
    throw err
  })
}

/*
 * NOTIFICATIONS
 */

export function submitNotification(participantId, notificationBodyText) {
  let notificationData = {
  'notification': {
    'body': notificationBodyText
  }
}
  return Vue.axios.post(
    `${process.env.BASE_URL_API}/api/users/${participantId}/notifications/`, notificationData
  ).then(res => {
    console.log("NOTIFICATION submission SUCCESS")
    return res
  }).catch(err => {
    console.log("NOTIFICATION submission FAILURE")
    console.log(err)
    throw err
  })
}


/*
 * EVENTS
 */

export function fetchEvents(scopeOrEventId) {
  return Vue.axios.get(
    `${process.env.BASE_URL_API}/api/events/${scopeOrEventId || ''}`
    ).then(res => {
      console.log("FETCH EVENTS SUCCESS")
      console.log(res.data)
      return Object.values(normalize(res.data).event).map(obj => {
      var e = obj.attributes
      e["id"] = obj.id
      e.hostFirstName = capitalize(e.hostFirstName)
      e.hostFuzzyLatitude = parseFloat(e.hostFuzzyLatitude)
      e.hostFuzzyLongitude = parseFloat(e.hostFuzzyLongitude)
      e.activityName = e.activityNames.length > 0 && e.activityNames[0]
      e.food = e.foods.length > 0 && e.foods[0]
      return e
      })
        }).catch(err => {
          console.log("FETCH EVENTS FAILURE")
          console.log(err.errors)
          throw err
        })
}

export function submitEventParticipant(eventId, participantChildIds) {
  let createChild = function (childId) {
    return {
      "child_id": childId
    }
  };
  let participantData = {
    "participant": {
    "participant_children_attributes": participantChildIds.map(createChild)
    }
  }
  return Vue.axios.post(`${process.env.BASE_URL_API}/api/events/${eventId}/participants`, participantData)
        .then(res => {
          console.log('SUBMIT EVENT PARTICIPANT SUCCESS')
          console.log(res)
          return res
        })
        .catch(err => {
          console.log('SUBMIT EVENT PARTICIPANT FAILURE')
          console.log(err)
          console.log(Object.entries(err))
          throw err
        })
}

/*
 * UTILS
 */

export function distanceHaversine(lat1, lon1, lat2, lon2) {
        const unit='N' // always return miles
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist.toFixed(1)
    }
    
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);  
}