import { mount } from '@vue/test-utils'

describe('RadioButtons', () => {
  beforeAll(async () => {
    const res = await mockAxios.get(`${process.env.BASE_URL_API}/api/users/1230`)
    user = createUser(normalize(res.data))
  })
  it('returns the correct basic information', async () => {
  })
})
