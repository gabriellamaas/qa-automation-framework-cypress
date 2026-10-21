import inventoryPage from '../pages/inventoryPage'

// A SauceDemo lista 6 produtos. Validar a quantidade evita que uma lista vazia
// passe como "ordenada".
const TOTAL_PRODUCTS = 6

describe('Product sorting', () => {
  beforeEach(() => {
    cy.login()
    inventoryPage.visit()
  })

  it('should sort products by name (A to Z)', () => {
    // A–Z é a ordem padrão: ordena Z–A antes para garantir que a ordenação realmente acontece.
    inventoryPage.sortBy('za')
    inventoryPage.sortBy('az')
    inventoryPage.getItemNames().then((names) => {
      expect(names).to.have.length(TOTAL_PRODUCTS)
      expect(names).to.deep.equal([...names].sort((a, b) => a.localeCompare(b)))
    })
  })

  it('should sort products by name (Z to A)', () => {
    inventoryPage.sortBy('za')
    inventoryPage.getItemNames().then((names) => {
      expect(names).to.have.length(TOTAL_PRODUCTS)
      expect(names).to.deep.equal([...names].sort((a, b) => b.localeCompare(a)))
    })
  })

  it('should sort products by price (low to high)', () => {
    inventoryPage.sortBy('lohi')
    inventoryPage.getItemPrices().then((prices) => {
      expect(prices).to.have.length(TOTAL_PRODUCTS)
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b))
    })
  })

  it('should sort products by price (high to low)', () => {
    inventoryPage.sortBy('hilo')
    inventoryPage.getItemPrices().then((prices) => {
      expect(prices).to.have.length(TOTAL_PRODUCTS)
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a))
    })
  })
})
