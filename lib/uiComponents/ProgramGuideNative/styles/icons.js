export default /* css */`
.pg-favorite-icon,
.pg-prev-icon {
  font-size: 2rem;
  font-style: normal;
  line-height: 2rem;
}
.pg-more-icon {
  background-color: var(--color-header);
  border: 0.8rem solid var(--color-header-content);
  display: block;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-more-icon,
.pg-more-icon:before,
.pg-more-icon:after {
  border-radius: 50%;
  height: 0.4rem;
  width: 0.4rem;
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
  left: -0.5rem;
}
.pg-more-icon:after {
  right: -0.5rem;
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
  height: 1.3rem;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 0.2rem;
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
  height: 1.5rem;
  width: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  vertical-align: middle;
  z-index: 0;
}
.pg-map-icon:before {
  border: 0.37rem solid var(--color);
  border-radius: 50%;
  content: '';
  display: block;
  height: 0.75rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 0.75rem;
  z-index: 1;
}
.pg-map-icon:after {
  border: 0.5rem solid var(--color);
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
  transform: translateY(0.3rem) scaleX(0.7) rotate(45deg);
  z-index: 0;
}
`
