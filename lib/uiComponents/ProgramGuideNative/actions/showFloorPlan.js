export default ({ state, setState, component }) => async locationName => {
  const { hasFloorPlan } = state
  if (!hasFloorPlan) return
  const { toggleFloorPlanInteractive } = component
  if (state.marker === locationName && state.view === 'floorPlan') return
  await setState({
    marker: locationName,
    view: 'floorPlan',
  })
  toggleFloorPlanInteractive(locationName !== 'none')
}
