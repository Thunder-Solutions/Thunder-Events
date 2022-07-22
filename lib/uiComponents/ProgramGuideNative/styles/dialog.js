export default /* css */`
.pg-dialog {
  background-color: var(--color-header);
  bottom: 0;
  border: 0 solid;
  border-radius: var(--rem-0-5);
  box-shadow: 0 0 var(--rem-1) rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: var(--color-header-content);
  height: max-content;
  left: 0;
  margin: auto;
  max-height: 100%;
  max-width: var(--rem-40);
  min-height: var(--rem-40);
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: calc(100% - var(--rem-0-5));
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
  position: relative;
}
.pg-dialog-title {
  margin: 0;
}
.pg-dialog-details {
  padding-top: var(--rem-1);
}
.pg-dialog-select {
  border: 0 solid;
  border-radius: var(--rem-0-3);
  padding: var(--rem-0-5);
}
.pg-dialog-close {
  align-items: center;
  background-color: var(--color-header-content);
  border: 0 solid;
  border-radius: 50%;
  color: var(--color-header);
  cursor: pointer;
  display: flex;
  height: var(--rem-2);
  justify-content: center;
  width: var(--rem-2);
}
.pg-dialog-menu {
  display: grid;
  gap: var(--rem-0-5);
  margin: 0 auto;
  max-width: var(--rem-30);
  padding: var(--rem-2) var(--rem-2) 0;
}
.pg-dialog-menu-title {
  align-items: center;
  display: grid;
  gap: var(--rem-1);
  grid-auto-flow: column;
  width: max-content;
  margin: 0 auto;
}
.pg-dialog-menu-item {
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
  text-decoration: none;
}
.pg-dialog-menu-item-hidden {
  opacity: 0.65;
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
  width: var(--rem-10-2);
}
.pg-dialog-menu-special-item {
  display: grid;
  gap: var(--rem-0-5);
  grid-template-columns: 2fr 1fr;
}
.pg-dialog-body {
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  max-height: calc(100vh - var(--rem-9-2));
  min-height: var(--rem-38);
  font-size: var(--font-size);
  overflow: hidden;
  position: relative;
}
.pg-dialog-body:before,
.pg-dialog-body:after {
  content: '\\02771';
  color: var(--color-header);
  display: inline-block;
  height: 1em;
  left: 0;
  font-size: 3em;
  line-height: 1em;
  margin: auto;
  position: absolute;
  right: 0;
  width: 1em;
}
.pg-dialog-body:before {
  top: 0.36em;
  transform: rotate(-90deg);
}
.pg-dialog-body:after {
  bottom: -0.5em;
  transform: rotate(90deg);
}
.pg-dialog-content {
  overflow: auto;
  padding-bottom: var(--rem-2);
  margin-top: var(--rem-1);
}
.pg-dialog-content--text-container,
.pg-dialog-footer {
  background-color: var(--color-cell);
  border: 0 solid;
  border-radius: var(--rem-0-5);
  color: var(--color-content);
  margin: var(--rem-2) 0 0;
  text-align: center;
}
.pg-dialog-content--text-container:after {
  background-image: linear-gradient(transparent, var(--color-cell) 90%);
  bottom: var(--rem--2);
  content: '';
  display: block;
  height: var(--rem-4);
  left: 0;
  position: sticky;
  width: 100%;
}
.pg-dialog-paragraph {
  margin: 0;
  padding: var(--rem-1);
}
.pg-dialog-footer {
  padding: var(--rem-1);
}
`
