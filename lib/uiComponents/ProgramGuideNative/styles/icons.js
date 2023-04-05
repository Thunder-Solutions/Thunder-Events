export default /* css */`
.pg-favorite-icon,
.pg-prev-icon,
.pg-more-icon,
.pg-close-icon,
.pg-map-icon,
.pg-print-icon,
.pg-search-icon,
.pg-schedule-icon,
.pg-fullscreen-icon,
.pg-restore-icon,
.pg-target-icon,
.pg-location-icon,
.pg-view-location-icon,
.pg-view-time-icon,
.pg-date-icon {
  background-color: currentColor;
  display: inline-block;
  height: 2em;
  mask-image: var(--img);
  mask-repeat: no-repeat;
  mask-position: center center;
  width: 2em;

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
  --img: url('https://thunder.solutions/icons/map-with-pin.svg');
}
.pg-print-icon {
  --img: url('https://thunder.solutions/icons/print.svg');
}
.pg-search-icon {
  --img: url('https://thunder.solutions/icons/magnifier.svg');
}
.pg-schedule-icon {
  --img: url('https://thunder.solutions/icons/clock.svg');
}
.pg-fullscreen-icon {
  --img: url('https://thunder.solutions/icons/full-window.svg');
}
.pg-restore-icon {
  --img: url('https://thunder.solutions/icons/windows.svg');
}
.pg-target-icon {
  --img: url('https://thunder.solutions/icons/crosshairs.svg');
}
.pg-location-icon {
  --img: url('https://thunder.solutions/icons/map-pin.svg');
}
.pg-view-location-icon {
  --img: url('https://thunder.solutions/icons/magnifier-with-map-pin.svg');
}
.pg-view-time-icon {
  --img: url('https://thunder.solutions/icons/magnifier-with-clock.svg');
}
.pg-date-icon {
  --img: url('https://thunder.solutions/icons/calendar.svg');
}
`
