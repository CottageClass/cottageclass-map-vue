import { fetchEvent } from '../api'

describe('fetchEvent', () => {
  it('has the right id', () => {
    fetchEvent(367).then(res => {
      expect(res.id).toBe('367')
    }).catch((e) => {
      console.error(e)
    })
  })
})
