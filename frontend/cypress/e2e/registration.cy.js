describe('login E2E test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login')
    })

    it('Testing registration flow', () => {
        cy.get('input').contains('First Name').type('John')
        cy.get('input').contains('First Name').should('have.text', 'John')
        cy.get('input').contains('Last Name').type('Doe')
        cy.get('input').contains('Last Name').should('have.text', 'Doe')
        cy.get('input').contains('Username').type('Johndoe')
        cy.get('input').contains('Username').should('have.text', 'Johndoe')
        cy.get('input').contains('School Email').type('john@upenn.edu')
        cy.get('input').contains('School Email').should('have.text', 'john@upenn.edu')
        cy.get('input').contains('Password').type('pass123')
        cy.get('button').contains('Create personal account').click()
        cy.get('button').contains('Log In')
    })
  })