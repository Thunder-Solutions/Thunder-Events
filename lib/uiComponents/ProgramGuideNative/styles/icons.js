export default /* css */`
.pg-favorite-icon,
.pg-prev-icon,
.pg-more-icon,
.pg-close-icon,
.pg-map-icon,
.pg-print-icon,
.pg-search-icon {
  height: 2em;
  width: 2em;
  background-color: currentColor;
  mask-image: var(--img);
  mask-repeat: no-repeat;
  mask-position: center center;

  /* fallbacks for support */
  -webkit-mask-image: var(--img);
  -webkit-mask-position: center center;
  -webkit-mask-repeat: no-repeat;
}
.pg-favorite-icon {
  --img: url('https://thunder.solutions/icons/star.svg');
}
.pg-prev-icon {
  --img: url('https://thunder.solutions/icons/left-arrow-circle.svg');
}
.pg-more-icon {
  --img: url('https://thunder.solutions/icons/bars.svg');
}
.pg-close-icon {
  --img: url('https://thunder.solutions/icons/x-circle.svg');
}
.pg-map-icon {
  --img: url('https://thunder.solutions/icons/map-pin.svg');
}
.pg-print-icon {
  --img: url('https://thunder.solutions/icons/print.svg');
}
.pg-search-icon {
  --img: url('https://thunder.solutions/icons/magnifying-glass.svg');
}
`
