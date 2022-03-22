import { dialogPolyfill, dialog, floorPlan, icons, mobile, search, table, theme, mainMenu } from './styles'


export const getStyles = breakpoint => /* css */`

/* browser defaults for dialog element */
${dialogPolyfill}

.pg-header {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: 1fr auto;
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
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: var(--max-z-index);
}

.pg-maximized .pg-table-wrapper,
.pg-maximized .pg-floor-plan-wrapper {
  height: calc(100% - 9.2rem);
  max-height: none;
}

${theme}
${search}
${mainMenu}
${table}
${icons}
${dialog}
${floorPlan}

/* apply mobiles styles within the provided breakpoint */
@media (max-width: ${breakpoint}) {
  ${mobile}
}
`
