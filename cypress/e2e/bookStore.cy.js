/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'testqa123!';
  const password = 'Password123!';

  const book = {
    title: 'Speaking JavaScript',
    subTitle: 'An In-Depth Guide for Programmers',
    author: 'Axel Rauschmayer', 
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these',
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.',
  }

  it('login', () => {
    cy.visit('/');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();

    cy.url().should('contain', 'profile');
    cy.get('#userName-value').should('contain', username);
  });

  it.only('add a book', () => {
    cy.login(username, password);
    cy.url().should('contain', 'profile');

    cy.get('.menu-list #item-2').contains('Book Store').click();
    cy.url().should('contain', 'books');
    cy.get('[class="ReactTable -striped -highlight"]').should('exist');
    cy.get('[id="see-book-Speaking JavaScript"]').click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#subtitle-wrapper').should('contain', book.subTitle);
    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#publisher-wrapper').should('contain', book.publisher);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.get('.text-right #addNewRecordButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
  });
  
    cy.get('.menu-list #item-3').contains('Profile').click();
    cy.url().should('contain', 'profile');
    cy.get('.ReactTable').should('contain', book.title);

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
});
  });
});
