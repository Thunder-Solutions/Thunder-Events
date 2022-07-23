import { updateHiddenLocations } from '../../../thunderEvents'

export default ({ state, setState }) => async (_location, override) => {

  // If location already exists in array, remove it.
  // If not, add it in.
  const show = typeof override === 'boolean' ? override : state.hiddenLocations.includes(_location)

  const removeIndex = state.hiddenLocations.findIndex(l => _location === l)
  const hiddenLocations = [...state.hiddenLocations]
  if (show && removeIndex !== -1) hiddenLocations.splice(removeIndex, 1)
  else hiddenLocations.push(_location)
  const newHiddenLocations = [...new Set(hiddenLocations)]

  if (JSON.stringify(state.hiddenLocations) === JSON.stringify(newHiddenLocations)) return
  await setState({
    hiddenLocations: newHiddenLocations,
  }, {
    render: false,
  })
  return await updateHiddenLocations(newHiddenLocations)
}
