export default ({ state, setState, component }) => async locationName => {
  if (state.marker === locationName && state.view === 'floorPlan') return
  await setState({
    marker: locationName,
    view: 'floorPlan',
  })
  component.toggleFloorPlanInteractive(false)
}
