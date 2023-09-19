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
    cy.get('#searchBox').type('Spea');
    cy.get('.action-buttons').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', 'Like it or not, JavaScript is everywhere these');
    cy.get('.text-right > #addNewRecordButton').click({ force: true });
    cy.on('window:alert', (str) => {expect(str).to.equal('Book added to your collection.');
    });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', titleOfBook);
  });

  it('should delete book', () => {
    cy.login(username, password);
    cy.get('#userName-value').should('contain', username);

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', titleOfBook);

    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {expect(str).to.equal('Book deleted.');
    });
  });
});
