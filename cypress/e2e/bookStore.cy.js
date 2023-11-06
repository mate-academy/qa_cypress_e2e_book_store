/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'test_qa';
  const password = 'Qwerty123@';

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/login');
    cy.get('#userName')
      .type(username);
    cy.get('#password')
      .type(password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', username);
    cy.url()
      .should('include', '/profile');
  });

  it('should provide ability to add a book', () => {
    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type(book.title);

    cy.get('.rt-table')
      .contains(book.title)
      .click();

    cy.get('#description-wrapper')
      .should('contain', book.description);

    cy.get('.text-right #addNewRecordButton')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide ability to delete a book', () => {
    cy.get('.menu-list').contains('Profile')
      .click();
    cy.get('.rt-table')
      .should('contain', book.title);
    cy.get('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
