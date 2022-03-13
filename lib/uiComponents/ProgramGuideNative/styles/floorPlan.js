export default /* css */`
.pg-floor-plan-wrapper {
  background-color: var(--color-background);
  margin-bottom: 1rem;
}
.pg-floor-plan-header {
  background-color: var(--color-header);
  border: 0.2rem solid var(--color-background);
  display: grid;
  grid-template-columns: auto 1fr;
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
  overflow: auto;
  padding: 0rem 0.2rem 0.2rem;
  position: relative;
}
.pg-floor-plan-image-wrapper {
  position: relative;
}
.pg-floor-plan-image {
  display: block;
  margin: 0 auto;
  object-fit: contain;
  width: 100%;
  height: auto;
}
.pg-floor-plan-image--interactive {
  width: unset;
  height: unset;
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
  color: var(--color-foreground);
  display: grid;
  gap: 1rem;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  max-width: 50rem;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  right: 0;
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
`
