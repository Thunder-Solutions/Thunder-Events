import { addFavorite } from '../../../thunderEvents'

export default ({ state, setState, component }) => async rawEvent => {
  const { openEventDialog } = component

  // set event data
  const event = typeof rawEvent === 'string'
    ? JSON.parse(decodeURIComponent(rawEvent))
    : rawEvent
  await setState({
    favorites: [...state.favorites, event],
  }, {
    render: false,
    pushState: false,
  })
  openEventDialog(event) // update the event modal
  return await addFavorite(event)
}
