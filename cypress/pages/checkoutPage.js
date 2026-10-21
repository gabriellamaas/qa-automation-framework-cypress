const parseAmount = (text) => Number(text.match(/\$([\d.]+)/)[1])

class CheckoutPage {
  elements = {
    firstName: () => cy.get('[data-test="firstName"]'),
    lastName: () => cy.get('[data-test="lastName"]'),
    postalCode: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    error: () => cy.get('[data-test="error"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    subtotal: () => cy.get('[data-test="subtotal-label"]'),
    tax: () => cy.get('[data-test="tax-label"]'),
    total: () => cy.get('[data-test="total-label"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
  }

  fillInformation({ firstName, lastName, postalCode }) {
    if (firstName) this.elements.firstName().type(firstName)
    if (lastName) this.elements.lastName().type(lastName)
    if (postalCode) this.elements.postalCode().type(postalCode)
  }

  continue() {
    this.elements.continueButton().click()
  }

  assertErrorMessage(message) {
    this.elements.error().should('be.visible').and('contain.text', message)
  }

  assertOverviewContains(productName) {
    cy.url().should('include', '/checkout-step-two.html')
    this.elements.itemNames().should('contain.text', productName)
  }

  assertSubtotal(expected) {
    this.elements
      .subtotal()
      .invoke('text')
      .then((text) => {
        expect(parseAmount(text)).to.eq(expected)
      })
  }

  assertTotalIsSubtotalPlusTax() {
    this.elements
      .subtotal()
      .invoke('text')
      .then((subtotalText) => {
        this.elements
          .tax()
          .invoke('text')
          .then((taxText) => {
            this.elements
              .total()
              .invoke('text')
              .then((totalText) => {
                const expected = parseAmount(subtotalText) + parseAmount(taxText)
                expect(parseAmount(totalText)).to.be.closeTo(expected, 0.001)
              })
          })
      })
  }

  finish() {
    this.elements.finishButton().click()
  }

  assertOrderComplete() {
    cy.url().should('include', '/checkout-complete.html')
    this.elements.completeHeader().should('have.text', 'Thank you for your order!')
  }
}

export default new CheckoutPage()
