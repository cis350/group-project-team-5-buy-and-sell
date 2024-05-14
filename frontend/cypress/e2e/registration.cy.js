describe('login E2E test', () => {
    beforeEach(() => {
        cy.visit('https://group-project-team-5-buy-and-sell.vercel.app/registration')
    })

    it('Testing registration flow', () => {
        cy.get('input[type="First Name"]').type('John')
        cy.get('input[type="First Name"]').should('have.value', 'John')
        cy.get('input[type="Last Name"]').type('Doe')
        cy.get('input[type="Last Name"]').should('have.value', 'Doe')
        cy.get('input[type="username"]').type('Johndoe')
        cy.get('input[type="username"]').should('have.value', 'Johndoe')
        cy.get('input[type="email"]').type('john@upenn.edu')
        cy.get('input[type="email"]').should('have.value', 'john@upenn.edu')
        cy.get('input[type="password"]').type('pass123')
        cy.get('button').contains('Create personal account').click()
    })
  })