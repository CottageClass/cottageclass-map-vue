import {
  fetchEvent,
  fetchEvents,
  fetchUpcomingEventsWithinDistance,
  fetchUpcomingEvents
} from '../api'
import mockAxios from 'axios'

describe('fetchEvent', () => {
  it('has the right data', async () => {
    const event = await fetchEvent('2186')
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(event.data).toMatchSnapshot()
  })
  it('throws an error with a bad id', async () => {
    await expect(fetchEvent(123123)).rejects.toEqual(Error('failed to fetch event'))
  })
})

describe('fetchEvents', () => {
  it('has the right data', async () => {
    const events = await fetchEvents()
    expect(typeof events.all).toBe('object')
    expect(events.length).toBe(33)
    expect(events).toMatchSnapshot()
  })
})

describe('fetchUpcomingEventsWithinDistance', async () => {
  it('has the right data', async () => {
    const events = await fetchUpcomingEventsWithinDistance(10, 42.2798738, -71.7900378)
    expect(events[0].id).toBe('2353')
    expect(events).toMatchSnapshot()
  })
})

describe('fetchUpcomingEvents for user', async () => {
  it('has the right data', async () => {
    const events = await fetchUpcomingEvents(1230)
    expect(events[0].id).toBe('2359')
    expect(events).toMatchSnapshot()
  })
})
