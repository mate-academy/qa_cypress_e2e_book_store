/// <reference types='cypress' />

const description = 'Like it or not, JavaScript is everywhere these' +
  ' days-from browser to server to mobile-and now';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should provide ability to login', () => {
    cy.get('#userName')
      .type('Qwerty12345');
    cy.get('#password')
      .type('Qwerty12345@');
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', 'Qwerty12345');
    cy.url()
      .should('contain', 'https://demoqa.com/profile');
  });

  it('should provide ability to search for the book, to add to thecart', () => {
    cy.login('Qwerty12345', 'Qwerty12345@');
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.get('.action-buttons')
      .click();
    cy.get('.books-wrapper')
      .should('contain', 'Description :');
    cy.get('.books-wrapper')
      .should('contain', description);
    cy.get('.text-right > #addNewRecordButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('.text-left > #addNewRecordButton')
      .click();
    cy.visit('/profile');
  });

  it('should provide ability to delete the book from the cart', () => {
    cy.login('Qwerty12345', 'Qwerty12345@');
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });
});
