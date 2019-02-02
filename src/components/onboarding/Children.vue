<template>
  <Question
  title="Child Information"
  subtitle="We need some basic info about your children. Their ages will appear on your public profile, but only hosts of events you RSVP to will see their names.">
      <ManyFormFieldGroups
    :labels="labels"
    :names="names"
    :placeholders="labels"
    :types="types"
    headingWord="Child"
    v-model="children"
    />
    </Question>
</template>

<script>
import ManyFormFieldGroups from '@/components/onboarding/ManyFormFieldGroups.vue'
import Question from '@/components/onboarding/Question.vue'

export default {
  name: 'Children',
  props: ['value'],
  components: { Question, ManyFormFieldGroups },
  data () {
    return {
      children: this.value.list,
      labels: ['Full Name', 'Birthday', 'School Name'],
      types: ['text', 'date', 'text'],
      names: ['firstName', 'birthday', 'schoolName'],
      placeholders: ['First Name', 'MM / DD / YYYY', 'Name of School'],
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
