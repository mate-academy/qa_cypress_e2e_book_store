/// <reference types='cypress' />

import { book } from "../support/testData";

describe('Book Store app', () => {
   beforeEach(() => {
      cy.visit('/login');
      cy.login();
   });

   it('should login', () => {
      cy.get('#userName-value').contains('Snow228');
      cy.url().should('equal', 'https://demoqa.com/profile');
   });

   it('should add book', () => {
      cy.get('#gotoStore').click();
      cy.get('#searchBox').should('exist').type(book.title);
      cy.contains('a', book.title).click();
      cy.get('#description-label').should('exist');
      cy.get('.text-right > #addNewRecordButton').click();
      cy.on('window:alert', (str) => {
         expect(str).to.equal(`Book added to your collection.`)
      });
      cy.contains('.btn', 'Profile').click();
      cy.get('#delete-record-undefined > svg > path').click();
      cy.get('#closeSmallModal-ok').click();
   });
});
