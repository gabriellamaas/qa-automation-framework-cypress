import loginPage from '../pages/loginPage'

describe('Checkout flow', () => {
  it('should complete checkout successfully', () => {
    loginPage.visit()
    loginPage.fillUsername('standard_user')
    loginPage.fillPassword('secret_sauce')
    loginPage.submit()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Gabriella')
    cy.get('[data-test="lastName"]').type('Maas')
    cy.get('[data-test="postalCode"]').type('85800-000')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()

    cy.contains('Thank you for your order!').should('be.visible')
  })
})