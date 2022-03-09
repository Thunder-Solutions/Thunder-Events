export const getStyles = breakpoint => /* css */`
  :host,
  ::before,
  ::after {
    --font: inherit;
    --font-cell: var(--font);
    --font-header: var(--font);
    --font-column-header: var(--font-header);
    --font-row-header: var(--font-header);
    --padding-cell: 1rem 2rem;
    --padding-header: var(--padding-cell);
    --padding-column-header: var(--padding-header);
    --padding-row-header: var(--padding-header);
    --color-background: midnightblue;
    --color-cell: lightsteelblue;
    --color-cell-empty: transparent;
    --color-cell-content: black;
    --color-header: steelblue;
    --color-header-content: white;
    --color-column-header: var(--color-header);
    --color-column-header-content: var(--color-header-content);
    --color-row-header: var(--color-header);
    --color-row-header-content: var(--color-header-content);
    --color-corner: var(--color-header);
    --color-corner-content: var(--color-header-content);
  }
  .pg-table-wrapper {
    overflow: auto;
    max-width: 100%;
    margin-bottom: 1rem;
    position: relative;
  }
  .pg-table {
    background-color: var(--color-background);
    width: 100%;
  }
  .pg-cell-wrapper {
    background-color: var(--color-cell);
    font: var(--font-cell);
    padding: var(--padding-cell);
    text-align: center;
  }
  .pg-cell-wrapper--corner {
    background-color: var(--color-corner);
    color: var(--color-corner-content);
    cursor: pointer;
    width: 10em; /* columns size to the minimum width */
  }
  .pg-cell-wrapper--row-header {
    background-color: var(--color-row-header);
    color: var(--color-row-header-content);
    font: var(--font-row-header);
    padding: var(--padding-row-header);
    text-align: right;
  }
  .pg-cell-wrapper--row-header,
  .pg-cell-wrapper--corner {
    border-right: 0.1rem solid var(--color-background);
    left: 0;
    position: sticky;
    z-index: 1;
  }
  .pg-cell--data {
    position: sticky;
    left: 10em;
    margin: auto;
    width: fit-content;
    z-index: 0;
  }
  .pg-cell--corner {
    align-items: center;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto auto;
    justify-content: center;
  }
  .pg-cell-wrapper--column-header {
    background-color: var(--color-column-header);
    color: var(--color-column-header-content);
    font: var(--font-column-header);
    padding: var(--padding-column-header);
  }
  .pg-cell--column-header {
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: center;
    min-width: 8em;
  }
  .pg-cell-wrapper--data {
    cursor: pointer;
  }
  .pg-cell-wrapper--data-empty {
    background-color: var(--color-cell-empty);
  }
  .pg-loading {
    --color-loading-primary: steelblue;
    --color-loading-secondary: white;
    --size-loader: 5rem;
    height: 10rem;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .pg-loading::before,
  .pg-loading::after {
    bottom: 0;
    border-radius: 50%;
    content: '';
    display: block;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }
  .pg-loading::before {
    animation: spin 1s linear infinite;
    background-image: conic-gradient(var(--color-loading-primary), var(--color-loading-secondary));
    border: 0.4rem solid var(--color-loading-primary);
    height: var(--size-loader);
    width: var(--size-loader);
    z-index: 1;
  }
  .pg-loading::after {
    background-color: var(--color-loading-primary);
    border: 0 solid;
    height: calc(var(--size-loader) - 1rem);
    width: calc(var(--size-loader) - 1rem);
    z-index: 2;
  }
  .pg-more-icon {
    background-color: var(--color-header);
    border: 0.5em solid var(--color-header-content);
    display: block;
    position: relative;
    vertical-align: middle;
    z-index: 0;
  }
  .pg-more-icon,
  .pg-more-icon::before,
  .pg-more-icon::after {
    border-radius: 50%;
    height: 0.25em;
    width: 0.25em;
  }
  .pg-more-icon::before,
  .pg-more-icon::after {
    background-color: var(--color-header);
    border: 0 solid;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .pg-more-icon::before {
    left: -0.3em;
  }
  .pg-more-icon::after {
    right: -0.3em;
  }
  .pg-dialog {
    background-color: var(--color-header);
    bottom: 0;
    border: 0 solid;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    color: var(--color-header-content);
    height: 100%;
    left: 0;
    margin: auto;
    max-height: 40em;
    max-width: 40em;
    position: fixed;
    right: 0;
    top: 0;
    width: calc(100% - 0.5rem);
    z-index: 2;
  }
  .pg-dialog-header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .pg-dialog-title {
    margin: 0;
  }
  .pg-dialog-select {
    border: 0 solid;
    border-radius: 0.3rem;
    padding: 0.5rem;
  }
  .pg-dialog-close {
    background-color: var(--color-header-content);
    border: 0 solid;
    border-radius: 50%;
    color: var(--color-header);
    cursor: pointer;
    font-size: 1.6rem;
    height: 2rem;
    width: 2rem;
  }
  .pg-dialog-menu {
    display: grid;
    gap: 0.5rem;
    margin: 0 auto;
    max-width: 20rem;
    padding: 2rem 2rem 0;
  }
  .pg-dialog-menu-title {
    width: max-content;
    margin: 0 auto;
  }
  .pg-dialog-menu-item {
    background-color: var(--color-cell);
    border: none;
    color: var(--color-cell-content);
    cursor: pointer;
    padding: 1rem 0.5rem;
  }
  .pg-dialog-body {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    height: 100%;
  }
  .pg-dialog-content {
    overflow: auto;
  }
  .pg-dialog-content--text-container,
  .pg-dialog-footer {
    background-color: var(--color-cell);
    border: 0 solid;
    border-radius: 0.5rem;
    color: var(--color-cell-content);
    margin: 2rem 0;
    text-align: center;
  }
  .pg-dialog-content--text-container::after {
    background-image: linear-gradient(transparent, var(--color-cell));
    bottom: 0;
    content: '';
    display: block;
    height: 4rem;
    left: 0;
    position: sticky;
    width: 100%;
  }
  .pg-dialog-paragraph {
    margin: 0;
    padding: 1rem;
  }
  .pg-time {
    display: inline-block;
    font-weight: bold;
  }
  .pg-dialog-footer {
    padding: 1rem;
  }
  @media (max-width: ${breakpoint}) {
    .pg-cell-wrapper--column-header,
    .pg-cell-wrapper--data,
    .pg-cell-wrapper--data-empty {
      display: none;
    }
    .pg-cell-wrapper--column-header-active,
    .pg-cell-wrapper--data-active,
    .pg-cell-wrapper--data-empty-active {
      display: revert;
      min-width: none;
    }
    .pg-cell--data {
      margin: 0;
    }
  }
`
