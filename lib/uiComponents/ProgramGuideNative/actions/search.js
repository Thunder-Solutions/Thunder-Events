import { search } from '../../../utilities'

export default ({ state, setState }) => async event => {
  event.preventDefault()
  const { currentSearch, events } = state

  // filter search results
  const searchResults = events.filter(event => {
    return (
      search(currentSearch, event.name)
      || search(currentSearch, event.location)
      || search(currentSearch, event.host)
      || search(currentSearch, event.category)
      || search(currentSearch, event.description)
    )
  }).sort((prev, next) => {

    // sort name matches at the top
    const prevName = search(currentSearch, prev.name)
    const nextName = search(currentSearch, next.name)
    return !prevName && nextName ? 1 : (prevName && !nextName ? -1 : 0)
  })

  await setState({
    searchResults,
    sortBy: 'search',
  })
}
