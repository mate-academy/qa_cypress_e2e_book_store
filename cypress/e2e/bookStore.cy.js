/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = "dieromin";
  const password = "#Fcdk1927";
  const book = "Speaking JavaScript";
  const description = "Like it or not, JavaScript is everywhere";

  beforeEach(() => {
  
    cy.visit('/books');
    
  });

  it('should test the given flow', () => {
    cy.contains("Login").click();
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('.text-right > #userName-value').should('contain', username);

    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book);
    cy.contains ('a', 'Speaking JavaScript').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  })
  
    cy.visit('/profile');
    cy.contains ('a', book);
    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
  })
    
  })
  });
