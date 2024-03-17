/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Flood',
    password: 'qwert!Q12345'
  };

  it('should provide an ability to login', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to search for the book', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.contains('a[href="/books?book=9781449365035"]', 'Speaking JavaScript')
      .should('exist');
    cy.contains('.rt-td', 'Axel Rauschmayer')
      .should('exist');
    cy.contains('.rt-td', "O'Reilly Media")
      .should('exist');
  });
});
