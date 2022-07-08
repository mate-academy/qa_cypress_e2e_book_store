/// <reference types='cypress' />

describe('User should', () => {

  const username = 'Cy_test';
  const password = 'Cy_test123@';
  const bookName = 'Speaking JavaScript';

  beforeEach(() => {
    cy.login(username, password);
  });

  it('login successfully', () => {
    cy.url()
    .should('contain', '/profile');

    cy.get('#userName-value')
    .should('have.text', username);
  });

  it('go to the bookstore and search the book', () => {
    cy.get('#gotoStore')
    .click();

    cy.get('#searchBox')
    .type(bookName);

    cy.contains('a', bookName)
    .click();
    
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.')
    });

  });

  it('delete the selected book from the account', () => {
    
    cy.get('[class="rt-tbody"]')
    .should('contain.text', bookName);

    cy.get('#delete-record-undefined')
    .click();

    cy.get('#closeSmallModal-ok')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book deleted.');
    });

    cy.contains('a', bookName)
    .not();
  });
});