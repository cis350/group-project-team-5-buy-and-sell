describe('login E2E test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login')
    })

    it('Testing login flow', () => {
        cy.get('input').contains('Username').type('Johndoe')
        cy.get('input').contains('Username').should('have.text', 'Johndoe')
        cy.get('input').contains('Password').type('pass123')
        cy.get('button').contains('Sign In').click()
        cy.get('button').contains('Log Out')
    })
  })