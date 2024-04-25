/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/');
  });

  it('', () => {
    cy.get('.category-cards > :nth-child(6) > :nth-child(1)').click();
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-0').click();
    cy.get('#userName').type('Hairy');
    cy.get('#password').type('Qwerty123#');
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'Hairy');
    cy.url().should('eq', 'https://demoqa.com/profile');
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
  });
});
