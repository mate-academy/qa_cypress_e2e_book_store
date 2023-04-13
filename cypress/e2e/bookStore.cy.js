/// <reference types= 'cypress' />
import { userData } from '../support/generate';

describe('Book Store app', () => {
  beforeEach(() => {
    cy.viewport(1980, 1020);
  });

  it('Login with credentials', () => {
    cy.visit('/login');
    cy.get('#userName').type(userData.username);
    cy.get('#password').type(userData.password);
    cy.contains('.text-right button', 'Login').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/profile`);
    cy.get('#userName-value').should('contains.text', userData.username);
  });

  it('Adding a book to the collection', () => {
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

  it('Deleting a book from the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tbody', 'Speaking JavaScript').find('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.contains('.rt-table', 'Speaking JavaScript').should('not.exist');
  });
});
