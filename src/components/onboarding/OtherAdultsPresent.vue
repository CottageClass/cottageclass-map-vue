<template>
  <div class="outer">
  <div class="onb-children-info-container onb-content-container-2">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Who else will be present?</h1>
      <p class="onb-paragraph-subheading-2">Please give us the names and contact information of any other adults who will be present, so we can reach out politely and invite them to complete a background check. None of this information will be public.</p>
    </div>
  </div>
  <div class="onb-child-info-container">
    <div class="form-block-3 w-form">
      <form v-on:submit.prevent id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-2">
        <div v-for="(adult, index) in adults" class="onb-child-group-2">
          <div class="onb-group-header" key="index">
            <h2 class="onb-child-group-heading">Adult {{ index + 1}}</h2>
            <a @click="removeAdult(index)" class="onb-button-delete-child w-inline-block"><img src="@/assets/remove.svg" width="24" height="24" alt="" class="image-6"></a>
          </div>
          <label for="name" class="onb-field-label">Full Name</label>
          <input 
          type="text" 
          class="name-text-field w-input" 
          maxlength="256" 
          name="name-2" 
          placeholder="Their full name" 
          id="name" 
          v-model="adults[index].fullName" />
          <label for="email" class="onb-field-label">Email</label>
          <input 
          type="email" 
          class="name-text-field w-input" 
          maxlength="256" 
          name="email" 
          placeholder="e.g. their-email@example.com" 
          id="email" 
          v-model="adults[index].email" />
          <label for="birthday-2" class="onb-field-label">Phone</label>
          <input 
          type="tel" 
          class="name-text-field w-input" 
          maxlength="256" 
          name="name-2" 
          data-name="Name 2" 
          placeholder="e.g. 6465551212" 
          id="name-2" 
          v-model="adults[index].phone" />
        </div>
      </form><a @click="addAdult" class="onb-button-add-group w-inline-block"><img src="@/assets/add.svg" alt="" class="image-7"><div class="onb-button-add-group-text">Add adult</div></a>
    </div>
  </div>
</div>
</template>

<script>
// Use lighter-weight port of Google libphonenumber with friendlier API
// - https://www.npmjs.com/package/libphonenumber-js
import {
  isValidNumber,
} from 'libphonenumber-js'

export default {

  name: "OtherAdultsPresent",
  props: ['value'],
  data () {
    return {
      adults: this.value.list,
      errorMesg: 'Please enter a name, email and phone for each adult present, so we can provide them with a free background check.'
    }
  },
  methods: {
    addAdult: function () {
      this.adults.push({fullName: null, email: null, phone: null})
    },
    removeAdult: function (index) {
      this.adults.splice(index, 1);
    },
    emailIsValid: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } 
  },
  computed: {
    adultsValidates: function () {
      let component = this
      let adultValidates = function (adult) {
        return (
          adult.fullName &&
          adult.fullName.trim().length > 0 &&
          isValidNumber(adult.phone, 'US') > 0 &&
          component.emailIsValid(adult.email)
        )
      }
      if (this.adults.length > 0 && // validate that each child has name, birthday
        (this.adults.reduce((soFar, adult) => soFar && adultValidates(adult), true))) {
        return true
      } else {
        return false
    }
  },
    error: function () {
      if (this.adultsValidates) {
        return false
      } else {
        return this.errorMesg
      }
    }
  },
  mounted: function () {
    this.$emit('input', {
      list: this.adults,
      err: this.error
    })
  },
  watch: {
    adults: {
      handler: function () {
      this.$emit('input', {
        list: this.adults,
        err: this.error
      })
    },
    deep: true
  }
}
};
</script>

<style scoped>
.outer {
  min-height: 100vh;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.form-block-3 {
  margin-bottom: 0px
}
</style>

