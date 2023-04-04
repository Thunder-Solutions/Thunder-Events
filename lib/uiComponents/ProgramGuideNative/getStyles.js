import { loading, dialogPolyfill, dialog, floorPlan, icons, mobile, search, table, theme, mainMenu } from './styles'


export const getStyles = breakpoint => /* css */`

/* browser defaults for dialog element */
${dialogPolyfill}

.pg-header {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.pg-maximize-button {
  align-items: center;
  background-color: var(--color-header);
  border: var(--rem-0-2) solid var(--color-background);
  border-left-width: 0;
  border-bottom-width: 0;
  color: var(--color-header-content);
  cursor: pointer;
  display: grid;
  margin: 0;
}

.pg-maximized {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  position: fixed;
  height: 100%;
  width: 100%;
  inset: 0;
  margin: auto;
  z-index: var(--max-z-index);
}

.pg-maximized .pg-table-wrapper,
.pg-maximized .pg-floor-plan-wrapper {
  height: 100%;
  max-height: none;
  margin-bottom: 0;
}

.pg-body {
  background-color: var(--color-background);
}

.pg-inline-text {
  display: inline-block;
}

.pg-checkbox-wrapper {
  display: block;
  padding: 0.2rem 0;
  font-size: 1rem;
}

.pg-checkbox {
  font-size: 2rem;
  height: 1.5rem;
  width: 1.5rem;
  vertical-align: middle;
}

.pg-checkbox-text {
  vertical-align: middle;
}

${theme}
${loading}
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
