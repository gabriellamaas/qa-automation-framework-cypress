import loginPage from '../pages/loginPage'

describe('Cart', () => {
  it('should add an item to the cart', () => {
    loginPage.visit()
    loginPage.fillUsername('standard_user')
    loginPage.fillPassword('secret_sauce')
    loginPage.submit()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})