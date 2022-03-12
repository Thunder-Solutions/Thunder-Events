import { runMethod } from '../../../utilities'

const renderSearchBar = ({ currentSearch }) => /* html */`
  <form class="pg-search-bar" onsubmit="${runMethod('search')}">
    <input class="pg-search-input" onchange="${runMethod('changeSearch')}" placeholder="Search events ..." value="${currentSearch}" />
    <button class="pg-search-button"><i class="pg-search-icon" title="Search"></i></button>
  </form>
`

export default renderSearchBar
