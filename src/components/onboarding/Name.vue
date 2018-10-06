<template>
<div>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your name?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
          <input @input="$emit('input', name)" type="text" value="first" v-model="first" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="First name" id="name">
          <input @input="$emit('input', name)" value="last" type="text" v-model="last" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Last name" id="name">
        </form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">We'll only display your first name and initial to others.</p>
  </div>
</div>
</template>

<script>

export default {

  name: "Name",
  props: ['value'],
  data () {
    return {
      first: this.value.first,
      last: this.value.last
    }
  },
  computed: {
    name: function () {
      return {
        first: this.first,
        last: this.last,
        error: this.error
      }
    },
    isComplete: function () {
      return (this.first && this.last)
    },
    error: function () {
      if (this.isComplete) {
        return false
      } else {
        return 'Please enter your first and last name.'
      }
    }
  }
};
</script>

