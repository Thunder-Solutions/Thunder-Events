import { dialog, floorPlan, icons, mobile, search, table, theme } from './styles'


export const getStyles = breakpoint => /* css */`
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
