export default /* css */`
.pg-cell-wrapper--column-header,
.pg-cell-wrapper--data,
.pg-cell-wrapper--data-empty {
  display: none;
}
.pg-cell-wrapper--column-header-active,
.pg-cell-wrapper--column-header-time,
.pg-cell-wrapper--data-active,
.pg-cell-wrapper--data-time,
.pg-cell-wrapper--data-favorite,
.pg-cell-wrapper--data-search,
.pg-cell-wrapper--data-empty-time,
.pg-cell-wrapper--data-empty-active {
  filter: none;
  display: revert;
  min-width: 0;
}
.pg-cell--data {
  margin: 0;
}
.pg-cell--data-search,
.pg-cell--data-favorite {
  margin: auto;
}
.pg-floor-plan-header {
  grid-template-areas:
    "title title"
    "view view";
}
.pg-floor-plan-title {
  text-align: center;
}
.pg-floor-plan-menu-section {
  grid-template-columns: auto 1fr;
  gap: var(--rem-1);
}
.pg-cell-wrapper--corner,
.pg-cell-wrapper--row-header-time,
.pg-cell-wrapper--row-header-time:after {
  transition: all 0.5s;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-time {
  cursor: pointer;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-time:after {
  bottom: 0;
  content: 'COLLAPSE \\25C0';
  writing-mode: vertical-lr;
  display: inline-block;
  font-size: var(--rem-1);
  font-weight: normal;
  height: 100%;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed,
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed {
  left: var(--rem--11);
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed:after {
  content: 'EXPAND \\25C0';
  transform: rotate(180deg);
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed .pg-cell--row-header {
  pointer-events: none;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed {
  padding-right: 0;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed .pg-corner-text {
  order: -1;
}
`
