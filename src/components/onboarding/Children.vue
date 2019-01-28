<template>
  <Question
  title="Child Information"
  subtitle="We need some basic info about your children. Their ages will appear on your public profile, but only hosts of events you RSVP to will see their names.">
      <form v-on:submit.prevent id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-2">
        <div v-for="(child, index) in children" class="onb-child-group-2">
          <div class="onb-group-header" key="index">
            <h2 class="onb-child-group-heading">Child {{ index + 1}}</h2>
            <a @click="removeChild(index)" class="onb-button-delete-child w-inline-block"><img src="@/assets/remove.svg" width="24" height="24" alt="" class="image-6"></a>
          </div>
          <label for="name-2" class="onb-field-label">First Name</label>
          <input type="text" class="name-text-field w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="First Name" id="name-2" v-model="children[index].firstName" />

          <label for="birthday-2" class="onb-field-label">Birthday</label>
          <input type="date" min="1980-01-01" class="basic-text-field w-input" maxlength="256" name="birthday-2" data-name="Birthday 2" placeholder="MM / DD / YYYY" id="birthday-2" v-model="children[index].birthday" />

          <label for="school-2" class="onb-field-label">School Name (optional)</label>
          <input type="text" class="name-text-field w-input" maxlength="256" name="school-2" data-name="School 2" placeholder="Name of School" id="school-2" v-model="children[index].schoolName" />
        </div>
      </form><a @click="addChild" class="onb-button-add-group w-inline-block"><img src="@/assets/add.svg" alt="" class="image-7"><div class="onb-button-add-group-text">Add Another child</div></a>
    </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'

export default {

  name: 'Children',
  props: ['value'],
  components: { Question },
  data () {
    return {
      children: this.value.list,
      errorMesg: 'Please enter a first name (or nickname) and birthdate for each child.'
    }
  },
  methods: {
    addChild: function () {
      this.children.push({ firstName: null, birthday: null, schoolName: null })
    },
    removeChild: function (index) {
      this.children.splice(index, 1)
    }
  },
  computed: {
    childrenValidates: function () {
      // child has name and birthday
      let childValidates = function (child) {
        return (
          child.birthday &&
          child.firstName &&
          child.birthday.length > 0 &&
          child.firstName.length > 0
        )
      }
      if (this.children.length > 0 &&
        // validate that each child has name, birthday
        (this.children.reduce((soFar, child) => soFar && childValidates(child), true))) {
        return true
      } else {
        return false
      }
    },
    error: function () {
      if (this.childrenValidates) {
        return false
      } else {
        return this.errorMesg
      }
    }
  },
  mounted: function () {
    this.$emit('input', {
      list: this.children,
      err: this.error
    })
  },
  watch: {
    children: {
      handler: function () {
        this.$emit('input', {
          list: this.children,
          err: this.error
        })
      },
      deep: true
    }
  }
}
</script>
