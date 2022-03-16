export default /* css */`
.pg-floor-plan-wrapper {
  background-color: var(--color-background);
  margin-bottom: 1rem;
  height: 60rem;
  max-height: 60vh;
  overflow: auto;
  position: relative;
  z-index: 0;
}
.pg-floor-plan-header {
  align-items: center;
  background-color: var(--color-header);
  border: 0.2rem solid var(--color-background);
  display: grid;
  grid-template-areas: "options view title";
  grid-template-columns: auto 1fr auto;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;
}
.pg-floor-plan-menu-button {
  border: 0 solid;
  background-color: transparent;
  cursor: pointer;
  padding: 1rem 1.3rem;
}
.pg-floor-plan-title {
  color: var(--color-header-content);
  margin: 0;
  padding: 1rem;
  text-align: right;
}
.pg-floor-plan-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  overflow: auto;
  padding: 0rem 0.2rem 0.2rem;
  position: relative;
}
.pg-floor-plan-image-wrapper {
  margin: 0 auto;
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
  border: 0.1rem solid red;
  border-radius: 50%;
  display: grid;
  left: var(--x);
  pointer-events: none;
  position: absolute;
  top: var(--y);
  transform: translate(-50%, -50%);
  height: 8rem;
  justify-items: center;
  width: 8rem;
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
  gap: 0.5rem;
  grid-area: view;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  padding: 0.5rem;
}
.pg-floor-plan-interactive-button {
  align-items: center;
  background-color: var(--color-cell);
  border: none;
  box-shadow: 0 0 1.2rem rgba(0, 0, 0, 0.5);
  color: var(--color-content);
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 2rem;
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
