/// <reference types='cypress' />

describe('Cypress Homework 4', () => {
  const user = 'UserMO';

  beforeEach(() => {
    cy.login();
  });

  it('Should contain username on the page.', () => {
    cy.get('#userName-value').should('contain', user);
  });

  it('User can add and delete book form books users list', () => {
    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type('you');

    cy.get('[id="see-book-You Don\'t Know JS"]')
      .click();

    cy.get('[class="text-right fullButton"]')
      .click();
  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal(`Book added to your collection.`)
  // });
    cy.get('[class="element-list collapse show"]')
      .contains('Profile')
      .click();

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });

  });
});
