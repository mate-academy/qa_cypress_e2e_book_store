// cypress/integration/register.spec.js

describe("login", () => {
  it("should login a new user", () => {
    cy.visit('https://demoqa.com/login');
    cy.get('#userName').type('Olesia Semen');
    cy.get('#password').type('123Olesia!');
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'Olesia Semen');
    cy.url().should('eq', 'https://demoqa.com/profile');
    cy.visit('https://demoqa.com/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('Speaking JavaScript').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value')
    cy.contains('Add To Your Collection').click({force: true});
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Book added to your collection.');
    });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3 > .text').click();
    cy.get('.rt-tr-group').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
        cy.get('#closeSmallModal-ok').click();
  });
  });
