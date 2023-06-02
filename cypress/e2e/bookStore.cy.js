/// <reference types='cypress' />

describe('Book Store app', () => {
  const userName = 'testuser13';
  const password = 'Testuser13!';
  const bookName = 'Speaking JavaScript';

  before(() => {
    cy.visit('/');
  });

  it('should log the registered user in', () => {
    cy.get('#userName')
      .type(userName);
    cy.get('#password')
      .type(password);
    cy.get('#login')
      .click();
    cy.get('#books-wrapper > .text-right')
      .should('contain', userName);
    cy.url()
      .should('contain', '/profile');
  });

  it('should add the book to the collection', () => {
    cy.login();
    cy.visit('https://demoqa.com/profile');
    cy.get('#books-wrapper > .text-right')
      .should('contain', userName);
    cy.url()
      .should('contain', '/profile');
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text')
      .click();
    cy.get('#searchBox')
      .type(bookName);
    cy.contains('a', bookName)
      .click();
    cy.get('#description-wrapper > .col-md-9')
      .should('contain', 'Like it or not, JavaScript is everywhere these days');
    cy.contains('button', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should delete the book from the list', () => {
    cy.login();
    cy.visit('https://demoqa.com/profile');
    cy.get('.ReactTable')
      .should('contain', bookName);
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
  });
});
