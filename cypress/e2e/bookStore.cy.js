/// <reference types='cypress' />

const { generateData } = require('../support/generate');

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login();
    cy.visit('/profile')
  });

  it('should check if the user is logged in', () => {
    const { userName } = generateData();

    cy.get('#userName-value').should('contain.text', userName);
  });

  it('should allow to add book', () => {
    const { bookName, description } = generateData();

    cy.url().should('include', '/profile');
    cy.get('#item-2 span').contains('Book Store').click();
    cy.get('#searchBox').type(bookName);
    cy.contains('a', bookName).click();
    cy.get('#description-wrapper').should('contain.text', description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.once('window:alert', (str) => {
      expect(str).to.eq('Book added to your collection.');
    });
  });

  it('should allow to delete book', () => {
    const { bookName } = generateData();

    cy.url().should('include', '/profile');
    cy.get('#item-3 span').contains('Profile').click();
    cy.contains('a', bookName).should('exist');
    cy.get('#delete-record-undefined').click().get('#closeSmallModal-ok').click();
  });
});
