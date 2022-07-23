import { removeFavorite } from '../../../thunderEvents'

export default ({ state, setState, component }) => async encodedEvent => {
  const { openEventDialog } = component
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  const removeIndex = state.favorites.findIndex(({ location: _location, start, name }) => {
    const { location: cLocation, start: cStart, name: cName } = event
    return _location === cLocation && start === cStart && name === cName
  })
  const favorites = [...state.favorites]
  favorites.splice(removeIndex, 1)
  if (state.sortBy === 'favorites') {
    await setState({ favorites }, { pushState: false })
  } else {
    await setState({ favorites }, { render: false, pushState: false })
    openEventDialog(encodedEvent) // update the event modal
  }
  return await removeFavorite(event)
}
