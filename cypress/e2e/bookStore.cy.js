/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/');
  });

  it('should succesful login and choose a book', () => {
    cy.get('.card-body').contains('Book Store Application').click();
    cy.get('.menu-list #item-0').contains('Login').click();
    cy.get('#userName').type('Hairy');
    cy.get('#password').type('Qwerty123#');
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'Hairy');
    cy.url().should('eq', 'https://demoqa.com/profile');
    cy.get('.menu-list #item-2').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
  });
});
