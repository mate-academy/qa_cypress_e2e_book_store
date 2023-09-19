/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'mira.rudd';
  const password = 'QAqwerty@123';
  const bookAdded = 'Book added to your collection.';
  const bookDeleted = 'Book deleted.';
  const bookDescr = 'Like it or not, JavaScript is everywhere these';

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should log in and navigate to the profile page', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', username);
    cy.url().should('contain', '/profile');
  });

  it('should add the book to the collection', () => {
    cy.login(username, password);
    cy.url().should('contain', '/profile');

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', bookDescr);
    cy.get('.text-right > #addNewRecordButton').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(bookAdded);
    });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', 'Speaking JavaScript');
  });

  it('should  delete book from the collection', () => {
    cy.login(username, password);
    cy.url().should('contain', '/profile');

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', 'Speaking JavaScript');

    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(bookDeleted);
    });
  });
});
