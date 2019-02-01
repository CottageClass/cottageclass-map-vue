import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../utils/api'
import moment from 'moment'
import createPersistedState from 'vuex-persistedstate'
import * as Token from '@/utils/tokens.js'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    plugins: [createPersistedState()],
    state: {
      eventsByDate: null, // We shouldn't store all events.  It will have to change later
      currentUser: null,
      alert: null,
      auth: null
    },
    mutations: {
      setEventsByDate: (state, payload) => {
        state.eventsByDate = payload.events
      },
      setCurrentUser: (state, payload) => {
        state.currentUser = payload.user
      },
      setAlert: (state, payload) => {
        state.alert = payload.alert
        state.alert.preshow = true // this indicates that we will show the alert in the next route
      },
      setAuth: (state, payload) => {
        state.auth = payload.auth
      }
    },
    actions: {
      // ////////////////////////////////////////
      // Once again, we should not be doing this
      // ////////////////////////////////////////
      fetchAllEventsAsync: ({ commit }) => {
        api.fetchEvents().then(events => {
          events.sort((eventA, eventB) => {
            return moment(eventA.startsAt).diff(moment(eventB.startsAt))
          })
          commit('setEventsByDate', { events })
        })
      },
      logoutCurrentUserAsync: ({ commit, state }) => {
        return state.auth.logout().then(res => {
          commit('setCurrentUser', { user: null })
        }).catch(err => {
          console.log(err)
          throw err
        })
      },
      establishCurrentUser: ({ commit, state }) => {
        // set up state based on the userId in the auth object
        const userId = Token.currentUserId(state.auth)
        if (userId === null) {
          // clear out the user
          state.auth.logout().then(res => {
            commit('setCurrentUser', { user: null })
          }).catch(err => {
            console.log(err)
            throw err
          })
        } else {
          // fetch user data
          // In the event that user data has changed on the server, this will update it
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
      auth: state => state.auth
    }
  }
)
