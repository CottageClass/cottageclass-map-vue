<template>
  <div>
  <div class="onb-children-info-container onb-content-container-2">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Child Info</h1>
      <p class="onb-paragraph-subheading-2">Have kids? Please enter their first names (or nicknames) and birthdays.</p>
    </div>
  </div>
  <div class="onb-child-info-container">
    <div class="form-block-3 w-form">
      <form id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-2">
        <div v-for="(child, index) in children" class="onb-child-group-2">
          <div class="onb-group-header" key="index">
            <h2 class="onb-child-group-heading">Child {{ index + 1}}</h2>
            <a @click="removeChild(index)" class="onb-button-delete-child w-inline-block"><img src="@/assets/remove.svg" width="24" height="24" alt="" class="image-6"></a>
          </div><label for="birthday-2" class="onb-field-label">Name</label><input type="text" class="name-text-field w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="First Name" id="name-2" v-model="children[index].name"><label for="birthday-3" class="onb-field-label">Birthday</label><input type="date" min="1980-01-01" class="basic-text-field w-input" maxlength="256" name="birthday-2" data-name="Birthday 2" placeholder="MM / DD / YYYY" id="birthday-2" v-model="children[index].birthday"></div>
      </form><a @click="addChild" class="onb-button-add-group w-inline-block"><img src="@/assets/add.svg" alt="" class="image-7"><div class="onb-button-add-group-text">Add Another child</div></a>
    </div>
  </div>
</div>
</template>

<script>

export default {

  name: "Children",
  props: ['value'],
  data () {
    return {
      children: this.value.list,
      errorMesg: 'Please enter a first name (or nickname) and birthdate for each child.'
    }
  },
  methods: {
    addChild: function () {
      this.children.push({name: null, birthday: null})
    },
    removeChild: function (index) {
      this.children.splice(index, 1);
    }
  },
  computed: {
    noChildren: function() {
      return (this.children.length === 0 || (this.children[0].name === null && this.children[0].birthday === null))
    },
    childrenValidates: function () {
      // child has name and birthday
      let childValidates = function (child) {
        return child.birthday && child.name
      }
      if (this.noChildren ||
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
};
</script>

