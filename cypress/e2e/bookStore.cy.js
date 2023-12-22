/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {

  });
  const user = {
    username: 'testertestowy',
    password: '!1Nokia5000!'
  };

  const book = {
    isbn: '9781449365035',
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer'
  };
  it('should allow to log in with the valid credentials', () => {
    // Visit page and log in
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    // Validation of the logged in user
    cy.get('label').contains(user.username).should('be.visible');
    cy.get('button').contains('Log out').should('be.visible');
    cy.url().should('contain', '/profile');
  });

  // Adding the book to the collection
  // TEST PREPARATION
  it.only('should add book to the users collection', () => {
    cy.visit('/login');
    cy.login(user);
    // cy.deleteBook(book.isbn, cy.getCookie('userID').value);
    // TEST BODY
    cy.visit('/books');
    cy.get('.menu-list').contains('Book Store').click();
    cy.url().should('contain', '/books');
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('a').contains(book.title).click();
    // validation of the description!!!
    // cy.get('#description-wrapper').contains('Description')
    //   .should('include', 'Like it or not');
    cy.get('button').contains('Add To Your Collection').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.be.equal('Book added to your collection.');
    });
    cy.visit('/profile');
    cy.get('a').contains(book.title).should('be.visible');
  });
});
