describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('Navigate to Home Page', () => {
  it('renders on client side nav', () => {
    cy.visit('/')
    cy.get('nav').contains('About').click()
    cy.url().should('include', '/about-us')
    cy.get('header').contains('Faust Test').click()
    cy.get('nav').get('span').should('contain', 'Front Page')
  })
})