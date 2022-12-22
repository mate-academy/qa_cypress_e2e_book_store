/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {

    cy.viewport(1200, 1200)
    cy.visit('https://demoqa.com/login')
  });

  it('should allow to login, add a book to cart and delete it from cart', () => {
    cy.get('#userName').type('lexif');
    cy.get('#password').type('Lexif@2022');
    cy.get('#login').click();
    cy.get('[id="userName-value"]').should('contain', 'lexif');
    cy.url().
    should('include', 'profile');

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2').click();
    cy.get('[id="searchBox"]').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').
    should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    
    cy.get('.text-right > #addNewRecordButton').click();
    cy.wait(4000);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });

    cy.visit('https://demoqa.com/profile');
    cy.get('[id="see-book-Speaking JavaScript"]').should('contain', 'Speaking JavaScript');
    cy.get('[id="delete-record-undefined"]').click();
    cy.wait(4000);
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
  });
  });
});
