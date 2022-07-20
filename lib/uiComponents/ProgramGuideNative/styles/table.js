export default /* css */`
.pg-table-wrapper {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  height: var(--rem-60);
  max-height: 60vh;
  max-width: 100%;
  margin-bottom: var(--rem-1);
  overflow: auto;
  position: relative;
  z-index: 0;
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
  font-size: 2.5em;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 2.5em;
}
.pg-cell-wrapper--search-header,
.pg-cell-wrapper--row-header,
.pg-cell-wrapper--corner {
  border-right: var(--rem-0-1) solid var(--color-background);
  left: 0;
  position: sticky;
  width: 0; /* columns size to the minimum width */
  z-index: 1;
}
.pg-cell-wrapper--search-header,
.pg-cell-wrapper--corner {
  background-color: var(--color-corner);
  border-bottom: var(--rem-0-1) solid var(--color-background);
  color: var(--color-corner-content);
  top: 0;
  z-index: 2;
}
.pg-cell-wrapper--corner {
  cursor: pointer;
}
.pg-cell-wrapper--row-header {
  background-color: var(--color-row-header);
  box-shadow: 0 var(--rem-0-2) 0 var(--color-background);
  color: var(--color-row-header-content);
  font-family: var(--font-row-header);
  padding: var(--padding-row-header);
  text-align: right;
}
.pg-cell-wrapper--row-header-time {
  padding-right: var(--rem-4);
  padding-left: var(--rem-0-5);
}
.pg-cell--corner,
.pg-cell--row-header {
  margin: auto;
  width: var(--rem-9);
}
.pg-cell--row-header-time,
.pg-cell--row-header-location {
  height: 100%;
  min-height: var(--rem-5);
  user-select: none;
}
.pg-cell--row-header-time {
  cursor: pointer;
}
.pg-cell-wrapper--row-header .pg-cell {
  align-items: center;
  display: grid;
  gap: var(--rem-0-5);
  grid-template-columns: auto 1fr;
}
.pg-cell--data {
  position: sticky;
  left: var(--rem-14);
  width: fit-content;
  z-index: 0;
  top: var(--rem-8);
}
.pg-cell--data-time {
  max-width: 18ch;
}
.pg-cell--data-search,
.pg-cell--data-favorite {
  display: grid;
  left: 0;
  justify-content: center;
  margin: auto;
  text-align: center;
}
.pg-search-result-name {
  font-weight: bold;
  padding-bottom: var(--rem-0-8);
}
.pg-inline-text {
  display: inline-block;
}
.pg-cell-wrapper--column-header {
  background-color: var(--color-column-header);
  border-bottom: var(--rem-0-1) solid var(--color-background);
  color: var(--color-column-header-content);
  font-family: var(--font-column-header);
  padding: var(--padding-column-header);
  position: sticky;
  top: 0;
  z-index: 1;
}
.pg-cell-wrapper--column-header-location {
  cursor: pointer;
}
.pg-cell-wrapper--column-header-active-location,
.pg-cell-wrapper--column-header-active-time {
  filter: brightness(1.3);
}
.pg-cell-wrapper--column-header-active-time > .pg-cell {
  grid-template-columns: 1fr;
  gap: 0;
}
.pg-cell--column-header {
  align-items: center;
  display: grid;
  gap: var(--rem-1);
  grid-template-columns: auto 1fr;
  justify-content: center;
  min-width: var(--rem-8);
}
.pg-cell-wrapper--data {
  cursor: pointer;
  text-align: left;
  vertical-align: top;
}
.pg-cell-wrapper--data-empty {
  background-color: var(--color-empty);
}
.pg-time {
  display: inline-block;
  font-weight: bold;
}
`
