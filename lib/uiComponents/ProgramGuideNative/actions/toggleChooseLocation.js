import { clearHTML, parseHTML } from '../../../utilities'
import { renderChooseLocation } from '../render'

export default ({ state, component }) => _bool => {
  const { root } = component
  const bool = _bool === 'true' ? true : !!_bool
  const dialog = root.querySelector('.pg-dialog--location')
  const dialogContent = parseHTML(renderChooseLocation(state, component))
  clearHTML(dialog)
  dialog.appendChild(dialogContent)
  if (bool) dialog.showModal()
  else if (dialog.open) dialog.close()
}
