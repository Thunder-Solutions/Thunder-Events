import { toggleHiddenLocation } from '../../../thunderEvents'

export default ({ state, setState, component }) => async () => {

  // If location already exists in array, remove it.
  // If not, add it in.
  for (const _location of state.locations) {
    const show = state.hiddenLocations.length > 0
    component.toggleHiddenLocation(_location, show)
  }
  return await toggleHiddenLocation(location)
}
