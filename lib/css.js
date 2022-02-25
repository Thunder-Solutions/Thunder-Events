export const programGuideStyles = `
  .pg-table {
    --font: sans-serif 1.5rem;
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
    background-color: var(--color-background);
    margin-bottom: 1rem;
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
  }
  .pg-cell-wrapper--row-header {
    background-color: var(--color-row-header);
    color: var(--color-row-header-content);
    font: var(--font-row-header);
    padding: var(--padding-row-header);
    width: 5em;
  }
  .pg-cell-wrapper--column-header {
    background-color: var(--color-column-header);
    color: var(--color-column-header-content);
    font: var(--font-column-header);
    padding: var(--padding-column-header);
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
  @media (min-width: 100em) {
    .pg-fake {
      display: none;
    }
  }
`
