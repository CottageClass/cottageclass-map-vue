import _ from 'lodash'
import moment from 'moment'
import { capitalize } from './utils'

export default (data) => {
  console.log({data})
  const id = _.keys(data.event)[0]
  const event = data.event[id]
  const eventAttributes = event.attributes
  let attributes = _.clone(eventAttributes)

  // some data cleaning
  attributes = cleanEvent(attributes)

  const participatingChildren = _.map(event.relationships.participants.data, e => e.id)
  const participatingParents = _.map(_.values(data.participant), p => cleanPerson(p.attributes))

  return {
    data,
    id,
    ...attributes,
    participatingChildren,
    participatingParents
  }
}

/*
 * Sanitizing helper methods
*/
function cleanEvent (attributes) {
  const res = _.clone(attributes)
  res.hostId = attributes.hostId.toString()
  res.startsAt = moment(attributes.startsAt)
  res.endsAt = moment(attributes.endsAt)
  res.hostFirstName = capitalize(attributes.hostFirstName)
  res.hostFuzzyLatitude = parseFloat(attributes.hostFuzzyLatitude)
  res.hostFuzzyLongitude = parseFloat(attributes.hostFuzzyLongitude)
  res.activityName = attributes.activityNames.length > 0 ? attributes.activityNames[0] : null
  res.food = attributes.foods.length > 0 ? attributes.foods[0] : null
  return res
}

function cleanPerson (attributes) {
  const res = _.clone(attributes)
  res.userFuzzyLatitude = parseFloat(attributes.userFuzzyLatitude)
  res.userFuzzyLongitude = parseFloat(attributes.userFuzzyLongitude)
  res.userFirstName = capitalize(attributes.userFirstName)
  return res
}
