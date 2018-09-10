<template>
	    <div class="list-item-container"><img :src="require(`../assets/${person.pic}`)" class="image">
      <div class="friend-indicator"><img src="../assets/check.png"></div>
      <div class="list-item-content-left">
        <h5 class="heading">{{ person.name}} {{ person.lastInitial }}.</h5>
        <div class="text-block">
        	<span v-for="(child, index) in person.children">{{ child.name }} 
        		<span class="black-50">({{ child.age }})</span><span v-if="(index < person.children.length - 1)">, </span>
        </span></div>
      </div><a href="#" class="button-send-message w-inline-block"><img src="@/assets/chat.svg"><div class="send-message-text">Send</div></a></div>
</template>

<style scoped>
</style>

<script>
export default {
        name: 'Provider',
        props: ['person'],
};
</script>
