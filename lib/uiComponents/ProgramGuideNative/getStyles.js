export const getStyles = breakpoint => /* css */`
  :host {

    /* general fonts */
    --font: inherit;
    --font-secondary: var(--font);

    /* specific fonts */
    --font-header: var(--font);
    --font-content: var(--font-secondary);
    --font-column-header: var(--font-header);
    --font-row-header: var(--font-header);

    /* padding */
    --padding-cell: 1rem 2rem;
    --padding-header: var(--padding-cell);
    --padding-column-header: var(--padding-header);
    --padding-row-header: var(--padding-header);

    /* general colors */
    --color-primary: lightsteelblue;
    --color-primary-contrast: black;
    --color-secondary: steelblue;
    --color-secondary-contrast: white;
    --color-tertiary: midnightblue;

    /* specific colors */
    --color-background: var(--color-tertiary);
    --color-cell: var(--color-primary);
    --color-empty: transparent;
    --color-content: var(--color-primary-contrast);
    --color-header: var(--color-secondary);
    --color-header-content: var(--color-secondary-contrast);
    --color-column-header: var(--color-header);
    --color-column-header-content: var(--color-header-content);
    --color-row-header: var(--color-header);
    --color-row-header-content: var(--color-header-content);
    --color-corner: var(--color-header);
    --color-corner-content: var(--color-header-content);
  }

  /* remove browser defaults so fonts can be fully customized */
  :host, button, input {
    font-family: var(--font-secondary);
    font-size: inherit;
  }

  .pg-search-bar {
    background-color: var(--color-background);
    display: grid;
    gap: 0.2rem;
    grid-template-columns: 1fr auto;
    margin: 0;
    padding: 0.2rem 0.2rem 0;
  }
  .pg-search-icon {
    border: 0.2rem solid;
    border-radius: 50%;
    display: block;
    height: 0.8rem;
    position: relative;
    transform: translate(-0.15rem, -0.1rem);
    width: 0.8rem;
  }
  .pg-search-icon:after {
    background-color: var(--color-content);
    bottom: -0.2rem;
    content: '';
    display: block;
    height: 0.2rem;
    width: 0.5rem;
    position: absolute;
    right: -0.4rem;
    transform: rotate(45deg);
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
  .pg-loading {
    --color-loading-primary: steelblue;
    --color-loading-secondary: white;
    --size-loader: 5rem;
    height: 10rem;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .pg-loading:before,
  .pg-loading:after {
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
  .pg-loading:before {
    animation: spin 1s linear infinite;
    background-image: conic-gradient(var(--color-loading-primary), var(--color-loading-secondary));
    border: 0.4rem solid var(--color-loading-primary);
    height: var(--size-loader);
    width: var(--size-loader);
    z-index: 1;
  }
  .pg-loading:after {
    background-color: var(--color-loading-primary);
    border: 0 solid;
    height: calc(var(--size-loader) - 1rem);
    width: calc(var(--size-loader) - 1rem);
    z-index: 2;
  }
  .pg-favorite-icon {
    font-size: 2rem;
    font-style: normal;
    line-height: 2rem;
  }
  .pg-more-icon {
    background-color: var(--color-header);
    border: 0.8rem solid var(--color-header-content);
    display: block;
    position: relative;
    vertical-align: middle;
    z-index: 0;
  }
  .pg-more-icon,
  .pg-more-icon:before,
  .pg-more-icon:after {
    border-radius: 50%;
    height: 0.4rem;
    width: 0.4rem;
  }
  .pg-more-icon:before,
  .pg-more-icon:after {
    background-color: var(--color-header);
    border: 0 solid;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .pg-more-icon:before {
    left: -0.5rem;
  }
  .pg-more-icon:after {
    right: -0.5rem;
  }
  .pg-dialog {
    background-color: var(--color-header);
    bottom: 0;
    border: 0 solid;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    color: var(--color-header-content);
    height: max-content;
    left: 0;
    margin: auto;
    max-height: 100vh;
    max-width: 40rem;
    min-height: 40rem;
    position: fixed;
    right: 0;
    top: 0;
    width: calc(100% - 0.5rem);
    z-index: 2;
  }
  .pg-dialog + .backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
  /* ::backdrop must be kept separate because of safari */
  .pg-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .pg-dialog-header {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .pg-dialog-title {
    margin: 0;
  }
  .pg-dialog-details {
    padding-top: 1rem;
  }
  .pg-dialog-select {
    border: 0 solid;
    border-radius: 0.3rem;
    padding: 0.5rem;
  }
  .pg-dialog-close {
    align-items: center;
    background-color: var(--color-header-content);
    border: 0 solid;
    border-radius: 50%;
    color: var(--color-header);
    cursor: pointer;
    display: flex;
    height: 2rem;
    justify-content: center;
    width: 2rem;
  }
  .pg-close-icon {
    height: 100%;
    display: block;
    position: relative;
    width: 100%;
  }
  .pg-close-icon:before,
  .pg-close-icon:after {
    background-color: var(--color-header);
    bottom: 0;
    content: '';
    display: block;
    height: 1.3rem;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 0.2rem;
  }
  .pg-close-icon:before {
    transform: rotate(45deg);
  }
  .pg-close-icon:after {
    transform: rotate(-45deg);
  }
  .pg-dialog-menu {
    display: grid;
    gap: 0.5rem;
    margin: 0 auto;
    max-width: 30rem;
    padding: 2rem 2rem 0;
  }
  .pg-dialog-menu-title {
    width: max-content;
    margin: 0 auto;
  }
  .pg-search-input,
  .pg-search-button,
  .pg-dialog-menu-item {
    align-items: center;
    background-color: var(--color-cell);
    border: none;
    box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.5);
    color: var(--color-content);
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 1rem 0.5rem;
  }
  .pg-search-input,
  .pg-dialog-menu-item--input,
  .pg-dialog-menu-input {
    cursor: text;
  }
  .pg-search-input,
  .pg-search-button {
    padding: 0.5rem 1rem;
  }
  .pg-search-input {
    min-width: 0;
  }
  .pg-dialog-menu-input {
    background-color: transparent;
    border: none;
  }
  .pg-dialog-menu-input--time {
    width: 10.2rem;
  }
  .pg-dialog-menu-special-item {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 2fr 1fr;
  }
  .pg-dialog-body {
    display: grid;
    grid-auto-rows: auto;
    grid-template-rows: auto minmax(0, 1fr);
    height: 100%;
    max-height: calc(100vh - 2rem);
    min-height: 38rem;
    overflow: hidden;
    position: relative;
  }
  .pg-dialog-body:before,
  .pg-dialog-body:after {
    content: '\\02771';
    color: var(--color-header);
    display: inline-block;
    font-size: 3rem;
    height: 3rem;
    left: 0;
    line-height: 3rem;
    margin: auto;
    position: absolute;
    right: 0;
    width: 3rem;
  }
  .pg-dialog-body:before {
    top: 1rem;
    transform: rotate(-90deg);
  }
  .pg-dialog-body:after {
    bottom: -1.8rem;
    transform: rotate(90deg);
  }
  .pg-dialog-content {
    overflow: auto;
    padding-bottom: 2rem;
  }
  .pg-dialog-content--text-container,
  .pg-dialog-footer {
    background-color: var(--color-cell);
    border: 0 solid;
    border-radius: 0.5rem;
    color: var(--color-content);
    margin: 2rem 0 0;
    text-align: center;
  }
  .pg-dialog-content--text-container:after {
    background-image: linear-gradient(transparent, var(--color-cell) 90%);
    bottom: -2rem;
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
    .pg-cell-wrapper--column-header-time,
    .pg-cell-wrapper--data-active,
    .pg-cell-wrapper--data-time,
    .pg-cell-wrapper--data-favorite,
    .pg-cell-wrapper--data-search,
    .pg-cell-wrapper--data-empty-time,
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
    .pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed {
      padding-right: 0;
    }
    .pg-table-wrapper--scrolled .pg-cell-wrapper--corner-collapsed .pg-corner-text {
      order: -1;
    }
  }
`
