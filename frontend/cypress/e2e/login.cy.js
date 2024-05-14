describe('login E2E test', () => {
    beforeEach(() => {
        cy.visit('https://group-project-team-5-buy-and-sell.vercel.app/login')
    })

    it('Testing login flow', () => {
        cy.get('input').first().type('Johndoe')
        cy.get('input').first().should('have.value', 'Johndoe')
        cy.get('input').last().type('pass123')
        cy.get('button').last().click()
    })
  })