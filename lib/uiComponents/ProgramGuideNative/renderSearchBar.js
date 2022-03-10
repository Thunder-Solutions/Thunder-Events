import { runMethod } from '../../utilities'

const renderSearchBar = ({ currentSearch }) => /* html */`
  <form class="pg-search-bar" onsubmit="${runMethod('search')}">
    <input class="pg-search-input" onchange="${runMethod('changeSearch')}" value="${currentSearch}" />
    <button class="pg-search-button">&#x1F50D;</button>
  </form>
`

export default renderSearchBar
