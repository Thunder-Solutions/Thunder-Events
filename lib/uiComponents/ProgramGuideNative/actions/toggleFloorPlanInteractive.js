export default ({ state, setState, component }) => _bool => {
  const { templateCache } = component
  const bool = _bool ?? !state.floorPlanInteractive
  const floorPlanInteractive = bool
  const { floorPlan } = state
  const { floorPlanImage } = templateCache
  const INTERACTIVE_CLASS = 'pg-floor-plan-image--interactive'
  const addOrRemove = floorPlanInteractive ? 'add' : 'remove'
  floorPlanImage.classList[addOrRemove](INTERACTIVE_CLASS)
  setState({ floorPlanInteractive })
}
