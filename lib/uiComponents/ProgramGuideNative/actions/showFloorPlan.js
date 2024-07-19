export default ({ state, setState, component }) => async locationName => {
  if (state.marker === locationName && state.view === 'floorPlan') return
  await setState({
    marker: locationName,
    view: 'floorPlan',
  })
  requestAnimationFrame(() => {
    const locationExistsInClickableAreas = state.floorPlan.clickableAreas.some(({ location: _location }) => _location === locationName)
    if (!locationExistsInClickableAreas) {
      component.toggleFloorPlanInteractive(true)
      requestAnimationFrame(() => {
        component.showFloorPlanMessage(null, 'Location not found on map')
      })
    } else {
      component.toggleFloorPlanInteractive(false)
    }
  })
}
