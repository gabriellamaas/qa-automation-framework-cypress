import { toSlug } from './utils'

class CartPage {
  elements = {
    items: () => cy.get('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    removeButton: (productName) => cy.get(`[data-test="remove-${toSlug(productName)}"]`),
  }

  assertIsOpen() {
    cy.url().should('include', '/cart.html')
  }

  assertContainsProduct(productName) {
    this.elements.itemNames().should('contain.text', productName)
  }

  assertItemCount(count) {
    if (count === 0) {
      this.elements.items().should('not.exist')
    } else {
      this.elements.items().should('have.length', count)
    }
  }

  removeProduct(productName) {
    this.elements.removeButton(productName).click()
  }

  checkout() {
    this.elements.checkoutButton().click()
  }
}

export default new CartPage()
