/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'arskib';
  const password = 'QWErty123!';
  const book = 'Speaking JavaScript';

  beforeEach(() => {
    cy.login(username, password);
  });

  it('should provide an ability to login', () => {
    cy.get('#userName-value').should('contain', username);
    cy.url().should('include', '/profile');
  });

  it('should provide an ability to add a book', () => {
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book);
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper #userName-value')
      .should('contain', 'Like it or not, JavaScript is everywhere');
    cy.get('.text-right.fullButton #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide an ability to delete a book', () => {
    cy.get('.mr-2').should('contain', book);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
