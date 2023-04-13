/// <reference types='cypress' />
import {user, book} from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/');
  });

  it('Sing In Test', () => {
    cy.viewport(1980, 1020);
    cy.visit('/login');

    cy.get('#userName')
      .type(user.username);

    cy.get('#password')
      .type(user.password);

    cy.contains('.text-right button', 'Login')
      .click();
    
    cy.url()
      .should('equal', `${Cypress.config().baseUrl}/profile`);

    cy.get('#userName-value')
      .should('contain', 'KillerPencil');
  });

  it('Add book Test', () => {
    cy.viewport(1980, 1020);
    cy.signIn();
    cy.visit('/profile');

    cy.get('#gotoStore')
      .click();
    
    cy.get('#searchBox')
      .type(`${book.title}`)
      .click();
    
    cy.contains('a', book.title)
      .click();
    
    cy.get('#description-wrapper')  
      .should('contain.text', book.description);
    
    cy.contains('.btn', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });

  it('Delete book', () => {
    cy.viewport(1980, 1020);
    cy.signIn();
    cy.visit('/profile');

    cy.contains(book.title);

    cy.get('#delete-record-undefined')
    .click();
    
    cy.get('#closeSmallModal-ok')
    .click();
  })
});
