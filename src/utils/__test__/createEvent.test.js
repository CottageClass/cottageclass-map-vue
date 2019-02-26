import createEvent from '../createEvent'
import mockAxios from 'axios'
import normalize from 'json-api-normalizer'
import moment from 'moment'

describe('createEvent', () => {
  let event
  beforeAll(async () => {
    const request = await mockAxios.get(`${process.env.BASE_URL_API}/api/events/2186`)
    event = createEvent(normalize(request))
  })

  it('returns the correct basic information', async () => {
    expect(event.id).toBe('2186')
    expect(event.hostId).toBe('1184')
    expect(event.participatingChildren).toEqual(['227', '228'])
    expect(event.name).toBe('Arts & crafts & tacos 🌮 with Asa')
    expect(event.startsAt).toEqual(moment('2019-03-23T18:00:00-04:00'))
    expect(event.endsAt).toEqual(moment('2019-03-23T21:00:00-04:00'))
    expect(event.activityName).toBe('arts & crafts')
    expect(event.food).toBe('tacos 🌮')
  })
})
