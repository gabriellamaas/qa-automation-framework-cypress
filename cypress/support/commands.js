import loginPage from '../pages/loginPage'

/**
 * Faz login com um usuário da fixture `users.json` e guarda a sessão com cy.session,
 * para que o login pela UI aconteça só uma vez por usuário durante a execução.
 * @param {string} userKey chave do usuário em fixtures/users.json (padrão: "standard")
 */
Cypress.Commands.add('login', (userKey = 'standard') => {
  cy.fixture('users').then((users) => {
    const user = users[userKey]
    if (!user) throw new Error(`Usuário "${userKey}" não encontrado em fixtures/users.json`)

    cy.session(
      user.username,
      () => {
        loginPage.visit()
        loginPage.login(user.username, user.password)
        cy.url().should('include', '/inventory.html')
      },
      {
        validate() {
          cy.getCookie('session-username').should('exist')
        },
        cacheAcrossSpecs: true,
      }
    )
  })
})
