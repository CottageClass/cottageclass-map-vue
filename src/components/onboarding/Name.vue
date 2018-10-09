<template>
<div>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your name?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
          <input v-model="first" @input="emit()" type="text" value="first" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="First name" id="name">
          <input v-model="last" @input="emit()" value="last" type="text" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Last name" id="name">
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
      last: this.value.last,
      errorMesg: 'Please enter your first and last name.'
    }
  },
  mounted: function () {
    if (!this.isComplete) {
      this.$emit('input', {
        first: this.value.first,
        last: this.value.last,
        err: this.errorMesg 
      })
    }
    },
  computed: {
    isComplete: function () {
      return (this.first && this.last)
    },
    error: function () {
      if (this.isComplete) {
        return false
      } else {
        return this.errorMesg
      }
    },
    name: function() {
      return {
        first: this.first,
        last: this.last,
        err: this.error
      }
    }
  },
  methods: {
    emit: function () {
      this.$emit('input', {
        first: this.first,
        last: this.last,
        err: this.error
      })
    }
  }
};
</script>

