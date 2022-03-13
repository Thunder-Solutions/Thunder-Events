import { removeFavorite } from '../../../exports'

export default ({ state, setState }) => async encodedEvent => {
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  const removeIndex = state.favorites.findIndex(({ location: _location, start, name }) => {
    const { location: cLocation, start: cStart, name: cName } = event
    return _location === cLocation && start === cStart && name === cName
  })
  const favorites = [...state.favorites]
  favorites.splice(removeIndex, 1)
  setState({ favorites })
  return await removeFavorite(event)
}
