/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.viewport(1200, 1200)
    cy.visit('https://demoqa.com/login')
  });

  it('should check login, add to cart and delete from cart flow', () => {
    cy.get('#userName').type('KyleStone');
    cy.get('#password').type('Vv12345!');
    cy.get('#login').click();
    cy.get('.container > :nth-child(2)').should('contain', 'KyleStone');
    cy.url().should('include', 'profile');
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.mr-2').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.once('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.visit('https://demoqa.com/profile')
    /*cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();*/
    cy.get('body').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});

