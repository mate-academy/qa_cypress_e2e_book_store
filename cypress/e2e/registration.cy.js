/// <reference types='cypress' />

describe('Cypress Homework 4', () => {
  const user = 'UserMO';

  beforeEach(() => {
    cy.login();
  });

  it('User can add and delete book form books users list', () => {
    cy.get('#userName-value')
    .should('contain', user);

    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type('you');

    cy.get('[id="see-book-You Don\'t Know JS"]')
      .should('contain', 'You');

    cy.get('[id="see-book-You Don\'t Know JS"]')
      .click();

    cy.contains('[class="col-12 mt-4 col-md-6"]', 'You Don\'t Know JS')
      .should('exist');

    cy.contains('[class="col-12 mt-4 col-md-6"]', 'ES6 & Beyond')
      .should('exist');

    cy.contains('[class="col-12 mt-4 col-md-6"]', 'Kyle Simpson')
      .should('exist');

    cy.contains('[class="col-12 mt-4 col-md-6"]', 'O\'Reilly Media')
      .should('exist');

    cy.get('[class="text-right fullButton"]')
      .click();

    cy.checkAlert1();

  //   cy.once('window:alert', (str) => {
  //     expect(str).to.equal(`Book added to your collection.`)
  // });

    cy.get('[class="element-list collapse show"]')
      .contains('Profile')
      .click();

    cy.contains('[id="see-book-You Don\'t Know JS"]', 'You Don\'t Know JS')
      .should('exist');
    
    cy.get('#delete-record-undefined')
      .click();

    cy.contains('[class="modal-content"]', 'Delete Book')
      .should('exist');
    
    cy.contains('[class="modal-content"]', 'Do you want to delete this book?')
      .should('exist');

    cy.get('#closeSmallModal-ok')
      .click();

    cy.checkAlert2();

    // cy.once('window:alert', (str) => {
    //   expect(str).to.equal(`Book deleted.`);
    // });
  });
});
