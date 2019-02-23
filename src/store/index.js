import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../utils/api'
import moment from 'moment'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    plugins: [createPersistedState()],
    state: {
      eventsByDate: null, // We shouldn't store all events.  It will have to change later
      currentUser: null,
      alert: null,
      createdEvents: null,
      RSVPAttempEventId: null
    },
    mutations: {
      setEventsByDate: (state, payload) => {
        state.eventsByDate = payload.events
      },
      setCurrentUser: (state, payload) => {
        state.currentUser = payload.user
      },
      showAlert: (state, payload) => {
        state.alert = payload.alert
      },
      setRSVPAttemptEventId: (state, payload) => {
        state.RSVPAttempEventId = payload.id
      },
      hideAlert: (state) => {
        state.alert = null
      },
      showAlertOnNextRoute: (state, payload) => {
        state.alert = payload.alert
        state.alert.preshow = true // this indicates that we will show the alert in the next route
      },
      setCreatedEvents: (state, payload) => {
        state.createdEvents = payload.eventData
      }
    },
    actions: {
      //////////////////////////////////////////
      // Once again, we should not be doing this
      //////////////////////////////////////////
      fetchAllEventsAsync: ({ commit }) => {
        api.fetchEvents().then(events => {
          events.sort((eventA, eventB) => {
            return moment(eventA.startsAt).diff(moment(eventB.startsAt))
          })
          commit('setEventsByDate', { events })
        })
      },
      establishCurrentUserAsync: ({ commit }, userId) => {
        console.log('establish')
        if (userId === null) {
          commit('setCurrentUser', { user: null })
        } else {
          return api.fetchCurrentUser(userId).then(user => {
            commit('setCurrentUser', { user })
          })
        }
      },
      newRoute: ({ commit, state }, { to, from, next }) => {
        // this method manages the showing of alerts when you enter a new route
        if (state.alert) {
          if (state.alert.preshow) {
            state.alert.preshow = false
          } else {
            state.alert = null
          }
        }
        next()
      }
    },
    getters: {
      distanceFromCurrentUser: (state) => (lat, lon) => {
        if (state.currentUser) {
          return api.distanceHaversine(lat, lon, state.currentUser.latitude, state.currentUser.longitude)
        } else {
          return null
        }
      },
      currentUser: (state) => {
        return state.currentUser
      },
      isAuthenticated: (state) => {
        return state.currentUser !== null
      },
      alert: state => state.alert,
      firstCreatedEvent: (state, getters) => {
        if (state.createdEvents) {
          return state.createdEvents[0]
        } else {
          return null
        }
      },
      firstCreatedEventId: (state) => {
        if (state.createdEvents) {
          return state.createdEvents[0].id
        } else {
          return null
        }
      },
      rsvpAttemptedId: state => state.RSVPAttempEventId
    }
  }
)
