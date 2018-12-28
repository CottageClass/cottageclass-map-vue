<template>
	<div class="body">
  <div class="content-section background-01">
    <div class="divider-2px"></div>
    <div class="content-container-4 w-container">
     <h1 class="h1-display">Upcoming Events</h1>
     <div class="events-list-wrapper">
      <div 
      v-for="(event, index) in eventsByDate">
        <div 
        v-if="index === 0 || (formatDate(event.startsAt) != formatDate(eventsByDate[index - 1]).startsAt)" class="event-date-section-tittle">
          <div class="date-title">
            <span v-if="isToday(event.startsAt)">
              <strong class="bold-text">Today</strong>,
            </span> 
          {{ formatDate(event.startsAt) }}</div>
        </div>
        <ul class="unordered-list-events">
        	<EventListItem 
        	:event="event"
        	:index="index"
          :key="index"
          />
        </ul>
<!--        <div class="event-date-section-tittle"><a href="events.html" class="more-link">All Events</a></div> -->
      </div>
    </div>
    </div>
  </div>
 
  </div>
</template>

<script>
import EventListItem from '@/components/EventListItem.vue'
import * as api from '@/utils/api.js'
var moment = require('moment');

// todo:
// work on event page until it's complete for one event, so I get all the data I need
// try to get as far as possible without transforming the data in any way? or possibly go through each one by one as before.
// change logic for "is today"
// sort events by date so that current date display logic will work

export default {
  name: 'Events',
  components: { EventListItem },
  data () {
  	return {
  	  events: null,
  	}
  },
  computed: {
    eventsByDate: function () {
      if (this.events) {
        return this.events.sort((eventA, eventB) => {
          return moment(eventA.startsAt).diff(moment(eventB.startsAt))
        })
      }
    }
  },
  methods: {
    isToday: function (date) {
      return moment(0,"HH").diff(date, "days") == 0;
    },
    formatDate: function (date) {
      return moment(date).format('dddd, MMM Do' )
    }
  },
  mounted: function () {
    // fetch events from API
    api.fetchUpcomingEvents().then(
      (res) => { 
        this.events = res
      })
  }
};
</script>

<style>

body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

h1 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 55px;
  line-height: 44px;
  font-weight: 700;
  text-align: center;
}

.body {
  background-color: #fff;
  font-family: soleil, sans-serif;
}

.nav-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
}

.chat-action-container {
  margin-left: 12px;
}

.button-nav {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #ff6550;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  font-size: 0.89rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.button-nav:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .06)), to(rgba(0, 0, 0, .06)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .06), rgba(0, 0, 0, .06));
}

.nav-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 0px 32px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.tag-container-desktop {
  padding-top: 0px;
}

.nav-links {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 0px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.nav-link {
  display: block;
  padding: 16px 10px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.89rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.nav-link:hover {
  color: #7e7e7e;
}

.nav-tag {
  padding-top: 2px;
  color: #a6a6a6;
  font-size: 0.8rem;
}

.image-2 {
  margin-right: 17px;
  float: left;
  opacity: 0.8;
}

.nav-section {
  position: static;
  top: 0px;
  width: 100%;
  background-color: #fff;
}

.nav-flex-space {
  height: 8px;
  min-height: 16px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.brand {
  width: 168px;
  margin-right: 12px;
  padding-left: 0px;
}

.div-block-32 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.hero-section {
  margin-top: 0px;
  padding-top: 0px;
  background-image: url('../assets/hero-3---r.svg'), url('../assets/hero-4---l.svg');
  background-position: 111% 50%, -125px 50%;
  background-size: 240px, 240px;
  background-repeat: no-repeat, no-repeat;
}

.hero-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.h1-display {
  margin-bottom: 24px;
  line-height: 66px;
}

.hero-subtitle {
  margin-bottom: 32px;
  font-size: 19px;
  line-height: 26px;
  text-align: center;
}

.invite-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
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

.button-accept-invitation {
  padding: 17px 24px;
  border-radius: 4px;
  background-color: #1f88e9;
}

.invite-image {
  margin-bottom: 8px;
  border-radius: 50%;
}

.highlight {
  color: #0dba52;
}

.invited-you-text {
  margin-bottom: 16px;
  text-align: center;
}

.hero-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 90%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.how-wrapper {
  padding: 32px;
  border-radius: 8px;
}

.p-center-black {
  margin-bottom: 1rem;
}

.event-detail-container {
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

.p-small-black-50 {
  color: rgba(0, 0, 0, .5);
  font-size: 0.88rem;
  line-height: 1.2rem;
  text-align: left;
}

.divider-2px {
  width: 100%;
  height: 2px;
  background-color: #f3f3f3;
}

.content-container-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
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

.featured-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 90%;
  margin-top: 48px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.featured-card {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 33.3%;
  padding: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.image-261 {
  max-width: 90%;
}

.footer-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 112px 32px 0px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.footer {
  background-color: #fff;
  background-image: url('../assets/footer-bottom-image-2.svg');
  background-position: 50% -82%;
  background-size: auto;
  background-repeat: no-repeat;
}

.footer-link {
  color: grey;
  text-decoration: none;
}

.footer-link-list-item {
  margin-right: 6px;
  margin-bottom: 0px;
  margin-left: 6px;
  color: #818181;
  list-style-type: none;
}

.footer-unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 21px;
  padding-left: 0px;
}

.footer-social-unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0px;
}

.footer-social-list-item {
  margin-right: 6px;
  margin-left: 6px;
  list-style-type: none;
}

.terms-list-item {
  margin-right: 6px;
  margin-bottom: 8px;
  margin-left: 6px;
  color: #c49696;
  list-style-type: none;
}

.terms-unordered-list {
  position: static;
  bottom: -1px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0px;
  padding-left: 0px;
}

.terms-link {
  color: #fff;
  font-size: 11px;
  text-align: center;
  text-decoration: none;
}

.div-block-33 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 99px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.hero-list-item-heading {
  margin-bottom: 8px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
}

.hero-list-item-subtitle {
  color: #717171;
  text-align: center;
}

.image-262 {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 28%;
  margin: 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  list-style-type: none;
}

.unordered-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 0px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  list-style-type: none;
}

.hero-link {
  color: #1f88e9;
  text-decoration: none;
}

.testimonial-image-name-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.quotation-mark-icon {
  min-width: 52px;
  margin-right: 16px;
  padding-left: 0px;
  float: left;
  clear: left;
  opacity: 1;
}

.image-263 {
  min-width: 80px;
  margin-right: 8px;
  margin-left: 8px;
}

.h1-display-parents-align-r {
  margin-top: 7px;
  margin-bottom: 0.5rem;
  text-align: left;
}

.parents-love-us-blockquote {
  width: 100%;
  margin-bottom: 24px;
  padding: 0px;
  border-style: none;
  font-size: 1.1rem;
  line-height: 1.8rem;
  text-align: left;
}

.testimonial-desktop-image {
  max-width: 250px;
  min-width: 250px;
  border-radius: 4px;
}

.testimonial-list-item-name {
  margin-bottom: 4px;
  font-weight: 700;
  text-align: left;
}

.h1-display-parents-align-l {
  margin-top: 7px;
  margin-bottom: 0.5rem;
  text-align: left;
}

.testimonial-list-item-divider {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 1px;
  margin-bottom: 64px;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, .07);
}

.testimonial-mobile-image {
  max-width: 75px;
  min-width: 75px;
  margin-right: 16px;
}

.blockquote-container {
  margin-left: 40px;
}

.testimonial-list-item-location {
  text-align: left;
}

.testimonial-list-item-location.p-small-black-50 {
  margin-bottom: 4px;
}

.testimonial-list-group {
  width: 80%;
  margin-bottom: 0px;
  padding-left: 0px;
  list-style-type: none;
}

.testimonial-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 64px;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.testimonial-list-item-role {
  text-align: left;
}

.parents-heart-us-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 80px;
}

.photo-group-container {
  width: 65%;
  margin-top: 64px;
}

.our-story-photo {
  width: 100%;
  margin-bottom: 24px;
  border-style: none;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .09);
  border-radius: 4px;
  box-shadow: none;
}

.unordered-list-events {
  width: 100%;
  margin-bottom: 32px;
  padding-left: 0px;
  list-style-type: none;
}

.event-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .1);
}

.event-list-item-graphic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 180px;
  min-width: 180px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #cbcbcb;
}

.event-list-item-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.event-heading {
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5px;
}

.action-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: 24px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.host-info {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.avatar-small {
  border-radius: 50%;
}

.event-time {
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 17px;
}

.event-location {
  margin-bottom: 16px;
}

.text-block {
  margin-top: -4px;
  margin-right: 17px;
  margin-left: 10px;
  line-height: 17px;
}

.button {
  padding: 12px 32px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.event-summary {
  width: 100%;
}

.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.events-list-wrapper {
  width: 100%;
  margin-top: 60px;
}

.event-date-section-tittle {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 16px;
  padding: 11px 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 4px;
  background-color: transparent;
}

.date-title {
  font-size: 20px;
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

.color-1 {
  background-color: #e82d55;
}

.color-2 {
  background-color: #0cba52;
}

.color-3 {
  background-color: #aff0fc;
}

.color-4 {
  background-color: #fd6f77;
}

.color-5 {
  background-color: #64426b;
}

.body-2 {
  background-color: #f6f6f6;
}

.event-detail-graphic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  min-height: 240px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #e82d55;
}

.div-block-36 {
  width: 100%;
  padding: 32px;
  background-color: #fff;
}

.event-detail-heading {
  margin-top: 0px;
  margin-bottom: 6px;
  font-size: 35px;
  line-height: 49px;
  text-align: left;
  letter-spacing: -0.5px;
}

.host-info-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.hosted-by {
  margin-top: -4px;
  margin-right: 17px;
  margin-left: 0px;
  font-size: 15px;
  line-height: 22.4px;
}

.background-checked {
  margin-left: 4px;
  padding-left: 0px;
  color: #000;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.background-checked-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 2px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.avatar-large {
  border-radius: 50%;
}

.summary-info {
  margin-top: 32px;
  padding-left: 0px;
  list-style-type: none;
}

.summary-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 12px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.summary-text {
  margin-left: 10px;
}

.map {
  min-height: 300px;
  min-width: 100%;
  background-image: url('../assets/map.png');
  background-position: 50% 50%;
  background-size: cover;
}

.event-specifics-card {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-top: 16px;
  padding: 32px 32px 50px;
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
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .08);
}

.card-large-text {
  width: 80%;
  margin-top: 16px;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
}

.card-small-text {
  margin-top: 8px;
  font-size: 13px;
  line-height: 20px;
}

.card-small-text-gray {
  margin-top: 0px;
  color: #969696;
  font-size: 13px;
  line-height: 20px;
}

.button-bottom-event {
  margin-top: 24px;
  padding: 12px 91px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
}

.button-bottom-event:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.avatar-x-large {
  border-radius: 50%;
}

.mobile-cards-wrapper {
  width: 100%;
}

.unordered-list-2 {
  padding-left: 0px;
  list-style-type: none;
}

.link-block-3 {
  width: 100%;
}

.link-block-4 {
  color: #000;
  text-decoration: none;
}

.link-block-4:hover {
  text-decoration: underline;
}

.content-container-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0px 32px;
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

.content-container-4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 64px 32px 112px;
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

@media (max-width: 991px) {
  .nav-menu {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-top: 0px;
    padding-top: 0px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    background-color: transparent;
  }
  .button-nav {
    padding: 4px 12px;
    font-size: 0.8rem;
    letter-spacing: 0.12rem;
  }
  .button-nav.menu {
    padding: 4px 12px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
    font-size: 0.8rem;
    letter-spacing: 0.12rem;
  }
  .nav-container {
    margin-top: 24px;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .nav-links {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 32px;
    padding-left: 32px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
  }
  .nav-link {
    margin-right: 0px;
    margin-left: 0px;
    padding: 8px 0px;
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
  }
  .nav-section {
    position: relative;
    padding-bottom: 0px;
    background-color: #fff;
    opacity: 1;
  }
  .menu-button {
    padding: 0px 0px 0px 12px;
  }
  .menu-button.w--open {
    background-color: #fff;
  }
  .div-block-32 {
    width: 40%;
    padding: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    background-color: #fff;
    box-shadow: 0 14px 20px 0 rgba(0, 0, 0, .11);
  }
  .hero-section {
    background-image: url('../assets/group-5.svg');
    background-position: 50% -123px;
    background-size: 800px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-top: 112px;
    padding-bottom: 112px;
  }
  .h1-display {
    font-size: 32px;
    line-height: 42px;
  }
  .hero-subtitle {
    font-size: 16px;
    line-height: 22px;
  }
  .hero-content {
    width: 100%;
    padding-top: 16px;
  }
  .event-detail-container {
    padding-top: 32px;
    padding-bottom: 128px;
  }
  .content-container-2 {
    padding-top: 100px;
    padding-bottom: 128px;
  }
  .featured-container {
    width: 100%;
  }
  .featured-card {
    width: 33.3%;
    padding: 8px;
  }
  .footer {
    background-position: 50% -84%;
    background-size: auto;
  }
  .unordered-list {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .testimonial-image-name-group {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .quotation-mark-icon {
    min-width: 45px;
    margin-right: 16px;
  }
  .image-263 {
    min-width: 50px;
  }
  .h1-display-parents-align-r {
    font-size: 2.21rem;
    line-height: 2.652rem;
  }
  .parents-love-us-blockquote {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  .testimonial-mobile-text-content {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .h1-display-parents-align-l {
    font-size: 2.21rem;
    line-height: 2.652rem;
  }
  .testimonial-mobile-image {
    max-width: 75px;
    min-width: 75px;
    margin-right: 16px;
  }
  .parents-heart-us-container {
    margin-bottom: 56px;
  }
  .photo-group-container {
    width: 90%;
  }
  .content-container-3 {
    padding-top: 100px;
    padding-bottom: 128px;
  }
  .content-container-4 {
    padding-bottom: 128px;
  }
}

@media (max-width: 767px) {

	.content-container-3 {
	padding-top: 0px;
}

  .nav-menu {
    margin-top: 0px;
  }
  .nav-container {
    margin-top: 12px;
    margin-bottom: 12px;
    padding-right: 32px;
    padding-left: 32px;
  }
  .nav-links {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 0px;
    padding-left: 0px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .nav-tag {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-bottom: 2px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    color: #a6a6a6;
    font-size: 0.71rem;
  }
  .nav-section {
    padding-bottom: 0px;
  }
  .div-block-32 {
    width: 260px;
    margin-right: 32px;
  }
  .tag-container-mobile {
    padding-right: 32px;
    padding-left: 32px;
  }
  .hero-section {
    background-image: url('../assets/group-5.svg');
    background-position: 50% -123px;
    background-size: 600px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-right: 20px;
    padding-left: 20px;
  }
  .h1-display {
    font-size: 28px;
    line-height: 34px;
  }
  .hero-content {
    width: 80%;
  }
  .how-wrapper {
    width: 100%;
    margin-bottom: 24px;
  }
  .p-center-black {
    font-size: 0.89rem;
    line-height: 1.34rem;
  }
  .event-detail-container {
    padding: 0px 0px 100px;
  }
  .p-small-black-50 {
    font-size: 0.75rem;
  }
  .content-container-2 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
  .featured-card {
    width: 50%;
    padding: 16px;
  }
  .footer-container {
    padding-right: 20px;
    padding-left: 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .footer {
    background-position: 50% -80%;
    background-size: auto;
  }
  .image-262 {
    width: 80px;
    height: 80px;
  }
  .list-item {
    width: auto;
    margin-bottom: 8px;
  }
  .unordered-list {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .quotation-mark-icon {
    min-width: 41px;
    margin-right: 8px;
  }
  .image-263 {
    min-width: 40px;
  }
  .h1-display-parents-align-r {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .parents-love-us-blockquote {
    font-size: 0.89rem;
    line-height: 1.4rem;
  }
  .h1-display-parents-align-l {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .testimonial-mobile-image {
    max-width: 90px;
    min-width: 90px;
  }
  .blockquote-container {
    margin-left: 0px;
  }
  .testimonial-list-group {
    width: 80%;
  }
  .testimonial-list-item-role.p-small-black-50 {
    margin-bottom: 8px;
  }
  .photo-group-container {
    width: 100%;
  }
  .event-list-item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .event-list-item-graphic {
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
  }
  .event-detail-graphic {
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0px;
  }
  .card-large-text {
    width: 88%;
  }
  .mobile-cards-wrapper {
    padding-right: 16px;
    padding-left: 16px;
  }
  .content-container-3 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
  .content-container-4 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }
}

@media (max-width: 479px) {

  .nav-menu {
    position: absolute;
    margin-top: 0px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .nav-container {
    padding-right: 20px;
    padding-left: 20px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .nav-links {
    padding-right: 0px;
    padding-left: 0px;
  }
  .nav-tag {
    padding-left: 20px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .brand {
    width: 140px;
  }
  .div-block-32 {
    width: 100%;
    margin-right: 0px;
  }
  .tag-container-mobile {
    padding-right: 0px;
    padding-left: 0px;
  }
  .hero-section {
    background-image: url('../assets/group-5.svg');
    background-position: 50% -66px;
    background-size: 400px;
    background-repeat: no-repeat;
  }
  .hero-container {
    padding-top: 32px;
    padding-bottom: 64px;
  }
  .hero-content {
    width: 100%;
  }
  .how-wrapper {
    padding: 0px;
  }
  .p-center-black {
    margin-bottom: 1rem;
  }
  .event-detail-container {
    padding-bottom: 32px;
    background-color: #f4f4f4;
  }
  .content-container-2 {
    padding-top: 64px;
    padding-bottom: 64px;
  }
  .featured-card {
    padding: 0px;
  }
  .image-261 {
    max-width: 100%;
  }
  .footer-container {
    padding-top: 80px;
    padding-bottom: 80px;
  }
  .footer {
    background-position: 50% 268%;
    background-size: auto;
  }
  .footer-link-list-item {
    margin-bottom: 7px;
  }
  .footer-unordered-list {
    margin-bottom: 26px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .terms-list-item {
    text-align: center;
  }
  .terms-unordered-list {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .terms-link {
    text-align: center;
  }
  .testimonial-image-name-group {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .h1-display-parents-align-r {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .h1-display-parents-align-l {
    font-size: 1.76rem;
    line-height: 2.112rem;
  }
  .h1-display {
  	margin-top: 24px;
  	margin-bottom: 0px;
  }
  .testimonial-list-item-divider {
    margin-bottom: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .testimonial-mobile-image {
    max-width: 75px;
    min-width: 75px;
    margin-top: 6px;
  }
  .testimonial-list-group {
    width: 100%;
  }
  .testimonial-list-item {
    margin-bottom: 32px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .parents-heart-us-container {
    margin-bottom: 40px;
  }
  .photo-group-container {
    margin-top: 32px;
  }
  .our-story-photo {
    margin-bottom: 16px;
  }
  .event-heading {
    font-size: 18px;
    line-height: 25px;
  }
  .action-bar {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .button {
    width: 100%;
    margin-top: 20px;
  }
  .events-list-wrapper {
    margin-top: 32px;
  }
  .div-block-36 {
    padding: 24px;
  }
  .event-detail-heading {
    font-size: 20px;
    line-height: 26px;
  }
  .card-large-text {
    width: 100%;
    font-size: 16px;
    line-height: 26px;
  }
  .button-bottom-event {
    width: 100%;
    margin-top: 20px;
  }
  .content-container-3 {
    padding: 0px 16px;
  }
  .content-container-4 {
    padding: 64px 16px;
  }
}
</style>