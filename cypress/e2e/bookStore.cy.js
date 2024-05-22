/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'kgorecka',
    password: '123456789Ko@'
  };
  // const book = {
  //   isbn: '89921312',
  // title:'Speaking JavaScript',
  // }

  it('should login user with valid credentials', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.username).should('be.visible');
    cy.get('button').contains('Log out').should('be.visible');
    cy.url().should('contains', '/profile');
  });

  it('should add book to user profiler', () => {
    cy.visit('/login');
    cy.login(user);
    cy.deletedBook('9781449365035');
    cy.getCookie('userID').value();
    cy.get('.menu-list').contains('Book Store').click();
    // cy.visit('/books');
    cy.url().should('contains', '/books');
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.get('a').contains('Speaking JavaScript').click();
    cy.get('button').contains('Add To Your Collection').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Book added to your collection.');
    });
    cy.visit('/profile');
    cy.get('a').contains('Speaking JavaScript').should('exist');
  });
});
