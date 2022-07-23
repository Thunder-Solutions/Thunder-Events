import { addFavorite } from '../../../thunderEvents'

export default ({ state, setState, component }) => async encodedEvent => {
  const { openEventDialog } = component
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  await setState({
    favorites: [...state.favorites, event],
  }, {
    render: false,
    pushState: false,
  })
  openEventDialog(encodedEvent) // update the event modal
  return await addFavorite(event)
}
