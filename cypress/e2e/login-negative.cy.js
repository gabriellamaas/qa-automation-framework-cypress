import loginPage from '../pages/loginPage'

describe('Login - negative scenarios', () => {
  beforeEach(() => {
    cy.fixture('users').as('users')
    loginPage.visit()
  })

  it('should show error for invalid credentials', function () {
    const { username, password } = this.users.invalid
    loginPage.login(username, password)

    loginPage.assertErrorMessage('Username and password do not match any user in this service')
    cy.url().should('not.include', '/inventory.html')
  })

  it('should block a locked out user', function () {
    const { username, password } = this.users.lockedOut
    loginPage.login(username, password)

    loginPage.assertErrorMessage('Sorry, this user has been locked out.')
  })

  const requiredFieldCases = [
    { scenario: 'username is empty', username: '', password: 'secret_sauce', error: 'Username is required' },
    { scenario: 'password is empty', username: 'standard_user', password: '', error: 'Password is required' },
    { scenario: 'both fields are empty', username: '', password: '', error: 'Username is required' },
  ]

  requiredFieldCases.forEach(({ scenario, username, password, error }) => {
    it(`should show "${error}" when ${scenario}`, () => {
      loginPage.login(username, password)

      loginPage.assertErrorMessage(error)
    })
  })
})
