import { mount } from '@vue/test-utils'
import EventPage from '@/views/EventPage.vue'

const wrapper = mount(EventPage)
const vm = wrapper.vm
console.log(wrapper)
