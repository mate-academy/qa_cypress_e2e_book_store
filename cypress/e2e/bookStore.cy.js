/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.login();
  });

  const name = 'Speaking JavaScript';
  const author = 'Axel Rauschmayer';
  const publisher = 'O\'Reilly Media';

  it('should provide an ability to find and add book', () => {
    cy.contains('#item-2', 'Book Store').click();

    cy.url().should('include', '/books');

    cy.get('#searchBox').type('Speaking JavaScript{enter}');

    cy.get('.ReactTable').should('contain', name, author, publisher);

    cy.contains('.rt-tr.-odd', name)
      .should('contain', author)
      .and('contain', publisher);

    cy.contains('.action-buttons', name).click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.');
    });
  });

  it('should provide an ability to delete book', () => {
    cy.contains('#item-3', 'Profile').click();

    cy.url().should('include', '/profile');

    cy.contains('.rt-tr.-odd', name)
      .should('contain', author)
      .and('contain', publisher)
      .find('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok').click();

    cy.contains(author, name, publisher).should('not.exist');
  });
});
