/// <reference types='cypress' />

const {
  createUserData, pageLinks, loginUser
} = require('../support/functions');

const { userName, password } = createUserData();
const { logIn, books, profile } = pageLinks();
const bookName = 'Speaking JavaScript';
const descriptionPart = 'Like it or not, JavaScript is everywhere';

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit(logIn);
    loginUser(userName, password);
    cy.get('#userName-value').should('contain', userName);
  });

  it('should assert that the user is logged in', () => {
    cy.get('#userName-value').should('contain', userName);
    cy.url().should('contain', profile);
  });

  it('should allow the user to add the book to the collection', () => {
    cy.visit(books);
    cy.get('#searchBox').type(`${bookName}{enter}`);
    cy.get('.mr-2').click();
    cy.get('#description-wrapper').should('contain', descriptionPart);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit(profile);
  });

  it('should allow the user to delete the book from the collection', () => {
    cy.visit(profile);
    cy.get('.mr-2').should('contain', bookName);
    cy.get('[title="Delete"]').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
