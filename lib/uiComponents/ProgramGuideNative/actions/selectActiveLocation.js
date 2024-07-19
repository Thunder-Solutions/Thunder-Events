export default ({ setState, component }) => async _location => {
  const { toggleMainMenu } = component
  toggleMainMenu(false) // close upon selection
  await setState({
    view: 'guide',
    sortBy: 'location',
    activeLocation: _location,
  })
  requestAnimationFrame(() => {
    const { root } = component
    const wrapper = root.querySelector('.pg-cell-wrapper--column-header-active')
    if (wrapper) wrapper.scrollIntoView({ block: 'center' })
  })
}
