import { fetchEvent } from '../api'
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
