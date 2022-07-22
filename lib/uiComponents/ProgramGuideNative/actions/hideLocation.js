import { hideLocation } from '../../../thunderEvents'

export default ({ state, setState }) => async location => {
  // If location already exists in array, remove it.
  // If not, add it in.
  if (state.hiddenLocations.includes(location)) {
    const removeIndex = state.hiddenLocations.findIndex((loc) => {
      return location === loc
    })
    const hiddenLocations = [...state.hiddenLocations]
    hiddenLocations.splice(removeIndex, 1)
    setState({
      hiddenLocations: hiddenLocations
    })
  } else {
    setState({
      hiddenLocations: [...state.hiddenLocations, location],
    })
  }

  return await hideLocation(location)
}
