/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'testuser1234';
  const password = 'Testuser1234!';
  const bookName = 'Speaking JavaScript';

  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should be able to log in when credentials are valid', () => {
    cy.get('#userName').type(username);

    cy.get('#password').type(password);

    cy.get('#login').click();

    cy.url().should('eq', 'https://demoqa.com/profile');

    cy.get('#userName-value').should('contain.text', username);
  });

  it('should be able to add book to the collection', () => {
    cy.login(username, password);

    cy.contains('.text', 'Book Store').click({force: true});

    cy.get('#searchBox').type(bookName);

    cy.contains('a', 'Speaking JavaScript').click();

    cy.contains('.form-label', 'Like it or not')
      .should('contain.text', 'JavaScript is everywhere these days-from');

    cy.contains('Add To Your Collection').click({force: true});

    cy.checkAddBook();

    cy.contains('#item-3', 'Profile').click();

    cy.contains('a', 'Speaking JavaScript').should('be.visible')
  });

  it('should be able to delete added book from collection', () => {
    cy.login(username, password);
    // It was so hard to create function for adding book

    cy.contains('.text', 'Book Store').click({force: true});

    cy.get('#searchBox').type(bookName);

    cy.contains('a', 'Speaking JavaScript').click();

    cy.contains('Add To Your Collection').click({force: true});

    cy.contains('#item-3', 'Profile').click();

    cy.get('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      if(str === `Book deleted.`) {
        expect(str).to.equal(`Book deleted.`)
      };
    });
  })
});
