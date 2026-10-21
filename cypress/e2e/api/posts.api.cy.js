// Testes de API com cy.request contra a JSONPlaceholder (API pública de exemplo).
// A URL fica em `env.apiUrl` no cypress.config.js.
describe('API - Posts (JSONPlaceholder)', () => {
  const apiUrl = () => Cypress.env('apiUrl')

  it('GET /posts/1 should return a single post', () => {
    cy.request(`${apiUrl()}/posts/1`).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.include.all.keys('userId', 'id', 'title', 'body')
      expect(body.id).to.eq(1)
    })
  })

  it('GET /posts?userId=1 should return only posts from that user', () => {
    cy.request({ url: `${apiUrl()}/posts`, qs: { userId: 1 } }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.be.an('array').and.not.be.empty
      body.forEach((post) => expect(post.userId).to.eq(1))
    })
  })

  it('POST /posts should create a post', () => {
    const payload = { title: 'QA Automation', body: 'Created by Cypress', userId: 1 }

    cy.request('POST', `${apiUrl()}/posts`, payload).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body).to.include(payload)
      expect(body).to.have.property('id')
    })
  })

  it('GET /posts/0 should return 404 for a missing post', () => {
    cy.request({ url: `${apiUrl()}/posts/0`, failOnStatusCode: false }).then(({ status }) => {
      expect(status).to.eq(404)
    })
  })
})
