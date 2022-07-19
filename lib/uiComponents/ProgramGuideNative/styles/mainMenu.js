export default /* css */`
  .pg-main-menu {
    display: grid;
    gap: var(--rem-1);
    grid-column-end: span 2;
    grid-template-columns: repeat(5, 1fr);
    overflow: auto;
    margin: 0 auto;
    max-width: 100%;
    padding: 0;
  }
  .pg-main-menu-button {
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
`
