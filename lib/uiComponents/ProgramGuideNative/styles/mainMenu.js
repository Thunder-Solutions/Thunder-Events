export default /* css */`
  .pg-nav-bar {
    display: grid;
    gap: var(--rem-4);
    grid-auto-flow: column;
    overflow: auto;
    margin: 0 auto;
    padding: 0;
  }
  .pg-nav-bar-button {
    align-items: flex-end;
    background-color: transparent;
    border: none;
    color: var(--color-foreground);
    cursor: pointer;
    display: grid;
    gap: var(--rem-0-5);
    height: var(--rem-6);
    padding: var(--rem-0-5);
    justify-items: center;
  }
  .pg-bars-menu-button {
    align-items: center;
    background-color: var(--color-header);
    border: none;
    color: var(--color-foreground);
    cursor: pointer;
    display: grid;
    gap: var(--rem-0-5);
    padding: var(--rem-0-5);
    justify-items: center;
  }
`
