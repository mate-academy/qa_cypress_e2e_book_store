/// <reference types='cypress' />

describe('Book Store app', () => {
  const name = 'testKamil12345';
  const password = 'TestKamil12345!';
  before(() => {
    cy.visit('/login');
  });

  it('Should be loggin on the page', () => {
    cy.findByAttribute('placeholder', 'UserName').type(name);
    cy.findByAttribute('placeholder', 'Password').type(password);
    cy.get('button').findByAttribute('id', 'login').contains('Login').click();
    // Assert by username
    cy.get('label').findByAttribute('id', 'userName-value')
    // Assert url
      .should('have.text', name);
    cy.url().should('contain', '/profile');
    // Navigate to book store
    cy.get('button').findByAttribute('id', 'gotoStore')
      .contains('Go To Book Store').click();
    // Search text
    cy.get('input').findByAttribute('placeholder', 'Type to search')
      .type('Speaking JavaScript');
    cy.get('span').findByAttribute('id', 'see-book-Speaking JavaScript')
      .get('a').contains('Speaking JavaScript').click();
    // Assert description book
    cy.findByAttribute('id', 'userName-value').parents('#description-wrapper')
      .should('contain', 'JavaScript is everywhere these days-from browser');
    // Add to collection
    cy.findByAttribute('id', 'addNewRecordButton')
      .contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('#item-3 .text').contains('Profile').click();
    // Assert shopping list
    cy.get('span').findByAttribute('id', 'see-book-Speaking JavaScript')
      .get('a')
      .should('have.text', 'Speaking JavaScript');
    // Delete book from list
    cy.findByAttribute('id', 'delete-record-undefined').click();
    cy.findByAttribute('id', 'closeSmallModal-ok').contains('OK').click();
    // cy.on('window:alert', (str) => {
    //   expect(str).to.equal(`Book deleted.`);
    // });
  });
});
