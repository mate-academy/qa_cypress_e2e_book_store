/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'test_qa',
    password: 'Qwerty123@'
  };

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/login');
  });

  it('should provide the ability to log in', () => {
    cy.login(user.username, user.password);

    cy.contains(user.username)
      .should('be.visible');
  });

  it('should provide ability to add a book', () => {
    cy.login(user.username, user.password);

    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type(book.title);

    cy.get('.rt-table')
      .contains(book.title)
      .click();

    cy.get('#description-wrapper')
      .should('contain', book.description);

    cy.get('.text-right #addNewRecordButton')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide ability to delete a book', () => {
    cy.login(user.username, user.password);

    cy.contains(user.username)
      .should('be.visible');

    cy.get('.menu-list').contains('Profile')
      .click();
    cy.get('.rt-table')
      .should('contain', book.title);
    cy.get('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
