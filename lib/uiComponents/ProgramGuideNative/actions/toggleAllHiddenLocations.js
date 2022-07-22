import { updateHiddenLocations } from '../../../thunderEvents'

export default ({ state, component }) => async () => {

  // toggle all based on checkboxes
  for (const _location of state.locations) {
    const show = state.hiddenLocations.length > 0
    await component.toggleHiddenLocation(_location, show)
  }
  updateHiddenLocations(state.hiddenLocations)
}
