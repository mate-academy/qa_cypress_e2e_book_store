/// <reference types='cypress' />

describe('Book Store app', () => {
  let user;
  let book;
  before(() => {
    user = {
      password: 'Mypasswordisstrong666!',
      username: 'iscreamiscream'
    };

    book = {
      title: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: `O'Reilly Media`
    };
    cy.visit('/login');
  });

  it('should allow to log in', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();

    cy.url().should('include', 'profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to find a book', () => {
    cy.visit('/books');
    cy.get('.form-control').type(book.title);
    cy.contains('Speaking JavaScript').should('be.visible');
  });
});
