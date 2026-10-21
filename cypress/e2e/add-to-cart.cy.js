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
    inventoryPage.elements.removeButton(backpack.name).should('be.visible')

    inventoryPage.openCart()
    cartPage.assertIsOpen()
    cartPage.assertItemCount(1)
    cartPage.assertContainsProduct(backpack.name)
  })

  it('should add multiple items to the cart', function () {
    const { backpack, bikeLight } = this.products
    inventoryPage.addToCart(backpack.name)
    inventoryPage.addToCart(bikeLight.name)

    inventoryPage.assertCartCount(2)
  })

  it('should remove an item from the inventory page', function () {
    const { backpack } = this.products
    inventoryPage.addToCart(backpack.name)
    inventoryPage.removeFromCart(backpack.name)

    inventoryPage.assertCartCount(0)
    inventoryPage.elements.addToCartButton(backpack.name).should('be.visible')
  })

  it('should remove an item from the cart page', function () {
    const { backpack } = this.products
    inventoryPage.addToCart(backpack.name)
    inventoryPage.openCart()
    cartPage.removeProduct(backpack.name)

    cartPage.assertItemCount(0)
    inventoryPage.assertCartCount(0)
  })
})
