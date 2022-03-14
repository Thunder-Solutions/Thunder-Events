export default ({ setState, component }) => () => {
  const { root } = component

  // a little extra insurance to avoid conflicts with other code...
  const hash = location.hash.replace('#', '')
  if (!hash.startsWith('View-Location-')) return

  // navigate to location view
  const _location = hash.replace('View-Location-', '').replace('-', ' ')
  setState({
    activeLocation: _location,
    marker: _location,
    view: 'guide',
    sortBy: 'location',
  })

  // reset the hash so the navigation can be used more than once in a row
  history.replaceState({}, '', location.href.replace(/#.+/, ''))

  // scroll location into view if necessary
  const activeLocationEl = root.querySelector('pg-cell-wrapper--column-header-active-location')
  if (activeLocationEl) activeLocationEl.scrollIntoView()
}
