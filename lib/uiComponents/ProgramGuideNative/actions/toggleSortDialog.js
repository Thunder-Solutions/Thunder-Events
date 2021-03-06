import { clearHTML, parseHTML } from '../../../utilities'
import { renderSortDialog } from '../render'

export default ({ state, component }) => _bool => {
  const { root } = component
  const bool = _bool === 'true' ? true : !!_bool
  const dialog = root.querySelector('.pg-dialog--sort')
  const dialogContent = parseHTML(renderSortDialog(state, component))
  clearHTML(dialog)
  dialog.appendChild(dialogContent)
  if (bool) dialog.showModal()
  else if (dialog.open) dialog.close()
}
