export default /* css */`
  .pg-main-menu {
    display: grid;
    gap: 1rem;
    grid-column-end: span 2;
    grid-template-columns: repeat(4, 1fr);
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
    gap: 0.5rem;
    height: 6rem;
    padding: 0.5rem;
    justify-items: center;
  }
`
