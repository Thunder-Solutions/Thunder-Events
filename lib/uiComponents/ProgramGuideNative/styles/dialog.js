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
  min-height: 50vh;
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
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
  padding-top: var(--rem-0-3);
  position: relative;
}
.pg-dialog-title {
  margin: 0;
}
.pg-dialog-select {
  border: 0 solid;
  border-radius: var(--rem-0-3);
  padding: var(--rem-0-5);
  width: 100%;
}
.pg-dialog-close {
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--color-header-content);
  cursor: pointer;
  display: flex;
  height: var(--rem-2);
  justify-content: center;
}
.pg-dialog-menu {
  display: grid;
  gap: var(--rem-0-2);
  margin: 0 auto;
  max-width: var(--rem-30);
  padding: var(--rem-0-5) var(--rem-2) 0;
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
  overflow: hidden;
  padding-bottom: var(--rem-1-2);
  position: relative;
}
.pg-dialog-content {
  overflow: auto;
  padding: var(--rem-1) 0;
}
.pg-event-dialog-info {
  border: 0 solid;
  border-radius: var(--rem-0-5);
  color: var(--color-foreground);
  display: flex;
  gap: var(--rem-1);
  place-items: center;
  padding: var(--rem-0-2);
  padding-top: var(--rem-1);
}
.pg-event-dialog-button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: grid;
  font-size: 0.65em;
  grid-template-rows: 1fr auto;
  height: 100%;
  justify-items: center;
}
.pg-event-dialog-content {
  overflow: auto;
}
.pg-dialog-paragraph {
  margin: 0;
  padding: var(--rem-0-2);
}
.pg-dialog-button {
  background: transparent;
  border: none;
  color: var(--color-content);
  cursor: pointer;
}
`
