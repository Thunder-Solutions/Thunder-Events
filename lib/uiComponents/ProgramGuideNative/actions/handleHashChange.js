export default ({ setState }) => () => {

  // a little extra insurance to avoid conflicts with other code...
  const hash = location.hash.replace('#', '')
  if (!hash.startsWith('View-Location-')) return

  // navigate to location view
  setState({
    activeLocation: hash.replace('View-Location-', '').replace('-', ' '),
    view: 'guide',
    sortBy: 'location',
  })

  // reset the hash so the navigation can be used more than once in a row
  history.replaceState({}, '', location.href.replace(/#.+/, ''))
}
