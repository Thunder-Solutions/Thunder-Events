export default ({ setState }) => ({ target }) => {
  setState({ currentSearch: target.value }, { render: false })
}
