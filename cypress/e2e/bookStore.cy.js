/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Adamas1',
    password: '1234567Qwert!@'
  };

  const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere'
  };

  before(() => {
    cy.visit('https://demoqa.com/');
  });

  it('should allow to login with valid credentials', () => {
    cy.visit('https://demoqa.com/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('be.visible');
  });

  it('should  allow to add a book to collection', () => {
    cy.visit('https://demoqa.com/login');
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text')
      .click();

    cy.get('#searchBox').type(book.name);
    cy.contains('a', book.name).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    it('should allow to delete added book from collection', () => {
      cy.visit('https://demoqa.com/profile');

      cy.contains('a', book.name);
      cy.get('#delete-record-undefined').click();
      cy.get('#closeSmallModal-ok').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Book deleted.');
      });
    });
  });
});
