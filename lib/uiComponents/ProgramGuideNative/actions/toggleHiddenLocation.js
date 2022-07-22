import { toggleHiddenLocation } from '../../../thunderEvents'

export default ({ state, setState }) => async (_location, override) => {

  // If location already exists in array, remove it.
  // If not, add it in.
  const show = typeof override === 'boolean' ? override : state.hiddenLocations.includes(_location)
  if (show) {
    const removeIndex = state.hiddenLocations.findIndex(loc => {
      return _location === loc
    })
    const hiddenLocations = [...state.hiddenLocations]
    hiddenLocations.splice(removeIndex, 1)
    setState({
      hiddenLocations: hiddenLocations,
    }, {
      render: false,
    })
  } else {
    setState({
      hiddenLocations: [...state.hiddenLocations, _location],
    }, {
      render: false,
    })
  }
  return await toggleHiddenLocation(_location)
}
