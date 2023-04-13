/// <reference types='cypress' />

import { user } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
  });

  it('should provide an ability to login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.contains('#submit', 'Log out').should('exist');
  });

  it('should privide an ability to add a book to collection', () =>{
    cy.viewport(550, 750);
    cy.login();
    cy.visit('/profile');
    
    cy.get('#gotoStore').click();
    cy.get('.form-control').type('Speaking JavaScript');
    cy.contains('Speaking JavaScript').click();
    cy.get('#description-wrapper').should('exist');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    });
    cy.visit('/profile');
    cy.contains('Speaking JavaScript').should('exist');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });

  });

/*
    it.only('should privide an ability to delete a book from collection', () =>{
    cy.viewport(550, 750);
    cy.login();
    cy.visit('/books?book=9781449365035');
    cy.addBook();
    cy.visit('/profile');
    cy.contains('Speaking JavaScript').should('exist');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });
  });
*/
});
