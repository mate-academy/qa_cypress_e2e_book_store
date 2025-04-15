/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should login, add and delete a book', () => {
    cy.viewport(1920, 1080);
    const userName = 'tuwafe123';
    const password = 'QAqwerty@123';
    const description = 'Like it or not';

    cy.get('[placeholder="UserName"]').type(userName);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('[id="login"]').click();
    cy.get('[id="userName-value"]').should('contain', userName);
    cy.url().should('contain', 'profile');

    cy.get('.menu-list').contains('Book Store').click();
    cy.get('[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('[id="description-wrapper"]').should('contain', description);

    cy.get('.text-right #addNewRecordButton').click();
    cy.get('.menu-list').contains('Profile').click();
    cy.get('[href="/profile?book=9781449365035"]').should('exist');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:confirm', () => true);
  });
});
