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
  scroll-snap-type: both mandatory;
  z-index: 0;
}
.pg-table {
  width: 100%;
}
.pg-row--time {
  height: 0;
}
.pg-cell-wrapper {
  background-color: var(--color-cell);
  font-family: var(--font-content);
  padding: var(--padding-cell);
  position: relative;
  scroll-snap-align: end;
  text-align: center;
}
.pg-cell-wrapper--overflow:before {
  content: '\\2303';
  font-size: 2.5em;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.pg-cell-wrapper--corner,
.pg-cell-wrapper--search-header,
.pg-cell-wrapper--row-header {
  border-right: var(--rem-0-1) solid var(--color-background);
  left: 0;
  min-width: var(--rem-3);
  position: sticky;
  width: 0; /* columns size to the minimum width */
  z-index: 1;
}
.pg-cell-wrapper--search-header {
  background-color: var(--color-corner);
  border-bottom: var(--rem-0-1) solid var(--color-background);
  color: var(--color-corner-content);
  top: 0;
  z-index: 2;
}
.pg-cell-wrapper--corner {
  background-color: var(--color-background);
  padding: 0;
  z-index: 2;
}
.pg-cell-wrapper--row-header {
  background-color: var(--color-row-header);
  box-shadow: 0 var(--rem-0-2) 0 var(--color-background);
  color: var(--color-row-header-content);
  font-family: var(--font-row-header);
  height: var(--rem-8);
  padding: 0;
  text-align: right;
}
.pg-cell-wrapper--row-header-time {
  padding-right: var(--rem-4);
  padding-left: var(--rem-0-5);
}
.pg-cell--row-header {
  margin: auto;
  width: var(--rem-9);
}
.pg-cell--row-header-time,
.pg-cell--row-header-location {
  height: 100%;
  min-height: var(--rem-5);
  user-select: none;
  position: relative;
}
.pg-cell--row-header-time {
  cursor: pointer;
}
.pg-cell-wrapper--row-header .pg-cell {
  position: absolute;
  top: 0;
  left: 0;
}
.pg-inner-cell {
  padding-top: var(--rem-1);
  text-align: center;
  transform: translateX(-100%) rotate(270deg);
  transform-origin: top right;
  width: var(--rem-8);
  white-space: pre;
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
.pg-cell-wrapper--column-header {
  background-color: var(--color-background);
  box-sizing: border-box;
  color: var(--color-column-header-content);
  font-family: var(--font-column-header);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1;
}
.pg-location-name {
  align-items: center;
  font-size: inherit;
  color: inherit;
  display: grid;
  background-color: transparent;
  border: none;
  cursor: pointer;
  gap: var(--rem-1);
  grid-template-columns: auto 1fr;
  margin-right: var(--rem-2);
}
.pg-location-name .pg-inline-text {
  text-align: left;
}
.pg-header-button {
  background-color: var(--color-tertiary);
  border: none;
  color: inherit;
  cursor: pointer;
  display: grid;
  font-size: 0.65em;
  grid-template-rows: 1fr auto;
  height: 100%;
  justify-items: center;
}
.pg-button-label-text {
  white-space: pre;
  width: max-content;
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
  box-sizing: border-box;
  display: grid;
  font-size: var(--rem-1-2);
  gap: var(--rem-1);
  grid-auto-flow: column;
  padding: var(--rem-0-5);
  padding-right: var(--rem-2);
}
.pg-cell--column-header-list,
.pg-cell--column-header-location {
  grid-template-columns: minmax(0, 1fr) auto auto;
}
.pg-cell--column-header-location {
  width: calc(var(--body-width) - var(--rem-3-5));
}
.pg-cell--column-header:not(:last-child) {
  margin-bottom: var(--rem-1);
}
.pg-cell-wrapper--data {
  cursor: pointer;
  text-align: left;
  vertical-align: top;
}
.pg-cell-wrapper--data-empty {
  background-color: var(--color-empty);
}
.pg-cell-wrapper--data-time {
  text-align: center;
  font-weight: bold;
  background-color: transparent;
  color: var(--color-column-header-content);
}
.pg-time {
  display: inline-block;
  font-weight: bold;
}
`
