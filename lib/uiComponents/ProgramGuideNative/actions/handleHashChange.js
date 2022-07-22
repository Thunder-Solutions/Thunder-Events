export default ({ setState, state, component }) => () => {
  const { root } = component
  const { locations } = state

  // a little extra insurance to avoid conflicts with other code...
  const hash = location.hash.replace('#', '')
  if (!hash.startsWith('View-Location-')) return

  // navigate to location view
  const _location = locations.find(l => {
    const lookup = hash.replace('View-Location-', '')
    const parsed = l.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')
    return lookup === parsed
  })

  // avoid bugs caused by undefined location
  if (!_location) {
    setState({
      view: 'guide',
      sortBy: 'location',
    })
    return
  }

  // make sure the location is not hidden
  component.toggleHiddenLocation(_location, true)

  // render the location view with active location highlighted
  setState({
    activeLocation: _location,
    marker: _location,
    view: 'guide',
    sortBy: 'location',
  })

  // reset the hash so the navigation can be used more than once in a row
  history.replaceState({}, '', location.href.replace(/#.+/, ''))

  // scroll location into view if necessary
  setTimeout(() => { // wait for render
    const activeLocationEl = root.querySelector('.pg-cell-wrapper--column-header-active-location')
    if (activeLocationEl) activeLocationEl.scrollIntoView()
  })
}
