export default ({ state, component }) => ({ target }) => {
  const { root } = component

  // do nothing if viewing by "now only", because there's nothing to collapse
  if (state.sortBy === 'nowOnly') return

  // do nothing if the table hasn't scrolled
  const wrapper = root.querySelector('.pg-table-wrapper')
  if (!wrapper.classList.contains('pg-table-wrapper--scrolled')) return

  // toggle the collapsed classes
  const allHeaders = root.querySelectorAll('.pg-cell-wrapper--row-header')
  const COLLAPSED_CLASS = 'pg-cell-wrapper--row-header-collapsed'
  const addOrRemove = target.classList.contains(COLLAPSED_CLASS) ? 'remove' : 'add'
  for (const header of allHeaders) header.classList[addOrRemove](COLLAPSED_CLASS)

  // also collapse the corner
  const corner = root.querySelector('.pg-cell-wrapper--corner')
  corner.classList[addOrRemove]('pg-cell-wrapper--corner-collapsed')
}
