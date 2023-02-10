/// <reference types='cypress' />

// const { contains } = require("cypress/types/jquery");

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should login user', () => {
    cy.get('[placeholder="UserName"]')
      .type('k.stadnyk333');
    
    cy.get('[placeholder="Password"]')
      .type('Test333!');
    
    cy.contains('button', 'Login')
      .click();
    
    cy.contains('label', 'k.stadnyk333')
      .should('be.visible');
    
    cy.url()
      .should('contain', 'https://demoqa.com/profile');
  });

  it('should add a book', () => {
    cy.login('k.stadnyk333', 'Test333!');

    cy.contains('button', 'Go To Book Store')
      .click();
    
    cy.get('[placeholder="Type to search"]')
      .type('Speaking JavaScript');
    
    cy.contains('a', 'Speaking JavaScript')
      .click();
    
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    
    cy.contains('button', 'Add To Your Collection')
      .click({force: true});
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.contains('span', 'Profile')
      .click();
    
    cy.get('.ReactTable')
      .should('contain', 'Speaking JavaScript');
  });

  it.only('should delete a book', () => {
    cy.login('k.stadnyk333', 'Test333!');

    cy.get('.rt-tr-group')
      .contains('Speaking JavaScript')
      .get('#delete-record-undefined')
      .click();
    
    cy.contains('button', 'OK')
      .click();
    
    cy.get(".rt-noData")
      .should('contain', 'No rows found')
  });
});

