<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Terms</h1>
      <p class="onb-paragraph-subheading-2">Please check the box at the bottom to agree to our terms before continuing</p>
    </div>
    <div class="onb-paragraph-align-left">Terms of service<br>Last updated: June 6, 2018<br>If you reside in the United States, please note that section 13 of these terms of service contains an arbitration clause and class action waiver. It affects how disputes with CottageClass are resolved. By accepting these terms of service, you agree to be bound by this arbitration provision. Please read it carefully.Please read these terms of service carefully as they contain important information regarding your legal rights, remedies and obligations. These include various limitations and exclusions, a clause that governs the jurisdiction and venue of disputes, and obligations to comply with applicable laws and regulations.In particular... (ADD LATEST TERMS OF SERVICE HERE)</div>
    <div class="onb-fixed-bottom-actions-checkbox-container">
      <div class="form-block-2 w-form">
        <form id="email-form" name="email-form" data-name="Email Form">
          <div class="checkbox-field w-checkbox"><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="w-checkbox-input"
                v-model="checked"
      @change="$emit('input', $event.target.checked)"><label for="checkbox" class="checkbox-label w-form-label">I agree to the terms</label></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: 'Terms',
  data () {
    return {
      checked: false
    }
  },
  props: ['value'],
  methods: {
    emitError: function () {
      this.$emit('error', 'To continue, check the box below to agree to our terms of service.')
      console.log('emitted')
    }
  },
  mounted: function () {
    this.emitError()
  },
  watched: {
    watchCompleteness: function() {
      if (this.checked) {
        this.$emit('complete')
      } else {
        this.emitError()
      }
    }
  }
};

</script>