<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Special talents</h1>
      <p class="onb-paragraph-subheading-2">Choose some things you're good at, or that your family loves. These will display on your profile so that other parents can get an idea of your interests &amp; vibe.</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="activity in shuffledActivities" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': isSelected(activity)}">
          <input 
          @click="toggleSelected(activity)" 
          type="checkbox" 
          :id="activity" 
          :name="activity" 
          data-name="Checkbox" 
          class="onb-checkbox w-checkbox-input"
          :checked="isSelected(activity)"
          >
          <label 
          :for="activity" 
          class="onb-checkbox-label w-form-label"
          >
           {{ capitalizeFirstLetter(activity) }}
         </label>
        </div>
      </form>
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <p class="describe-label">Anything else you'd like to share?</p>
        <textarea v-model="additionalText" id="field" name="field" placeholder="(This won't appear on your profile but our staff will review it.)" maxlength="5000" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
    </div>
    <p class="onb-paragraph-small-50"></p>
  </div>
</template>

<script>
export default {
  name: "Activities",
  props: ['value'],
  data () {
    return {
      additionalText: "",
      activitiesSelected: [],
      errorMesg: 'Please choose at least one activity you like from the list.',
      allActivities: [
      'knitting',
      'playing in snow',
      'shopping',
      'computers',
      'legos',
      'puzzles',
      'board games',
      'movies',
      'math',
      'science',
      'hiking',
      'swimming',
      'skiing',
      'soccer',
      'baseball',
      'football',
      'watching sports',
      'baking',
      'grilling food',
      'arts & crafts',
      'yoga',
      'meditation'
      ],
      maxChoices: 4
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    shuffledActivities: function () {
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }
      return array;
    }
    return shuffle(this.allActivities) 
    },
    err: function () {
      if (this.activitiesSelected.length == 0) {
        return this.errorMesg
      } else {
        return false
      }
    }
  },
  watch: {
    activitiesSelected: function () {
        this.$emit('input', {
          additionalText: this.additionalText,
          selected: this.activitiesSelected,
          err: this.err
        })
      },
    additionalText: function () {
        this.$emit('input', {
          additionalText: this.additionalText,
          selected: this.activitiesSelected,
          err: this.err
        })
      }
    },
  methods: {
    isSelected: function (activity) {
      return this.activitiesSelected.includes(activity)
    },
    toggleSelected: function (activity) {
      if (this.isSelected(activity)) {
        this.activitiesSelected = this.activitiesSelected.filter((anActivity) => anActivity != activity) 
      } else {
        this.activitiesSelected.push(activity)
      }
    },
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped>

.describe-label {
  color: white;
  padding-top: 16px;
}

textarea {
  height: 96px;
}

.onb-content-container {
  height: unset;
}

</style>

