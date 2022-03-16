// fallback in case of Node
export default typeof HTMLElement === 'undefined' ? class {} : HTMLElement
