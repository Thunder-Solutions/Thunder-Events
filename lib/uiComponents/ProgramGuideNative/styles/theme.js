export default /* css */`

/* remove browser defaults so fonts can be fully customized */
:host, button, input {
  font-family: var(--font-secondary);
  font-size: inherit;
}

:host {
  display: block;

  /* general fonts */
  --font: inherit;
  --font-secondary: var(--font);
  --font-size: 1rem; /* This sizes everything relatively */

  /* specific fonts */
  --font-header: var(--font);
  --font-content: var(--font-secondary);
  --font-column-header: var(--font-header);
  --font-row-header: var(--font-header);

  /* padding */
  --padding-cell: var(--font-size) calc(var(--font-size) * 2);
  --padding-header: var(--padding-cell);
  --padding-column-header: var(--padding-header);
  --padding-row-header: var(--padding-header);

  /* general colors */
  --color-primary: lightsteelblue;
  --color-primary-contrast: black;
  --color-secondary: steelblue;
  --color-secondary-contrast: white;
  --color-tertiary: midnightblue;
  --color-tertiary-contrast: white;

  /* specific colors */
  --color-background: var(--color-tertiary);
  --color-foreground: var(--color-tertiary-contrast);
  --color-cell: var(--color-primary);
  --color-empty: transparent;
  --color-content: var(--color-primary-contrast);
  --color-header: var(--color-secondary);
  --color-header-content: var(--color-secondary-contrast);
  --color-column-header: var(--color-header);
  --color-column-header-content: var(--color-header-content);
  --color-row-header: var(--color-header);
  --color-row-header-content: var(--color-header-content);
  --color-corner: var(--color-header);
  --color-corner-content: var(--color-header-content);

  /* event background colors */
  /* --color-event-{name of event category} */
  --color-event-featured-event: rgb(155, 170, 207);
  --color-event-panel: rgb(172, 211, 167);
  --color-event-video: rgb(221, 121, 224);
  --color-event-meet-up: rgb(236, 237, 140);

  /* The max z-index determines the z-index value of full-screen mode */
  --max-z-index: 9999;
}

/* set all children to the base font size */
:host > * {
  font-size: var(--font-size);

  /* simulate rems to treat the host element as the root */
  --rem: var(--font-size);
  --rem-0-1: calc(var(--rem) * 0.1);
  --rem-0-2: calc(var(--rem) * 0.2);
  --rem-0-3: calc(var(--rem) * 0.3);
  --rem-0-4: calc(var(--rem) * 0.4);
  --rem-0-5: calc(var(--rem) * 0.5);
  --rem-0-6: calc(var(--rem) * 0.6);
  --rem-0-7: calc(var(--rem) * 0.7);
  --rem-0-8: calc(var(--rem) * 0.8);
  --rem-0-9: calc(var(--rem) * 0.9);
  --rem-1: var(--rem);
  --rem-1-1: calc(var(--rem) * 1.1);
  --rem-1-2: calc(var(--rem) * 1.2);
  --rem-1-3: calc(var(--rem) * 1.3);
  --rem-1-4: calc(var(--rem) * 1.4);
  --rem-1-5: calc(var(--rem) * 1.5);
  --rem-1-6: calc(var(--rem) * 1.6);
  --rem-1-7: calc(var(--rem) * 1.7);
  --rem-1-8: calc(var(--rem) * 1.8);
  --rem-1-9: calc(var(--rem) * 1.9);
  --rem-2: calc(var(--rem) * 2);
  --rem-2-1: calc(var(--rem) * 2.1);
  --rem-2-2: calc(var(--rem) * 2.2);
  --rem-2-3: calc(var(--rem) * 2.3);
  --rem-2-4: calc(var(--rem) * 2.4);
  --rem-2-5: calc(var(--rem) * 2.5);
  --rem-2-6: calc(var(--rem) * 2.6);
  --rem-2-7: calc(var(--rem) * 2.7);
  --rem-2-8: calc(var(--rem) * 2.8);
  --rem-2-9: calc(var(--rem) * 2.9);
  --rem-3: calc(var(--rem) * 3);
  --rem-3-1: calc(var(--rem) * 3.1);
  --rem-3-2: calc(var(--rem) * 3.2);
  --rem-3-3: calc(var(--rem) * 3.3);
  --rem-3-4: calc(var(--rem) * 3.4);
  --rem-3-5: calc(var(--rem) * 3.5);
  --rem-3-6: calc(var(--rem) * 3.6);
  --rem-3-7: calc(var(--rem) * 3.7);
  --rem-3-8: calc(var(--rem) * 3.8);
  --rem-3-9: calc(var(--rem) * 3.9);
  --rem-4: calc(var(--rem) * 4);
  --rem-4-1: calc(var(--rem) * 4.1);
  --rem-4-2: calc(var(--rem) * 4.2);
  --rem-4-3: calc(var(--rem) * 4.3);
  --rem-4-4: calc(var(--rem) * 4.4);
  --rem-4-5: calc(var(--rem) * 4.5);
  --rem-4-6: calc(var(--rem) * 4.6);
  --rem-4-7: calc(var(--rem) * 4.7);
  --rem-4-8: calc(var(--rem) * 4.8);
  --rem-4-9: calc(var(--rem) * 4.9);
  --rem-5: calc(var(--rem) * 5);
  --rem-5-1: calc(var(--rem) * 5.1);
  --rem-5-2: calc(var(--rem) * 5.2);
  --rem-5-3: calc(var(--rem) * 5.3);
  --rem-5-4: calc(var(--rem) * 5.4);
  --rem-5-5: calc(var(--rem) * 5.5);
  --rem-5-6: calc(var(--rem) * 5.6);
  --rem-5-7: calc(var(--rem) * 5.7);
  --rem-5-8: calc(var(--rem) * 5.8);
  --rem-5-9: calc(var(--rem) * 5.9);
  --rem-6: calc(var(--rem) * 6);
  --rem-6-1: calc(var(--rem) * 6.1);
  --rem-6-2: calc(var(--rem) * 6.2);
  --rem-6-3: calc(var(--rem) * 6.3);
  --rem-6-4: calc(var(--rem) * 6.4);
  --rem-6-5: calc(var(--rem) * 6.5);
  --rem-6-6: calc(var(--rem) * 6.6);
  --rem-6-7: calc(var(--rem) * 6.7);
  --rem-6-8: calc(var(--rem) * 6.8);
  --rem-6-9: calc(var(--rem) * 6.9);
  --rem-7: calc(var(--rem) * 7);
  --rem-7-1: calc(var(--rem) * 7.1);
  --rem-7-2: calc(var(--rem) * 7.2);
  --rem-7-3: calc(var(--rem) * 7.3);
  --rem-7-4: calc(var(--rem) * 7.4);
  --rem-7-5: calc(var(--rem) * 7.5);
  --rem-7-6: calc(var(--rem) * 7.6);
  --rem-7-7: calc(var(--rem) * 7.7);
  --rem-7-8: calc(var(--rem) * 7.8);
  --rem-7-9: calc(var(--rem) * 7.9);
  --rem-8: calc(var(--rem) * 8);
  --rem-8-1: calc(var(--rem) * 8.1);
  --rem-8-2: calc(var(--rem) * 8.2);
  --rem-8-3: calc(var(--rem) * 8.3);
  --rem-8-4: calc(var(--rem) * 8.4);
  --rem-8-5: calc(var(--rem) * 8.5);
  --rem-8-6: calc(var(--rem) * 8.6);
  --rem-8-7: calc(var(--rem) * 8.7);
  --rem-8-8: calc(var(--rem) * 8.8);
  --rem-8-9: calc(var(--rem) * 8.9);
  --rem-9: calc(var(--rem) * 9);
  --rem-9-1: calc(var(--rem) * 9.1);
  --rem-9-2: calc(var(--rem) * 9.2);
  --rem-9-3: calc(var(--rem) * 9.3);
  --rem-9-4: calc(var(--rem) * 9.4);
  --rem-9-5: calc(var(--rem) * 9.5);
  --rem-9-6: calc(var(--rem) * 9.6);
  --rem-9-7: calc(var(--rem) * 9.7);
  --rem-9-8: calc(var(--rem) * 9.8);
  --rem-9-9: calc(var(--rem) * 9.9);
  --rem-10: calc(var(--rem) * 10);

  /* odd sizes */
  --rem--11: calc(var(--rem) * -11);
  --rem--2: calc(var(--rem) * -2);
  --rem--1-8: calc(var(--rem) * -1.8);
  --rem--0-5: calc(var(--rem) * -0.5);
  --rem--0-4: calc(var(--rem) * -0.4);
  --rem--0-2: calc(var(--rem) * -0.2);
  --rem--0-15: calc(var(--rem) * -0.15);
  --rem--0-1: calc(var(--rem) * -0.1);
  --rem-0-37: calc(var(--rem) * 0.37);
  --rem-0-75: calc(var(--rem) * 0.75);
  --rem-10-2: calc(var(--rem) * 10.2);
  --rem-14: calc(var(--rem) * 14);
  --rem-38: calc(var(--rem) * 38);
  --rem-40: calc(var(--rem) * 40);
  --rem-60: calc(var(--rem) * 60);
}
`
