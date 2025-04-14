/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
 cy.visit('https://demoqa.com/login');
  });

  const username = 'Kaden23';
  const password = 'Kaden231!';
  const bookName = 'Speaking JavaScript';
  const bookDescription = 'Like it or not, JavaScript is everywhere these days-from';
  it(' should provide the ability to log in, add and delete the book', () => {
    cy.viewport(1920, 1080);
    cy.get('[placeholder="UserName"]').type(username);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('#login').click();
    cy.url().should('contain', 'profile');
    cy.get('#userName-value').should('contain', username);

    cy.get('.menu-list').contains('Book Store').click();
    cy.get('[placeholder="Type to search"]').type(bookName);
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper').should('contain', bookDescription);
    cy.get('.text-right #addNewRecordButton').click();
    cy.on('window:confirm', () => true);
   
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:confirm', () => true);
  });
});
