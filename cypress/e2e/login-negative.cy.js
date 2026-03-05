import loginPage from '../pages/loginPage'

describe('Login - negative scenarios', () => {
  it('should show error for invalid credentials', () => {
    loginPage.visit()
    loginPage.fillUsername('wrong_user')
    loginPage.fillPassword('wrong_pass')
    loginPage.submit()

    cy.get('[data-test="error"]').should('be.visible')
  })
})