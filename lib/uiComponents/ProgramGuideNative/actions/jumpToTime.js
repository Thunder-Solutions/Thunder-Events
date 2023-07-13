export default ({ state, setState, component }) => async () => {
  component.toggleChooseTime(false)

  const time = state.activeTime.toLocaleTimeString('en-US', { timeStyle: 'short' })

  await setState({
    view: 'guide',
    marker: 'none',
    sortBy: 'list',
    scrollTo: `#t-${time.replace(/:|\s/g, '-')}`,
  })
}
