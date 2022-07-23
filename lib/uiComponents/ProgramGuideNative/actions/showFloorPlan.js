export default ({ state, setState, component }) => locationName => {
  const { hasFloorPlan } = state
  if (!hasFloorPlan) return
  const { toggleFloorPlanInteractive } = component
  if (state.marker === locationName && state.view === 'floorPlan') return
  setState({
    marker: locationName,
    view: 'floorPlan',
  })
  toggleFloorPlanInteractive(locationName !== 'none')
}
