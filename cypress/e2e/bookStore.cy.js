/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'matest',
    password: 'Matest123!'
  };
  const book = {
    title: 'Speaking JavaScript'
  };

  it('should login user with valid credentials', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.username).should('be.visible');
    cy.url().should('contains', '/profile');

  });

  it.only('should add book to users profile', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.username).should('be.visible');
    cy.url().should('contains', '/profile');
    cy.get('.menu-list').contains('Book Store').click();
    cy.url().should('contains', '/books');
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('button').contains('Add To Your Collection').click();
    cy.on('window.alert', (txt) => {
      expect(txt).to.equal('Book added to your collection.');
    });
    cy.visit('/profile');
    cy.get('a').contains(book.title).should('exist');
    cy.deleteBook(book.title);

  });
});

