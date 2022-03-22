export default /* css */`
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
  max-height: 100%;
  max-width: 40rem;
  min-height: 40rem;
  overflow: hidden;
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
.pg-dialog-menu-item--input,
.pg-dialog-menu-input {
  cursor: text;
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
  max-height: calc(100vh - 3.5rem);
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
.pg-dialog-footer {
  padding: 1rem;
}
`
