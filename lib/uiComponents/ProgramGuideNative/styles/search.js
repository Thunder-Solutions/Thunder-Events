export default /* css */`
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
.pg-search-input,
.pg-search-button {
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
.pg-search-input {
  cursor: text;
}
.pg-search-input,
.pg-search-button {
  padding: 0.5rem 1rem;
}
.pg-search-input {
  min-width: 0;
}
`
