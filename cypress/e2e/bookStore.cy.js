/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1000, 1200);
  });

  // eslint-disable-next-line max-len
  it('should be able to login, add book to the collection and delete it', () => {
    let firstAlertHandled = false;
    cy.get('#userName').type('pawgrzy');
    cy.get('#password').type('Qwer123!');
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'pawgrzy');
    cy.url().should('include', '/profile');
    cy.get('.menu-list').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
    // eslint-disable-next-line max-len
    cy.get('.form-label').should('contain.text', 'Like it or not, JavaScript is everywhere');
    cy.get('[type="button"]').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      if (!firstAlertHandled) {
        expect(str).to.equal('Book added to your collection.');
        firstAlertHandled = true;
      } else {
        expect(str).to.equal('Book deleted.');
      };
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.profile-wrapper').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
