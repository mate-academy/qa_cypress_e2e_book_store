/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1920, 1080);
  });

  const userName = 'danger';
  const password = 'P@ssw0rd';
  const book = 'Speaking JavaScript';
  const bookDescription = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere'
  };

  it.skip('should provide ability to Login', () => {
    cy.login(userName, password);
    cy.url().should('contain', 'profile');
    cy.get('#userName-value').should('contain', userName);
  });

  it('should provide ability to add and delete book', () => {
    cy.viewport(1920, 1080);
    cy.login(userName, password);
    cy.wait(2000);
    cy.get('.menu-list #item-2').contains('Book Store').click();
    cy.url().should('contain', 'books');
    cy.get('#searchBox').type(book);
    cy.get('.action-buttons a').contains(book).click();
    cy.get('#title-wrapper').should('contain', bookDescription.title);
    cy.get('#author-wrapper').should('contain', bookDescription.author);
    cy.get('#publisher-wrapper').should('contain', bookDescription.publisher);
    cy.get('#description-wrapper').should('contain', bookDescription.description);
    cy.get('.text-right #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-td').contains(book);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});