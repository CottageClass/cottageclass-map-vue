<template>
  <a @click="submitMessage"><slot></slot></a>
</template>

<script>

export default {
  name: 'TwilioProxyMessageLink',
  props: ['currentUserId', 'receivingUserId', 'message'],
  methods: {
    submitMessage: function () {
      let userId = this.currentUserId
      let postData = {
        receivingUserId: this.receivingUserId,
        message: this.message
      }      
      return this.axios.post(`${process.env.BASE_URL_API}/users/${userId}/messages`, postData).then(res => {
        console.log("submit Twilio message SUCCESS")
        alert("Request sent. You'll get a reply in just a few minutes.")
        console.log(res)
        return res
    }).catch(err => {
    console.log("submit Twilio message FAILURE")
    console.log(err)
    console.log(Object.entries(err))
    alert("Oops! There was a problem sending your request. Try again?")
    throw err
    })}
}
};
</script>