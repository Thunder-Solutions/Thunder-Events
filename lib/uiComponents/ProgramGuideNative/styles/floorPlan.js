export default /* css */`
.pg-floor-plan-wrapper {
  background-color: var(--color-background);
  margin-bottom: var(--rem-1);
  height: var(--rem-60);
  max-height: 60vh;
  overflow: auto;
  position: relative;
  z-index: 0;
}
.pg-floor-plan-header {
  align-items: center;
  background-color: var(--color-header);
  border: var(--rem-0-2) solid var(--color-background);
  display: grid;
  grid-template-areas: "view title";
  grid-template-columns: auto 1fr;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
}
.pg-floor-plan-menu-button {
  border: 0 solid;
  background-color: transparent;
  cursor: pointer;
  padding: var(--rem-1) var(--rem-1-3);
}
.pg-floor-plan-title {
  color: var(--color-header-content);
  font-size: larger;
  grid-area: title;
  margin: 0;
  padding: var(--rem-1);
  text-align: right;
}
.pg-floor-plan-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: var(--rem-0) var(--rem-0-2) var(--rem-0-2);
  position: relative;
}
.pg-floor-plan-image-wrapper {
  cursor: pointer;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.pg-floor-plan-image {
  display: block;
  margin: 0 auto;
  object-fit: contain;
  width: 100%;
  height: auto;
}
.pg-floor-plan-image-wrapper--interactive {
  cursor: default;
  width: min-content;
}
.pg-floor-plan-image--interactive {
  width: unset;
  height: unset;
}
.pg-overlay-image {
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.pg-floor-plan-marker {
  --x: 0;
  --y: 0;
  align-items: center;
  background-image: radial-gradient(white 25%, rgba(255, 0, 0, 0.2) 25%);
  border: var(--rem-0-1) solid red;
  border-radius: 50%;
  display: grid;
  left: var(--x);
  pointer-events: none;
  position: absolute;
  top: var(--y);
  transform: translate(-50%, -50%);
  height: var(--rem-8);
  justify-items: center;
  width: var(--rem-8);
}
.pg-floor-plan-marker > .pg-map-icon {
  --color: red;
}
.pg-floor-plan-menu {
  align-items: center;
  color: var(--color-header-content);
  display: contents;
  margin: 0;
}
.pg-floor-plan-menu-section {
  align-items: center;
  display: grid;
  gap: var(--rem-0-5);
  grid-area: view;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  padding: var(--rem-0-5);
}
.pg-floor-plan-interactive-button {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 var(--rem-1-2) rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: var(--rem-0-5);
  justify-content: center;
  padding: var(--rem-1) var(--rem-2);
}
.pg-floor-plan-message {
  background-image: linear-gradient(to right, transparent, white, transparent);
  opacity: 0;
  left: 0;
  pointer-events: none;
  position: fixed;
  text-align: center;
  transition: opacity 0.5s;
  width: 100vw;
  z-index: 3;
}
.pg-floor-plan-message--active {
  opacity: 1;
}
`
