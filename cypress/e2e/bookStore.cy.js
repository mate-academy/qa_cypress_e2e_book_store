/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'july',
    password: 'July123!'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.userName);
    cy.url().should('include', 'profile');
  });

  it('should allow to add a book to user collection', () => {
    cy.login(user.userName, user.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('be.visible');
  });

  it('should allow to delete the book from user collection', () => {
    cy.login(user.userName, user.password);
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('be.visible');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
