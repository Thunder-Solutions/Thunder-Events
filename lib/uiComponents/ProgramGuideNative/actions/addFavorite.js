import { addFavorite } from '../../../exports'

export default ({ state, setState, component }) => async encodedEvent => {
  const { openEventDialog } = component
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  setState({
    favorites: [...state.favorites, event],
  }, {
    render: false,
  })
  openEventDialog(encodedEvent) // update the event modal
  return await addFavorite(event)
}
