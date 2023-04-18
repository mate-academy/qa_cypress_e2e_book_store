/// <reference types='cypress' />
import { userData } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Should provide the ability to login with valid credentials', () => {
    cy.visit('/login');
    cy.get('#userName').type(userData.username);
    cy.get('#password').type(userData.password);
    cy.contains('.text-right button', 'Login').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/profile`);
    cy.get('#userName-value').should('contains.text', userData.username);
  });

  it('Should provide the ability to adding a book to the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(`${userData.book}{enter}`);
    cy.contains('a', userData.book).click();
    cy.get('#description-wrapper').should('contain.text', userData.bookDesc);
    cy.contains('.btn', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('Should provide the ability to deleting a book from the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tbody', 'Speaking JavaScript').find('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.contains('.rt-table', 'Speaking JavaScript').should('not.exist');
  });
 });
