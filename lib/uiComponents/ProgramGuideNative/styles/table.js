export default /* css */`
.pg-table-wrapper {
  background-color: var(--color-background);
  overflow: auto;
  max-width: 100%;
  margin-bottom: 1rem;
  position: relative;
}
.pg-table {
  width: 100%;
}
.pg-cell-wrapper {
  background-color: var(--color-cell);
  font-family: var(--font-content);
  padding: var(--padding-cell);
  position: relative;
  text-align: center;
}
.pg-cell-wrapper--overflow:before {
  content: '\\2039';
  font-size: 2.5rem;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 2.5rem;
}
.pg-cell-wrapper--corner {
  background-color: var(--color-corner);
  color: var(--color-corner-content);
  cursor: pointer;
}
.pg-cell-wrapper--row-header {
  background-color: var(--color-row-header);
  color: var(--color-row-header-content);
  font-family: var(--font-row-header);
  padding: var(--padding-row-header);
  text-align: right;
}
.pg-cell-wrapper--row-header,
.pg-cell-wrapper--corner {
  border-right: 0.1rem solid var(--color-background);
  left: 0;
  position: sticky;
  width: 0; /* columns size to the minimum width */
  z-index: 1;
}
.pg-cell--corner,
.pg-cell--row-header {
  width: 9rem;
}
.pg-cell--row-header {
  pointer-events: none;
  user-select: none;
}
.pg-cell--data {
  position: sticky;
  left: 14rem;
  margin: auto;
  width: fit-content;
  z-index: 0;
}
.pg-cell--data-search,
.pg-cell--data-favorite {
  display: grid;
  left: 0;
  justify-content: center;
  margin: auto;
}
.pg-search-result-name {
  font-weight: bold;
  padding-bottom: 0.8rem;
}
.pg-inline-text {
  display: inline-block;
}
.pg-cell--corner {
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto auto;
  justify-content: center;
  margin: auto;
}
.pg-cell-wrapper--column-header {
  background-color: var(--color-column-header);
  color: var(--color-column-header-content);
  font-family: var(--font-column-header);
  padding: var(--padding-column-header);
}
.pg-cell-wrapper--column-header-active-time {
  filter: brightness(1.3);
}
.pg-cell-wrapper--column-header-active-time > .pg-cell {
  display: grid;
  gap: 0;
}
.pg-cell--column-header {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  min-width: 8rem;
}
.pg-cell-wrapper--data {
  cursor: pointer;
}
.pg-cell-wrapper--data-empty {
  background-color: var(--color-empty);
}
.pg-time {
  display: inline-block;
  font-weight: bold;
}
`
