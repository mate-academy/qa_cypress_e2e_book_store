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
  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted'
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
  });

  it('should allow to add a book in user collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox').type(book.name);
    cy.contains('a', book.name).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
      cy.visit('/profile');
      cy.contains('a', 'Speaking JavaScript').should('be.visible');
    });
  });

  it.only('should allow to delete the book from user collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book.name);
    cy.contains('a', book.name).click();
    cy.get('.text-right > #addNewRecordButton').click();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
