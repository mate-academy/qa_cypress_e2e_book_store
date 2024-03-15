/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  const username = 'ryxocus5545';
  const password = 'Passtest!45';

  it('should provide ability to log in', () => {
    cy.get('#userName').type(username);

    cy.get('#password').type(password);

    cy.get('#login').click();

    cy.get('#userName-value').should('contain.text', username);

    cy.url().should('include', 'https://demoqa.com/profile');
  });

  it('should provide ability to log in', () => {
    cy.login(username, password);

    cy.visit('/books');

    cy.get('#searchBox').type('Speaking JavaScript{enter}');

    cy.get('.mr-2')
      .should('contain.text', 'Speaking JavaScript');

    cy.get('.rt-td')
      .should('contain.text', 'Axel Rauschmayer');

    cy.get('.rt-td')
      .should('contain.text', 'O\'Reilly Media');
  });
});
