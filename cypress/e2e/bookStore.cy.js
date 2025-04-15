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

  it('should provide ability to search', () => {
    cy.login(username, password);
    const bookName = 'Speaking JavaScript';
    const author = 'Axel Rauschmayer';
    const publisher = 'O\'Reilly Media';

    cy.visit('/books');

    cy.get('#searchBox').type(`${bookName}{enter}`);

    cy.get('.mr-2')
      .should('contain.text', bookName);

    cy.get('.rt-td')
      .should('contain.text', author);

    cy.get('.rt-td')
      .should('contain.text', publisher);
  });
});
