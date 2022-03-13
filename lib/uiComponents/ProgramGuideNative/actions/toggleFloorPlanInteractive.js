export default ({ state, setState, component }) => () => {
  const { templateCache } = component
  const floorPlanInteractive = !state.floorPlanInteractive
  const { floorPlan } = state
  const { floorPlanImage } = templateCache
  const INTERACTIVE_CLASS = 'pg-floor-plan-image--interactive'
  const addOrRemove = floorPlanInteractive ? 'add' : 'remove'
  floorPlanImage.classList[addOrRemove](INTERACTIVE_CLASS)
  if (floorPlan.clickableAreas.length > 0) {
    if (floorPlanInteractive) floorPlanImage.setAttribute('usemap', '#floorPlan')
    else floorPlanImage.removeAttribute('usemap')
  }
  setState({ floorPlanInteractive })
}
