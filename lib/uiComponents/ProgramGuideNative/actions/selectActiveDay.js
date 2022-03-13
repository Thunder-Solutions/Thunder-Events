export default ({ state, setState }) => event => {
  const activeDay = event.target.value
  const timeString = state.activeTime.toLocaleTimeString()
  setState({
    activeDay,

    // also reset the active time to match the selected day
    activeTime: new Date(`${activeDay} ${timeString}`),
  }, {
    render: false,
  })
}
