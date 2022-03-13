export default ({ setState, component }) => locationName => {
  const { toggleFloorPlanInteractive } = component
  setState({
    marker: locationName,
    view: 'floorPlan',
  })
  toggleFloorPlanInteractive(locationName !== 'none')
}
