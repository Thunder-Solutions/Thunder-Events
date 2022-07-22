export default ({ state, setState, component }) => (_bool, event) => {
  const { templateCache } = component
  const bool = _bool ?? !state.floorPlanInteractive
  const floorPlanInteractive = bool
  const { floorPlanImage } = templateCache
  const INTERACTIVE_CLASS = 'pg-floor-plan-image--interactive'
  const addOrRemove = floorPlanInteractive ? 'add' : 'remove'
  floorPlanImage.classList[addOrRemove](INTERACTIVE_CLASS)
  setState({ floorPlanInteractive }, { pushState: false })
  setTimeout(() => { // wait for render
    if (event) component.showFloorPlanMessage(event, 'Tap a location to view its schedule!')
  })
}
