/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should login user', () => {
    cy.get('[placeholder="UserName"]')
      .type('Artq');

    cy.get('[placeholder="Password"]')
      .type('Passw0rd!');

    cy.contains('button', 'Login')
      .click();

    cy.contains('label', 'Artq')
      .should('be.visible');

    cy.url()
      .should('contain', 'https://demoqa.com/profile');
  });

  it('should add a book', () => {
    cy.login('Artq', 'Passw0rd!');

    cy.contains('button', 'Book Store')
      .click();

    //cy.contains('#item-2', 'Book Store').click();

    cy.get('[placeholder="Type to search"]')
      .type('Speaking JavaScript');

    cy.contains('a', 'Speaking JavaScript')
      .click();

    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');

    cy.contains('button', 'Add To Your Collection')
      .click({force: true});

    //cy.on('window:alert', (alert) => {
      // expect(alert).to.eq('Book added to your collection.');

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
   });

    cy.contains('span', 'Profile')
      .click();

    cy.get('.ReactTable')
      .should('contain', 'Speaking JavaScript');
  });

  it('should delete a book', () => {
    cy.login('Artq', 'Passw0rd!');
    
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