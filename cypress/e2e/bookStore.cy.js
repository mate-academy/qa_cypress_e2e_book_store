/// <reference types='cypress' />

import { user } from '../support/testData';
import { book } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/');
  });

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName')
    .type(user.username);
    cy.findByPlaceholder('Password')
    .type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.contains('#userName-value', user.username).should('be.visible');
    cy.get('#gotoStore').click();
    cy.findByPlaceholder('Type to search')
    .type(book.title);
    cy.contains('.action-buttons', book.title).click();
    cy.contains('.container > :nth-child(2)', book.description) 
    .should('be.visible');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
    cy.contains('.btn', 'Profile').click();
    cy.contains('.rt-table', book.title).should('be.visible');
    cy.get('#delete-record-undefined > svg > path').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
  });
  })
  });
