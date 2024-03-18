/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Flood',
    password: 'qwert!Q12345',
    textForSearching: 'Speaking JavaScript',
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: "O'Reilly Media"
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
    cy.login(user.username, user.password);
    cy.visit('/books');
    cy.get('#searchBox')
      .type(user.textForSearching);
    cy.contains('a[href="/books?book=9781449365035"]', user.title)
      .should('exist');
    cy.contains('.rt-td', user.author)
      .should('exist');
    cy.contains('.rt-td', user.publisher)
      .should('exist');
  });
});
