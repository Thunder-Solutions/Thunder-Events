export default ({ state, setState, component }) => locationName => {
  const { hasFloorPlan } = state
  if (!hasFloorPlan) return
  const { toggleFloorPlanInteractive } = component
  setState({
    marker: locationName,
    view: 'floorPlan',
  })
  toggleFloorPlanInteractive(locationName !== 'none')
}
