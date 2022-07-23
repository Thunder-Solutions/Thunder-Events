import { updateHiddenLocations } from '../../../thunderEvents'

export default ({ setState, state }) => async () => {

  // toggle all on or off depending on whether the list is populated or not
  const show = state.hiddenLocations.length > 0
  await setState({
    hiddenLocations: show ? [] : [...state.locations],
  }, {
    render: false,
  })
  await updateHiddenLocations()
}
