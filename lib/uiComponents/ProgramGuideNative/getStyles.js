import { dialog, floorPlan, icons, mobile, search, table, theme } from './styles'


export const getStyles = breakpoint => /* css */`

.pg-header {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: 1fr auto;
  height: 3.5rem;
}

.pg-maximize-button {
  background-color: var(--color-header);
  border: 0.2rem solid var(--color-background);
  border-left-width: 0;
  border-bottom-width: 0;
  color: var(--color-header-content);
  cursor: pointer;
  margin: 0;
}

.pg-maximized {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.pg-maximized .pg-table-wrapper {
  height: calc(100vh - 3.5rem);
  max-height: none;
}

${theme}
${search}
${table}
${icons}
${dialog}
${floorPlan}

/* apply mobiles styles within the provided breakpoint */
@media (max-width: ${breakpoint}) {
  ${mobile}
}
`
