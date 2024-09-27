/// <reference types='cypress' />

describe('Book Store app', () => {
  const login = 'Fungdell1';
  const password = 'Fungdell@£4';
  const url = 'https://demoqa.com/login';

  const book = {
    name: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  };
  before(() => {
    cy.visit(url);
    cy.viewport(1980, 1130);
  });

  it('is able to log in', () => {
    cy.get('#userName').type(login);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', login);
    cy.url().should('include', '/profile');

    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book.name);
    cy.get('.rt-table').contains(book.name).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click();

    cy.on('window:alert', (str) => {
      if (str === 'Book added to your collection.') {
        expect(str).to.equal('Book added to your collection.');
      } else if (str === 'Book deleted.') {
        expect(str).to.equal('Book deleted.');
      }
    });

    cy.visit('https://demoqa.com/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
