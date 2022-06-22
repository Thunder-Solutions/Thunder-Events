export default /* css */`
.pg-favorite-icon,
.pg-prev-icon {
  font-size: var(--rem-2);
  font-style: normal;
  line-height: var(--rem-2);
}
.pg-more-icon {
  background-color: var(--color-header);
  border: var(--rem-0-8) solid var(--color-header-content);
  display: block;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-more-icon,
.pg-more-icon:before,
.pg-more-icon:after {
  border-radius: 50%;
  height: 0.4em;
  width: 0.4em;
}
.pg-more-icon:before,
.pg-more-icon:after {
  background-color: var(--color-header);
  border: 0 solid;
  content: '';
  display: block;
  position: absolute;
  top: 0;
  z-index: 1;
}
.pg-more-icon:before {
  left: -0.5em;
}
.pg-more-icon:after {
  right: -0.5em;
}
.pg-close-icon {
  height: 100%;
  display: block;
  position: relative;
  width: 100%;
}
.pg-close-icon:before,
.pg-close-icon:after {
  background-color: var(--color-header);
  bottom: 0;
  content: '';
  display: block;
  height: 1.3em;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 0.2em;
}
.pg-close-icon:before {
  transform: rotate(45deg);
}
.pg-close-icon:after {
  transform: rotate(-45deg);
}
.pg-map-icon {
  --color: var(--color-header-content);
  display: inline-block;
  height: 1.5em;
  width: 1.5em;
  margin-bottom: 0.5em;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-map-icon:before {
  border: 0.37em solid var(--color);
  border-radius: 50%;
  content: '';
  display: block;
  height: 0.75em;
  left: 0;
  position: absolute;
  top: 0;
  width: 0.75em;
  z-index: 1;
}
.pg-map-icon:after {
  border: 0.5em solid var(--color);
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 20%;
  bottom: 0;
  content: '';
  display: block;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(0.3em) scaleX(0.7) rotate(45deg);
  z-index: 0;
}
`
