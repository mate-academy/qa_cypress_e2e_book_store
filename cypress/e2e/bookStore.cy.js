import { user } from '../support/testData'

/// <reference types='cypress' />

describe('Book Store app', () => {

  beforeEach(() => {
    cy.visit('/login');
  });
  

  it('should provide an ability to login', () => {

    cy.findByPlaceholder('UserName')
      .type(user.userName);

    cy.findByPlaceholder('Password')
      .type(user.password);
    
    cy.get('#login').click();

    cy.contains(user.userName)
      .should('be.visible');

    cy.url().should('include', '/profile');
  });

  it('should provide an ability to add a book to the collection', () => {
    cy.login();

    cy.visit('/profile');

    cy.get('#gotoStore').click();

    cy.findByPlaceholder('Type to search')
      .type('Speaking JavaScript{enter}');

    cy.get('.mr-2')
      .click();

    cy.get('.form-label')
      .should('contain.text', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.');
    
    cy.contains('Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
      })

    cy.visit('/profile'); 

    cy.contains('Speaking JavaScript').should('be.visible');
  })

  it('should provide an ability to delate a book from the collection', () => {
    cy.login();

    cy.visit('/profile');

    cy.get('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();
  })
});
