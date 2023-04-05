export default /* css */`
.pg-search-bar {
  --space: var(--rem-0-2);
  --dbl-space: calc(var(--space) * 2);
  background-color: var(--color-background);
  display: grid;
  gap: var(--space);
  grid-template-columns: 1fr auto auto;
  height: 100%;
  left: 0;
  margin: 0;
  padding: var(--space) var(--space) 0;
  position: absolute;
  top: calc(-100% - var(--space));
  width: calc(100% - var(--dbl-space));
  transition: top 0.3s;
  z-index: 1;
}
.pg-search-bar--active {
  top: 0;
}
.pg-search-input,
.pg-search-button {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 var(--rem-1-2) rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: var(--rem-0-5);
  justify-content: center;
  padding: var(--rem-1) var(--rem-0-5);
}
.pg-search-input {
  cursor: text;
}
.pg-search-input,
.pg-search-button {
  padding: var(--rem-0-5) var(--rem-1);
}
.pg-search-input {
  min-width: 0;
}
`
