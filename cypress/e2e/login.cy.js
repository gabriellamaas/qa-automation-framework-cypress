import loginPage from '../pages/loginPage'

describe('Login functionality', () => {

  it('should login successfully with valid credentials', () => {
    loginPage.visit()
    loginPage.fillUsername('standard_user')
    loginPage.fillPassword('secret_sauce')
    loginPage.submit()

    cy.url().should('include', '/inventory.html')
  })

})