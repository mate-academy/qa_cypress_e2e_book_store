/// <reference types='cypress' />

describe('Login and book search', () => {
  it('should log in the user and search for a book', () => {
    cy.visit('https://demoqa.com/login');
    cy.get('#userName').type('Marek');
    cy.get('#password').type('Asdf!!12');
    cy.get('#login').click();
    cy.get('#userName-value').should('have.text', 'Marek');
    cy.url().should('include', '/profile');

    cy.visit('https://demoqa.com/books');
    cy.get('.form-control').type('Speaking JavaScript');
    cy.contains('Speaking JavaScript').should('be.visible');
  });
});
