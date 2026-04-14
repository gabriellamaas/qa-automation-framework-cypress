# QA Automation Framework - Cypress

End-to-end test automation project built with **Cypress** using the **Page Object Model (POM)** design pattern.

This repository demonstrates automated testing for a sample e-commerce application, covering core user flows such as login, cart interaction, and checkout.

The goal of this project is to showcase best practices for structuring Cypress automation tests.

---

## Tech Stack

- Cypress
- JavaScript
- Node.js
- Page Object Model (POM)

---

## Application Under Test

https://www.saucedemo.com

This demo application is commonly used for automation testing practice.

---

## Automated Test Scenarios

The following scenarios are covered:

- Successful login with valid credentials
- Login validation with invalid credentials
- Add product to cart
- Complete checkout flow

---

## Project Structure

```
cypress/
│
├── e2e/                # Test cases
│   ├── login.cy.js
│   ├── login-negative.cy.js
│   ├── add-to-cart.cy.js
│   └── checkout.cy.js
│
├── pages/              # Page Object Model
│   └── loginPage.js
│
├── fixtures/           # Test data
│
├── support/            # Custom commands and configuration
│   ├── commands.js
│   └── e2e.js
│
cypress.config.js
package.json
```

---

## How to Run the Project

### 1. Clone the repository

git clone https://github.com/gabriellamaas/qa-automation-framework-cypress.git

### 2. Install dependencies

npm install

### 3. Run Cypress

npx cypress open

This will open the Cypress Test Runner where the tests can be executed.

---

## Example Test

Example login automation:

```javascript
describe('Login functionality', () => {

  it('should login successfully with valid credentials', () => {
    cy.visit('/')

    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
  })

})
```

---

## Author

Gabriella Maas ˙⋆✮
QA Engineer | Test Automation | Cypress