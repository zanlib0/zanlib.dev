---
title: On Prettier
pubDate: 14 Jun 2021
updatedDate: 11 Feb 2026
---
Reasons against enforcing Prettier globally on a code-base. Also applies to other "deterministic"/AST-based reprinting formatters such as Biome or dprint.
- The way code is formatted also conveys information and programmer's intent. Unless a specific formatting convention breaks explicit rules, there might be multiple ways of structuring white space in code to convey different kinds of intent.
- The primary issue is `printWidth` enforcement (which cannot be disabled, as it is a "selling point" of the tool). When two lines are similar in function and therefore should look similar, but one sits closer to the `printWidth` limit, Prettier re-formats only that one, breaking the visual parallel.

  Before:
  ```js
  const disable = () => updateFields({ expanded: true, active: true })
  const enable  = () => updateFields({ expanded: false, active: false })
  ```

  After Prettier:
  ```js
  const disable = () => updateFields({ expanded: true, active: true })
  const enable = () =>
    updateFields({ expanded: false, active: false })
  ```

- Method chains with property extraction get exploded into multi-line blocks for no readability gain.

  Before:
  ```js
  export const items = Object
    .values(lookup)
    .map(({ name, type, label, category }) => ({ name, type, label, category }))
  ```

  After Prettier:
  ```js
  export const items = Object.values(lookup).map(
    ({ name, type, label, category }) => ({
      name,
      type,
      label,
      category,
    })
  );
  ```

- Intentional chain formatting in E2E tests gets collapsed. A useful convention: first line retrieves the element, subsequent lines describe actions. Prettier destroys this when short chains fit on one line but longer ones don't.

  Before:
  ```js
  cy.get('[data-testid="login-form"]')
    .find('button')
    .click()

  cy.get('[data-testid="settings-panel"]')
    .find('button')
    .click()

  cy.get('[data-testid="upload-dialog"]')
    .as('uploadDialog')
    .find('input[type="file"]')
    .as('fileInput')
    .scrollIntoView()
    .attachFile('test.csv')
  ```

  After Prettier:
  ```js
  cy.get('[data-testid="login-form"]').find('button').click()

  cy.get('[data-testid="settings-panel"]').find('button').click()

  cy.get('[data-testid="upload-dialog"]')
    .as('uploadDialog')
    .find('input[type="file"]')
    .as('fileInput')
    .scrollIntoView()
    .attachFile('test.csv')
  ```

- Prefer formatters that surgically target problematic sections of code and allow space for programmer's opinions on how to format code such as [Stylistic](https://eslint.style).
