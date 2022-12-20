// <reference types='cypress' />
//const { get } = require('cypress/types/lodash');
const { generateUser } = require('../support/generate');

describe('User should be able to', () => {
  beforeEach(() => {
  cy.viewport(1600, 1080);
  });

    it('login', () => {
    cy.visit('login');
    const user = generateUser();
    cy.newUser(user.username);

    cy.get('#userName')
      .type(user.username);

    cy.get('#password')
      .type(user.password)
    
    cy.get('#login')
      .click();

    cy.url()
      .should('include', '/profile')
  });

  it('add a book to the collection', () => {
    cy.login();
    cy.visit('books');

    cy.get('#searchBox')
      .type('Speaking JavaScript')
    
    cy.get('div.rt-tbody')
      .contains('Speaking JavaScript')
        .click()
    
    cy.get('#title-wrapper')
      .should('contain', 'Speaking JavaScript');

    cy.get('#description-wrapper')
      .should('contain', 'JavaScript');

    cy.get('div.mt-2.fullButtonWrap.row')
      .contains('Add')
        .click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.visit('/profile');

    cy.get('div.rt-table')
      .should('contain', 'Speaking JavaScript')

    cy.get('div:nth-child(1) > div > div:nth-child(5) >.action-buttons > #delete-record-undefined')
      .click();
    
    cy.get('div.modal-footer').contains('OK')
    .click();
  });

  it('delete a book from a collection', () => {
    cy.addBook();  
    cy.visit('profile');

    cy.get('div:nth-child(1) > div > div:nth-child(5) >.action-buttons > #delete-record-undefined')
      .click();
    
    cy.get('div.modal-footer').contains('OK')
    .click();

    cy.visit('profile');

    cy.get('div.rt-table')
      .should('not.contain', 'Pocket Guide');
  });
});
