import { mount } from '@vue/test-utils'
import ProviderProfile from '@/views/ProviderProfile.vue'
import _ from 'lodash'

describe('ProviderProfile', async () => {
  let wrapper
  beforeAll(async () => {
    const $route = {
      path: '/user/1281',
      params: { id: 1281 }
    }
    const $store = {
      getters: { currentUser: { id: 1281 } }
    }
    wrapper = mount(ProviderProfile, {
      mocks: { $route, $store }
    })
  })

  it('mounts with the correct information', async () => {
    const name = wrapper.find('h1.providerp-h1')
    expect(name.exists()).toBeTruthy()
    expect(name.text()).toBe('Ari')
  })
})
