describe('Form inputs', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.url().should('include', 'localhost')
    })
    it('button is disabled', () => {
        cy.get('button.submit')
        .should('be.disabled')
    })
    it('can type a name', () => {
        cy.get('input[name="name"]')
        .type('John')
        .should('have.value', 'John')
    })
    it('can type in special', () => {
        cy.get('input[name="special"]')
        .type('one')
        .should('have.value', 'one')
    })
})

describe('Form validation', () => {
    it('validates name correctly', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.contains('Name must be at least two characters long').should('not.exist')
        cy.get('input[name="name"]').type('a')
        cy.contains('Name must be at least two characters long').should('exist')
        cy.get('input[name="name"]').type('b')
        cy.contains('Name must be at least two characters long').should('not.exist')
    })
})

// describe('Submitting pizza', () => {
//     it('can submit a order', () => {
//         cy.visit('http://localhost:3000/pizza')
//         cy.get('input[name="name"]').type('John').should('have.value', 'John')
//         cy.get('input[name="size"]').select('Large').should('have.value', 'Large')
//         cy.get('input[name="toppings"]').select('Cheese').should('have.value', 'Cheese')
//         cy.get('input[name="special"]').type('hurry').should('have.value', 'hurry')
//         cy.get('button.submit').click()
//     })
// })