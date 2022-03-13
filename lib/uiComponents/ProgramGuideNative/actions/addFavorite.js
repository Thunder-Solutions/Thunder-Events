import { addFavorite } from '../../../exports'

export default ({ state, setState }) => async encodedEvent => {
  const eventJSON = decodeURIComponent(encodedEvent)
  const event = JSON.parse(eventJSON)
  setState({
    favorites: [...state.favorites, event],
  })
  return await addFavorite(event)
}
