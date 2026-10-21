import { toSlug } from './utils'

class InventoryPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    sortSelect: () => cy.get('[data-test="product-sort-container"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    addToCartButton: (productName) => cy.get(`[data-test="add-to-cart-${toSlug(productName)}"]`),
    removeButton: (productName) => cy.get(`[data-test="remove-${toSlug(productName)}"]`),
    menuButton: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('[data-test="logout-sidebar-link"]'),
  }

  visit() {
    // A SauceDemo responde 404 para rotas internas, mas a aplicação carrega normalmente.
    cy.visit('/inventory.html', { failOnStatusCode: false })
  }

  assertIsOpen() {
    cy.url().should('include', '/inventory.html')
    this.elements.title().should('have.text', 'Products')
  }

  addToCart(productName) {
    this.elements.addToCartButton(productName).click()
  }

  removeFromCart(productName) {
    this.elements.removeButton(productName).click()
  }

  assertCartCount(count) {
    if (count === 0) {
      this.elements.cartBadge().should('not.exist')
    } else {
      this.elements.cartBadge().should('have.text', String(count))
    }
  }

  sortBy(option) {
    this.elements.sortSelect().select(option)
  }

  getItemNames() {
    return this.elements.itemNames().then(($els) => Cypress._.map($els, 'innerText'))
  }

  getItemPrices() {
    return this.elements
      .itemPrices()
      .then(($els) => Cypress._.map($els, (el) => Number(el.innerText.replace('$', ''))))
  }

  openCart() {
    this.elements.cartLink().click()
  }

  logout() {
    this.elements.menuButton().click()
    this.elements.logoutLink().should('be.visible').click()
  }
}

export default new InventoryPage()
