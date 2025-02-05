/// <reference types='cypress' />

const { userInfo, bookInfo } = require('../support/userData');

describe('Book Store app', () => {
  const { username, password } = userInfo();
  const { title, author, publisher } = bookInfo();

  beforeEach(() => {
    cy.visit('/register');
  });

  it('should allow to login', () => {
    cy.get('#gotologin')
      .click();

    cy.loginUI(username, password);

    cy.get('#userName-value')
      .should('contain', username);

    cy.url()
      .should('include', 'profile');
  });

  it('should allow to find a book', () => {
    cy.loginAPI(username, password);

    cy.visit('/books');

    cy.get('#searchBox')
      .type(title);

    cy.assertBook(1, title);
    cy.assertBook(2, author);
    cy.assertBook(3, publisher);
  });
});
