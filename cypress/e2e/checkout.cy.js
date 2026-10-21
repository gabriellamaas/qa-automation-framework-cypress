import inventoryPage from '../pages/inventoryPage'
import cartPage from '../pages/cartPage'
import checkoutPage from '../pages/checkoutPage'

describe('Checkout flow', () => {
  beforeEach(() => {
    cy.fixture('products').as('products')
    cy.fixture('checkout').as('checkout')
    cy.login()
    inventoryPage.visit()
  })

  it('should complete checkout successfully', function () {
    const { backpack } = this.products

    inventoryPage.addToCart(backpack.name)
    inventoryPage.openCart()
    cartPage.assertContainsProduct(backpack.name)
    cartPage.checkout()

    checkoutPage.fillInformation(this.checkout.customer)
    checkoutPage.continue()

    checkoutPage.assertOverviewContains(backpack.name)
    checkoutPage.assertSubtotal(backpack.price)
    checkoutPage.assertTotalIsSubtotalPlusTax()

    checkoutPage.finish()
    checkoutPage.assertOrderComplete()
    inventoryPage.assertCartCount(0)
  })

  describe('required customer information', () => {
    const cases = [
      { missing: 'first name', field: 'firstName', error: 'First Name is required' },
      { missing: 'last name', field: 'lastName', error: 'Last Name is required' },
      { missing: 'postal code', field: 'postalCode', error: 'Postal Code is required' },
    ]

    cases.forEach(({ missing, field, error }) => {
      it(`should show an error when ${missing} is empty`, function () {
        inventoryPage.addToCart(this.products.backpack.name)
        inventoryPage.openCart()
        cartPage.checkout()

        checkoutPage.fillInformation({ ...this.checkout.customer, [field]: '' })
        checkoutPage.continue()

        checkoutPage.assertErrorMessage(error)
        cy.url().should('include', '/checkout-step-one.html')
      })
    })
  })
})
