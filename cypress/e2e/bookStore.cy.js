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
    cy.visit('/');
  });

  it('should allow to login with valid credentials', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('be.visible');
    cy.url().should('include', '/profile');
    cy.visit('/login');

    it('should allow to add a book in user collection', () => {
      cy.login(user.userName, user.password);
      cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text')
        .click();
      cy.get('#searchBox').type(book.name);
      cy.contains('a', book.name).click();
      cy.get('#description-wrapper').should('contain', book.description);
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
        cy.visit('/profile');
        cy.contains('a', 'Speaking JavaScript').should('be.visible');
      });

      it('should allow to delete the book from user collection', () => {
        cy.login(user.userName, user.password);
        cy.visit('/profile');
        cy.contains('a', 'Speaking JavaScript').should('be.visible');
        cy.get('#delete-record-undefined').click();
        cy.get('#closeSmallModal-ok').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`Book deleted.`);
        });
      });
    });
  });
});
