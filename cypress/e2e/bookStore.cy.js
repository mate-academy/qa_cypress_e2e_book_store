/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Tom',
    password: 'Password1!'
  };

  const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere'
  };

  before(() => {
    cy.visit('/');
  });

  it('should allow to login with registered creds', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to add a book to collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.name);
    cy.contains('a', book.name)
      .click();
    cy.get('#description-wrapper')
      .should('contain', book.description);
    cy.get('.btn.btn-primary')
      .eq(2)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should allow to delete added book from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', book.name);
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
