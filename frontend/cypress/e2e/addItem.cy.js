describe('login E2E test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/additem')
    })

    it('Testing add item flow', () => {
        cy.get('input').contains('Item Name').type('textbook')
        cy.get('input').contains('Item Name').should('have.text', 'textbook')
        cy.get('select').contains('Category').select('Books')
        cy.get('input').contains('Item Description').type('textbook for cis')
        cy.get('input').contains('Item Description').should('have.text', 'textbook for cis')
        cy.get('input').contains('Item Price').type('10')
        cy.get('input').contains('Item Price').should('have.text', '10')
        cy.get('select').contains('Preferred Payment Method').select('Venmo')
        cy.get('select').contains('Delivery Method').select('Shipping')
        cy.get('button').contains('Complete Listing').click()
    })
  })