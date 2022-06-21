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
  height: var(--rem-0-4);
  width: var(--rem-0-4);
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
  left: var(--rem--0-5);
}
.pg-more-icon:after {
  right: var(--rem--0-5);
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
  height: var(--rem-1-3);
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: var(--rem-0-2);
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
  height: var(--rem-1-5);
  width: var(--rem-1-5);
  margin-bottom: var(--rem-0-5);
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-map-icon:before {
  border: var(--rem-0-37) solid var(--color);
  border-radius: 50%;
  content: '';
  display: block;
  height: var(--rem-0-75);
  left: 0;
  position: absolute;
  top: 0;
  width: var(--rem-0-75);
  z-index: 1;
}
.pg-map-icon:after {
  border: var(--rem-0-5) solid var(--color);
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
  transform: translateY(var(--rem-0-3)) scaleX(0.7) rotate(45deg);
  z-index: 0;
}
`
