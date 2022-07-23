export default ({ setState }) => async ({ target }) => {
  await setState({ currentSearch: target.value }, { render: false, pushState: false })
}
