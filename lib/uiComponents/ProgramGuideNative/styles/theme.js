export default /* css */`
:host {

  /* general fonts */
  --font: inherit;
  --font-secondary: var(--font);

  /* specific fonts */
  --font-header: var(--font);
  --font-content: var(--font-secondary);
  --font-column-header: var(--font-header);
  --font-row-header: var(--font-header);

  /* padding */
  --padding-cell: 1rem 2rem;
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
}

/* remove browser defaults so fonts can be fully customized */
:host, button, input {
  font-family: var(--font-secondary);
  font-size: inherit;
}
`
