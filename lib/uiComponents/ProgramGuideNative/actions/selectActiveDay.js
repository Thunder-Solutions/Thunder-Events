export default ({ state, setState }) => event => {
  const activeDay = event.target.value
  const timeString = state.activeTime.toLocaleTimeString()
  const activeTime = new Date(`${activeDay} ${timeString}`)
  if (state.activeDate === activeDay && state.activeTime === activeTime) return
  setState({
    activeDay,

    // also reset the active time to match the selected day
    activeTime,
  })
}
