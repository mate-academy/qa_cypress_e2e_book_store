/// <reference types='cypress' />

import { user } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/'); 
  });

  it('should provide an ability login for users', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('.form-label').should('contain.text', 'iziumova');
    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should provide an ability to add a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').should('contain.text', 'Go To Book Store').click();
    cy.get('#searchBox').type('Spea{enter}');
    cy.get('a[href="/books?book=9781449365035"]').click();
    cy.get('.form-label').should('contain.text','Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
          expect(str).to.equal(`Book added to your collection.`)
      });
    cy.visit('/profile'); 
  });

  it('should provide an ability to delete a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    });
});
