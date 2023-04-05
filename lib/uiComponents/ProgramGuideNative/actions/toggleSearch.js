export default ({ component }) => _bool => {

  // get the search bar element
  const { root } = component
  const searchBar = root.querySelector('.pg-search-bar')

  // gather data before proceeding
  const ACTIVE_CLASS = 'pg-search-bar--active'
  const bool = _bool === 'true' ? true : !!_bool
  const remove = !bool || searchBar.classList.contains(ACTIVE_CLASS)

  // toggle the active class
  const addOrRemove = remove ? 'remove' : 'add'
  searchBar.classList[addOrRemove](ACTIVE_CLASS)
}
