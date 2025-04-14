/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
  });

  const username = 'wesaf';
  const password = 'PassW0rd!';
  const alertText = {
    alertTextAdded: 'Book added to your collection',
    alertTextDeleted: 'Book deleted'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };
  it('allow successful login, add book and delete book', () => {
    cy.get('[placeholder="UserName"]').type(username);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('#login').click();

    cy.url().should('contain', 'profile');
    cy.get('#userName-value').should('contain', username);

    cy.get('.menu-list').contains('Book Store').click();
    cy.get('.rt-table').contains(book.title).click();
    cy.get('#title-wrapper').should('contain', 'Title');
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#author-wrapper').should('contain', 'Author');
    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#publisher-wrapper').should('contain', 'Publisher');
    cy.get('.text-right #addNewRecordButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertTextAdded);
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', book.title);
    cy.get('[title="Delete"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertTextDeleted);
    });
  });
});