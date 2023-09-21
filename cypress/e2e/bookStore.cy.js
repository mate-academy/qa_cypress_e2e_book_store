/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'iinna';
  const password = 'Inna@12345';
  const titleOfBook = 'Speaking JavaScript';
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should allow to log in and be redirected to the profile', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', username);
  });

  it('should allow to add the book', () => {
    cy.login(username, password);
    cy.get('#userName-value').should('contain', username);

    cy.get('#gotoStore').click({ force: true });
    cy.get('[placeholder="Type to search"]').type('Spea');
    cy.get('.action-buttons').click();
    cy.get('#description-wrapper').should('contain', 'Like it or not, JavaScript is everywhere these');
    cy.get('.text-right > #addNewRecordButton').click({ force: true });
    cy.on('window:alert', (str) => {expect(str).to.equal('Book added to your collection.');
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', titleOfBook);
  });

  it('should delete book', () => {
    cy.login(username, password);
    cy.get('#userName-value').should('contain', username);

    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', titleOfBook);


    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {expect(str).to.equal('Book deleted.');
    });
  });
});