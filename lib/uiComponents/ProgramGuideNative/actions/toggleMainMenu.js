import { clearHTML, parseHTML } from '../../../utilities'
import { renderMainMenu } from '../render'

export default ({ state, component }) => _bool => {
  const { root } = component
  const bool = _bool === 'true' ? true : !!_bool
  const dialog = root.querySelector('.pg-dialog--main-menu')
  const dialogContent = parseHTML(renderMainMenu(state, component))
  clearHTML(dialog)
  dialog.appendChild(dialogContent)
  if (bool) dialog.showModal()
  else if (dialog.open) dialog.close()
}
