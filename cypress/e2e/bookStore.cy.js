/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'Tester991';
  const password = 'Test42$@';

  before(() => {
    cy.viewport(1920, 1080);
  });

  it('should add a book to the user"s account', () => {
    cy.login(username, password);
    cy.url().should('contain', 'profile');
    cy.get('.menu-list').contains('Book Store').click();
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript{enter}');
    cy.get('a[href="/books?book=9781449365035"]').click();

    cy.get('#description-wrapper').should('contain', 'Like it or not');
    cy.get('.text-right #addNewRecordButton').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.')
        .click({ enter: true });
    });
  });

  it('should delete book from the user"s account', () => {
    cy.login(username, password);
    cy.get('.menu-list').contains('Profile').click();

    cy.get('[title="Delete"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you want to delete this book?');
      return true;
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book deleted.');
    });
  });
});
