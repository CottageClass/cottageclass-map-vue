import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      eventsByDate: null,  // We shouldn't store all events.  It will have to change later
      currentUser: null,
      isAuthenticated: false
    },
    mutations: {
      setEventsByDate: (state, payload) => {
        state.eventsByDate = payload.eventsByDate
      },
      setCurrentUser: (state, payload) => {
        state.currentUser = payload.user
      }
    },
    actions: {
      updateAllEventsAsync: ({ commit }) => {
        api.fetchEvents({}).then(events => {
          commit('setEventsByDate', { events })
        })
      }
    },
    getters: {
      getEventsForUser: (state) => (userId) => {
        return state.eventsByDate.filter(event => this.currentUserId === event.hostId)
      },
      getEventsWithinDistance: (state) => (event) => {
        return this.eventsByDate.filter(event => this.distanceFromCurrentUser(event.hostFuzzyLatitude, event.hostFuzzyLongitude) <= parseFloat(this.maximumDistanceFromUserInMiles))
      },
      getDistanceFromCurrentUser: (state) => (lat, lon) => {
        if (state.currentUser) {
          return api.distanceHaversine(lat, lon, state.currentUser.latitude, state.currentUser.longitude)
        } else {
          return null
        }
      }
    }
  }
)
