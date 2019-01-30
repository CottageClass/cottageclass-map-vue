import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../utils/api'
import moment from 'moment'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    plugins: [createPersistedState()],
    state: {
      eventsByDate: null, // We shouldn't store all events.  It will have to change later
      currentUser: null
    },
    mutations: {
      setEventsByDate: (state, payload) => {
        state.eventsByDate = payload.events
      },
      setCurrentUser: (state, payload) => {
        state.currentUser = payload.user
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
      }
    }
  }
)