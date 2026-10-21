class LoginPage {
  elements = {
    username: () => cy.get('[data-test="username"]'),
    password: () => cy.get('[data-test="password"]'),
    submit: () => cy.get('[data-test="login-button"]'),
    error: () => cy.get('[data-test="error"]'),
  }

  visit() {
    cy.visit('/')
  }

  fillUsername(username) {
    this.elements.username().type(username)
  }

  fillPassword(password) {
    this.elements.password().type(password, { log: false })
  }

  submit() {
    this.elements.submit().click()
  }

  login(username, password) {
    if (username) this.fillUsername(username)
    if (password) this.fillPassword(password)
    this.submit()
  }

  assertErrorMessage(message) {
    this.elements.error().should('be.visible').and('contain.text', message)
  }
}

export default new LoginPage()
