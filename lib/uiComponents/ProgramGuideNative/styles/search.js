export default /* css */`
.pg-search-bar {
  background-color: var(--color-background);
  display: grid;
  gap: var(--rem-0-2);
  grid-template-columns: 1fr auto;
  margin: 0;
  padding: var(--rem-0-2) var(--rem-0-2) 0;
}
.pg-search-icon {
  border: var(--rem-0-2) solid;
  border-radius: 50%;
  display: block;
  height: var(--rem-0-8);
  position: relative;
  transform: translate(var(--rem--0-15), var(--rem--0-1));
  width: var(--rem-0-8);
}
.pg-search-icon:after {
  background-color: var(--color-content);
  bottom: -0.2em;
  content: '';
  display: block;
  height: 0.2em;
  width: 0.5em;
  position: absolute;
  right: -0.4em;
  transform: rotate(45deg);
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
