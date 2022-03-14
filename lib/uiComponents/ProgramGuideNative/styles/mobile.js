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
    "options title"
    "view view";
}
.pg-floor-plan-menu-section {
  grid-template-columns: auto 1fr;
  gap: 1rem;
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
  content: '\\25C0';
  display: inline-block;
  font-size: 1rem;
  height: 1rem;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed,
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed {
  left: -9.5rem;
}
.pg-table-wrapper--scrolled .pg-cell-wrapper--row-header-collapsed:after {
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
