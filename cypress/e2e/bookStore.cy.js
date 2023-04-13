/// <reference types='cypress' />
import {user, book} from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/');
  });

  it('should provide an ability to log in', () => {
    cy.get('#userName')
      .type(user.username);

      cy.get('#password')
        .type(user.password);

      cy.get('#login').click();

      cy.get('#userName-value') 
        .should('contain.text', 'testUser');

      cy.contains('.btn', 'Book Store').click();

      cy.get('#searchBox')
        .type(book.title);
        
      cy.contains('.action-buttons', book.title).click();
        
      cy.get('.form-label') 
        .should('include.text', book.description);

      cy.viewport(550, 750);

      cy.contains('.btn', 'Add To Your Collection').click();

      cy.contains('.btn', 'Profile').click();

      cy.get('.mr-2') 
        .should('contain.text', book.title);

      cy.get('#delete-record-undefined > svg > path').click();

      cy.get('#closeSmallModal-ok').click();
  });
});
