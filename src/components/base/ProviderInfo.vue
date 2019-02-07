
<template>
  <div class="title-bar-and-action-v2">
    <div class="div-block-7">
      <div class="name-and-caption">
        <h5 v-if="person.job && person.job.employer" class="caption">{{ person.title }}
          <span v-if="person.job.employer">at {{ person.employer }}</span>
        </h5>
      </div>
    </div>

    <h5 class="caption" v-if="person.children.length">
      <ChildInfo :children="person.children" />
    </h5>
    <div class="providerp-background-check-badge-container2" v-if="person.verified">
      <div class="providerp-background-check-badge"><img src="../../assets/check-green.svg" alt="" class="checkmark-image">
        <div class="background-check-text">Background checked</div>
      </div>
    </div>

    <div class="tag-group-container" v-if="person.activities.length"><img src="../../assets/tag.svg" class="image-tag">
      <div class="tags-container" v-for="activity in person.activities">
        <div class="tag">
          <div class="small-text-upper-black-40">{{ activity }}</div>
        </div>
      </div>
    </div>
    <div class="time-group-container">
      <img src="../../assets/time.svg" class="image-time">
      <div class="times-container">
        <div class="time" v-if="person.availableMornings">
          <div class="time-tags">9a–3p</div>
        </div>
        <div class="time" v-if="person.availableAfternoons">
          <div class="time-tags">3p–7p</div>
        </div>
        <div class="time" v-if="person.availableEvenings">
          <div class="time-tags">7p-</div>
        </div>
        <div class="time" v-if="person.availableWeekends">
          <div class="time-tags">WEEKENDS</div>
        </div>
      </div>
    </div>
    <div class="list-item-content-container"></div>
  </div>
</template>


<script>
export default {
  name: 'ProviderInfo',
  props: ['person'],
  components: { }
}
</script>
