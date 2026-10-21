// Converte o nome do produto no sufixo usado nos atributos data-test da SauceDemo.
// Ex.: "Sauce Labs Backpack" -> "sauce-labs-backpack"
export const toSlug = (productName) => productName.toLowerCase().replace(/\s+/g, '-')
