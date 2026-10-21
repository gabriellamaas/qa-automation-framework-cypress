# QA Automation Framework - Cypress

[![Cypress Tests](https://github.com/gabriellamaas/qa-automation-framework-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/gabriellamaas/qa-automation-framework-cypress/actions/workflows/cypress.yml)

End-to-end and API test automation framework built with **Cypress** using the **Page Object Model (POM)** design pattern.

This repository demonstrates automated testing for a sample e-commerce application, covering core user flows such as login, cart interaction, product sorting and checkout, plus a small API test suite.

---

## Tech Stack

- Cypress
- JavaScript / Node.js
- Page Object Model (POM)
- `cy.session` for cached authentication
- ESLint (`eslint-plugin-cypress`) + Prettier
- Mochawesome HTML reports (`cypress-mochawesome-reporter`)
- GitHub Actions (CI)

---

## Applications Under Test

- **UI:** https://www.saucedemo.com — a demo store commonly used for automation practice.
- **API:** https://jsonplaceholder.typicode.com — a free fake REST API.

---

## Automated Test Scenarios

**23 tests in total:** 19 UI (E2E) and 4 API.

**Login**

- Successful login with valid credentials
- Logout
- Invalid credentials (validates the error message)
- Locked out user
- Required fields (data-driven: empty username, empty password, both empty)

**Cart**

- Add one item / multiple items
- Remove item from the inventory page and from the cart page

**Product sorting**

- Name (A–Z, Z–A) and price (low–high, high–low), also checking that all 6 products are listed

**Checkout**

- Complete checkout, validating the product in the overview, subtotal and total (subtotal + tax)
- Required customer information (data-driven: first name, last name, postal code)

**API**

- GET a single resource, GET with query params, POST, and 404 for a missing resource

---

## Project Structure

```
.github/workflows/
└── cypress.yml          # CI: lint + Cypress run, uploads report and screenshots

cypress/
├── e2e/                 # Test specs
│   ├── api/
│   │   └── posts.api.cy.js
│   ├── login.cy.js
│   ├── login-negative.cy.js
│   ├── add-to-cart.cy.js
│   ├── sorting.cy.js
│   └── checkout.cy.js
├── fixtures/            # Test data
│   ├── users.json
│   ├── products.json
│   └── checkout.json
├── pages/               # Page Objects
│   ├── loginPage.js
│   ├── inventoryPage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   └── utils.js
└── support/
    ├── commands.js      # cy.login() with cy.session
    └── e2e.js

cypress.config.js
eslint.config.mjs
.prettierrc.json
package.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gabriellamaas/qa-automation-framework-cypress.git
cd qa-automation-framework-cypress
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the tests

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run cy:open`      | Opens the Cypress Test Runner (interactive) |
| `npm test`             | Runs all tests headless                     |
| `npm run test:chrome`  | Runs all tests headless in Chrome           |
| `npm run test:e2e`     | Runs only the UI (E2E) specs                |
| `npm run test:api`     | Runs only the API specs                     |
| `npm run lint`         | Runs ESLint                                 |
| `npm run format:check` | Checks formatting with Prettier             |

After a headless run, the HTML report is generated at `cypress/reports/index.html`.

---

## Example Test

Tests use Page Objects, fixtures and the custom `cy.login()` command:

```javascript
import inventoryPage from '../pages/inventoryPage'
import cartPage from '../pages/cartPage'

describe('Cart', () => {
  beforeEach(() => {
    cy.fixture('products').as('products')
    cy.login()
    inventoryPage.visit()
  })

  it('should add an item to the cart', function () {
    const { backpack } = this.products
    inventoryPage.addToCart(backpack.name)

    inventoryPage.assertCartCount(1)
    inventoryPage.openCart()
    cartPage.assertContainsProduct(backpack.name)
  })
})
```

---

## Best Practices Applied

- **Stable selectors:** every element is located through `data-test` attributes.
- **Page Object Model:** selectors and actions live in `cypress/pages`, keeping specs readable.
- **Cached login:** `cy.login()` logs in through the UI once per user and reuses the session via `cy.session`.
- **Test data in fixtures:** no hardcoded users or customer data in the specs.
- **Data-driven tests** for validation scenarios.
- **Retries in run mode** to reduce flakiness in CI.

---

## Author

Gabriella Maas ˙⋆✮
QA Engineer | Test Automation | Cypress
