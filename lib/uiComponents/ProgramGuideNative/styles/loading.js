export default /* css */`
.pg-loading {
  --size-loader: var(--rem-8);
  background-color: var(--color-background);
  height: var(--rem-53--3);
  width: 100%;
  position: relative;
  z-index: 1;
}
.pg-loading:before,
.pg-loading:after {
  bottom: 0;
  border-radius: 50%;
  content: '';
  display: block;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}
.pg-loading:before {
  animation: spin 1s linear infinite;
  background-image: conic-gradient(var(--color-loading-primary), var(--color-loading-secondary));
  border: 0.4em solid var(--color-loading-primary);
  height: var(--size-loader);
  width: var(--size-loader);
  z-index: 1;
}
.pg-loading:after {
  background-color: var(--color-loading-primary);
  border: 0 solid;
  height: calc(var(--size-loader) - 1em);
  width: calc(var(--size-loader) - 1em);
  z-index: 2;
}
`
