<template>
<div class="body">
    <div class="tabs-menu w-tab-menu">
      <span 
      @click="tab='events'"
      class="tab-button w-inline-block w-tab-link"
      :class="{ active: eventsTabSelected }">
        <div>Events</div>
      </span>
      <span
      @click="tab='find'"
      :class="{ active: findTabSelected}"
      class="tab-button w-inline-block w-tab-link">
        <div>Request</div>
      </span>
      <span 
      @click="tab='provide'"
      class="tab-button w-inline-block w-tab-link"
      :class="{ active: provideTabSelected }">
        <div>Offer</div>
      </span>
    </div>
    <div class="content">
      <MainView v-if="findTabSelected" />
      <Bookings v-if="provideTabSelected" />
      <div v-if="eventsTabSelected">
      Events go here!
    </div>
    </div>
</div>
</template>

<script>
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings.vue'

export default {
  name: 'TabNav',
  components: { MainView, Bookings },
  data () {
    return {
      tab: this.$route.params.tab || 'events'
    }
  },
  computed: {
    findTabSelected: function () {
      return this.tab == 'find'
    },
    provideTabSelected: function () {
      return this.tab == 'provide'
    },
    eventsTabSelected: function () {
      return this.tab == 'events'
    }
  }
};
</script>

<style scoped>
.tab-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 50%;
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .05);
  color: rgba(51, 51, 51, .58);
  font-size: 12px;
  text-align: center;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.tab-button:active {
  background-color: #1f88e9;
  color: #fff;
}

.tab-button.active {
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  background-color: #fff;
  color: #1f88e9;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.content {
  position: relative;
}

.tabs-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
  </style>