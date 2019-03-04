<template>
  <div class="body">
    <MainNav />
    <div class="content-section background-01">
      <div class="divider-2px"></div>
      <h1 class="h1-display">Upcoming Playdates</h1>
        <div class="map-list-container">
          <EventListMap
            class="map"
            :events="events"
          />
          <div class="list-container w-container">
            <EventList
              class="list"
              :events="events"
              :noEventsMessage="noEventsMessage"
            />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import EventList from '@/components/EventList.vue'
import MainNav from '@/components/MainNav.vue'
import Footer from '@/components/Footer.vue'
import EventListMap from '@/components/EventListMap.vue'
import * as api from '@/utils/api.js'
import { mapGetters } from 'vuex'

var moment = require('moment')

export default {
  name: 'Events',
  components: { EventList, MainNav, Footer, EventListMap },
  data () {
    return {
      events: null,
      maximumDistanceFromUserInMiles: '5',
      showAllButtonText: 'Show all playdates',
      showShowAllButton: false,
      noEventsMessage: 'Sorry, there are no upcoming playdates in your area'
    }
  },
  computed: {
    ...mapGetters([
      'distanceFromCurrentUser', 'currentUser', 'isAuthenticated'
    ])
  },
  watch: {
    maximumDistanceFromUserInMiles: function () {
      this.fetchEventsWithinDistance()
    }
  },
  methods: {
    limitNumberOfEvents: function (events) {
      if (this.limitTo) {
        return events.slice(0, parseInt(this.limitTo))
      } else {
        return events
      }
    },
    isToday: function (date) {
      return moment(0, 'HH').diff(date, 'days') === 0
    },
    formatDate: function (date) {
      return moment(date).format('dddd, MMM Do')
    },
    fetchEventsWithinDistance: async function () {
      this.events = await (api.fetchUpcomingEventsWithinDistance(
        this.maximumDistanceFromUserInMiles,
        this.currentUser.latitude,
        this.currentUser.longitude)).slice(20) // limited to 20 until pagination (soon)
    },
    fetchAllUpcomingEvents: async function () {
      const res = (await api.fetchEvents('upcoming', e => e.startsAt)).slice(20)
      this.events = []
      // slice doesn't work here because fetchEvents returns an object
      for (let i = 0; i < 20; i++) {
        this.events.push(res[i])
      }
    }
  },
  mounted: function () {
    if (this.isAuthenticated) {
      this.fetchEventsWithinDistance()
    } else {
      this.fetchAllUpcomingEvents()
    }
  }
}
</script>

<style scoped>
select {
  appearance: menulist;
  --webkit-appearance: menulist;
}

.body {
  all: unset;
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  background-color: #fff;
}

.map-list-container {
  display: flex;
  flex-direction: row-reverse;
}

h1 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 55px;
  line-height: 44px;
  font-weight: 700;
  text-align: center;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 36px;
  font-weight: bold;
}

a {
  color: #000;
  text-decoration: none;
}

.button {
  padding: 12px 32px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
  color: white;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.body {
  overflow: visible;
  background-color: #fff;
  font-family: soleil, sans-serif;
}

.h1-display {
  margin-bottom: 24px;
  line-height: 66px;
}

.content-section {
  display: block;
  margin-top: 0px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
}

.content-section.background-01 {
  background-color: #f6f6f6;
}

.divider-2px {
  width: 100%;
  height: 2px;
  background-color: #f3f3f3;
}

.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.events-list-wrapper {
  width: 100%;
}

.event-date-section-tittle {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 68px;
  margin-bottom: 16px;
  padding: 16px 16px 16px 0px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
}

.date-title {
  font-size: 24px;
  line-height: 28px;
  text-align: center;
}

.bold-text {
  color: #ff6550;
}

.more-link {
  color: #1f88e9;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
}

.body-2 {
  background-color: #f6f6f6;
}

.list-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 32px 32px 112px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.date-text-wrapper {
  padding-left: 16px;
}

.event-date-section-more-events {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  padding: 16px 16px 16px 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
}

.map {
  height: 500px;
    width: 300px;
  background-position: 50% 50%;
  background-size: cover;
}

@media (max-width: 991px) {
  .h1-display {
    font-size: 32px;
    line-height: 42px;
  }

  .list-container {
    padding-bottom: 128px;
  }
}

@media (max-width: 767px) {
  .map-list-container {
    display: flex;
    flex-direction: column;
  }
  .map {
    width: 100%;
  }
  .body {
    padding-bottom: 100px;
  }

  .h1-display {
    font-size: 28px;
    line-height: 34px;
  }

  .date-title {
    font-size: 22px;
    line-height: 26px;
  }
}

@media (max-width: 479px) {
  .body {
    padding-bottom: 110px;
  }

  .event-date-section-tittle {
    margin-top: 52px;
  }

  .date-title {
    font-size: 18px;
    line-height: 24px;
    text-align: left;
  }

  .list-container {
    padding: 0px 16px 64px;
  }
}
</style>
