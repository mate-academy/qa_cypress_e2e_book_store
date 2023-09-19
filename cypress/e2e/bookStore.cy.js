/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    const username = 'bozyha';
    const password = 'Testpass123!';
    cy.visit('https://demoqa.com/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', username);
    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should test the Book Store flow', () => {
    cy.get('#gotoStore').click({ force: true });

    cy.get('#searchBox').type('Speaking JavaScript');

    cy.get('#basic-addon2').click();
    cy.get('a[href="/books?book=9781449365035"]').click();

    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', 'JavaScript is everywhere');
    cy.get('.text-right > #addNewRecordButton').click({ force: true });
    
    cy.window().then((win) => {
      win.close();
    });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-0').click();
    cy.get('a[href="/profile"]').click();
    cy.get('.rt-tbody .rt-tr').should('contain', 'Speaking JavaScript');
    cy.get('.buttonWrap > .text-right > #submit').click({ force: true });
    cy.get('#closeSmallModal-ok').should('be.visible');
    cy.get('#closeSmallModal-ok').click();
    cy.window().then((win) => {
      win.close();
    });
  });
});
