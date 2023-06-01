/// <reference types='cypress' />

import { beforeEach } from "mocha";

describe('Book Store app', () => {
  const testData = {
    username: 'Vik_test',
    password: 'Vik_pass1!',
    book: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media'
  };

  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('Successful login', () => {
    cy.get('[placeholder="UserName"]').type(testData.username);
    cy.get('[placeholder="Password"]').type(testData.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', testData.username)
    cy.url().should('include', '/profile');
  });

  it('Add a book', () => {
    cy.login(testData.username, testData.password);
    cy.contains('#item-2', 'Book Store').click();
    cy.get('[placeholder="Type to search"]').type(testData.book);
    cy.contains('[role="row"]', testData.book).should('contain', testData.author).and('contain', testData.publisher);
    cy.contains('a', testData.book).click();
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Book added to your collection.');
    })
  });

  it('Delete book', () => {
    cy.login(testData.username, testData.password);
    cy.wait(8000);
    cy.contains('#item-3', 'Profile').click();
    cy.contains('[role="row"]', testData.book).find('[title="Delete"]').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Book deleted');
    })
  });
});
