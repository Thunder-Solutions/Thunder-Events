import { removeFavorite } from '../../../thunderEvents'

export default ({ state, setState, component }) => async rawEvent => {
  const { openEventDialog } = component

  // set event data
  const event = typeof rawEvent === 'string'
    ? JSON.parse(decodeURIComponent(rawEvent))
    : rawEvent

  const _removeIndex = state.favorites.findIndex(({ id }) => id === event.id)

  // this only exists to prevent the loss of any favorites that
  // were saved before the ID field was introduced... can be removed after tekko
  const removeIndex = _removeIndex === -1
    ? state.favorites.findIndex(({ location: _location, start, name }) => {
        const { location: cLocation, start: cStart, name: cName } = event
        return _location === cLocation && start === cStart && name === cName
      })
    : _removeIndex

  const favorites = [...state.favorites]
  favorites.splice(removeIndex, 1)
  if (state.sortBy === 'favorites') {
    await setState({ favorites }, { pushState: false })
  } else {
    await setState({ favorites }, { render: false, pushState: false })
    openEventDialog(event) // update the event modal
  }
  return await removeFavorite(event)
}
