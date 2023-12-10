/// <reference types='cypress' />

describe('Book Store app', () => {
  // before(() => {
  //   cy.visit('/login')
  // });
  const user = {
    username: 'tester_1',
    password: 'Tester1!'
  };

  const book = {
    isbn: '9781449365035',
    userId: 'a66cc17b-e2fc-40a5-920c-f6a9115834f9',
    title: 'Speaking JavaScript'
  };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.username).should('be.visible');
    cy.get('button').contains('Log out').should('be.visible');
  });

  it('should provide an ability to add book to the cart', () => {
    cy.visit('/login');
    cy.login(user);
    cy.visit('/profile');
    cy.get('.menu-list').contains('Book Store').click();
    cy.url().should('contains', '/book');
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('button').contains('Add To Your Collection').click();
    cy.visit('/profile');
    cy.get('a').contains(book.title).should('exist');
  });

  it('should provide an ability to delete book from the cart', () => {
    cy.visit('/login');
    cy.login(user);
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('button').contains('OK').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
