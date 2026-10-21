import loginPage from '../pages/loginPage'
import inventoryPage from '../pages/inventoryPage'

describe('Login functionality', () => {
  beforeEach(() => {
    cy.fixture('users').as('users')
    loginPage.visit()
  })

  it('should login successfully with valid credentials', function () {
    const { username, password } = this.users.standard
    loginPage.login(username, password)

    inventoryPage.assertIsOpen()
  })

  it('should logout and return to the login page', function () {
    const { username, password } = this.users.standard
    loginPage.login(username, password)
    inventoryPage.logout()

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    loginPage.elements.submit().should('be.visible')
  })
})
