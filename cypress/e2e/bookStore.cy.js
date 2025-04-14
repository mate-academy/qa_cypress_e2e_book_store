/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'testbook';
  const password = 'Testb00k#';

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/login');
    cy.get('[placeholder="UserName"]').type(username);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', username);
    cy.url().should('include', '/profile');
  });

  it('should add a book', () => {
    cy.viewport(1920, 1080);
    cy.get('#gotoStore').click();
    cy.get('[placeholder="Type to search"]').type(book.title);
    cy.get('.rt-table').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should delete a book', () => {
    cy.get('.rt-table').should('contain', book.title);
    cy.get('[title="Delete"]').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
