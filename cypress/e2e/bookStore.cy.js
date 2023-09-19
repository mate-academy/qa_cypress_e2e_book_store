/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'tester228';
  const password = 'euyD~@)6cMcKtd6';

  before(() => {
    cy.login(username, password);
  });

  it('should add a book to the user"s account', () => {
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

    cy.get('.menu-list').contains('Profile').click();
    cy.get('a[href="/books?book=9781449365035"]');

    cy.get('[title="Delete"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Do you want to delete this book?')
        .click({ enter: true });
    });
  });
});
