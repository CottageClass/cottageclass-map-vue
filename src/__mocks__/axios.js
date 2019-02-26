const event2186 = require('./__mockData__/event_2186.json')

export default {
  get: jest.fn((url) => {
    const eventUrl = `${process.env.BASE_URL_API}/api/events/`
    if (url === eventUrl + '2186') {
      return Promise.resolve(event2186)
    }
  })
}
