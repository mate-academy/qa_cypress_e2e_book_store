/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.login('TestUser7', 'TestUser7!');
    cy.visit('/profile');
  });

  it('Should be successful login', () => {
    cy.get('#userName-value')
        .should('contain.text', 'TestUser7');
  });
    
  it('Should be added book', () => {
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
      .click();

    cy.get('.main-header')
     .should('contain.text', 'Book Store');

    cy.get('#searchBox')
      .type('Speaking JavaScript');
    
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2) a')
      .click();

    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .should('contain.text', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');

    cy.get('.text-right > #addNewRecordButton')
      .click({force: true});

    cy.once('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3')
      .click();

    cy.get('.ReactTable')
      .should('contain.text', 'Speaking JavaScript');

  });

  it('Should be deleted book', () => {    
    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
