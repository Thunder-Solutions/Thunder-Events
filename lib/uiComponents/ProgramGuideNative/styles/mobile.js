export default /* css */`
.pg-cell-wrapper--column-header,
.pg-cell-wrapper--data,
.pg-cell-wrapper--data-empty {
  display: none;
}
.pg-cell-wrapper--column-header-active,
.pg-cell-wrapper--column-header-time,
.pg-cell-wrapper--column-header-location,
.pg-cell-wrapper--data-active,
.pg-cell-wrapper--data-time,
.pg-cell-wrapper--data-location,
.pg-cell-wrapper--data-favorite,
.pg-cell-wrapper--data-search,
.pg-cell-wrapper--data-empty-time,
.pg-cell-wrapper--data-empty-location,
.pg-cell-wrapper--data-empty-active {
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
.pg-cell--column-header {
  min-width: calc(100vw - var(--rem-9-3));
}
.pg-nav-bar {
  gap: var(--rem-1);
  width: 100%;
}
`
