const allEvents = require('./allEvents.json')

export default {
  get: jest.fn((url) => {
    const eventUrl = `${process.env.BASE_URL_API}/api/events/`
    if (url === eventUrl + '367') {
      return Promise.resolve(allEvents.data.find(e => e.id === '367'))
    }
  })
}
