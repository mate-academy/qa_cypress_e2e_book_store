/// <reference types='cypress' />

describe('BookStore app', () => {
  const user = {
    userName: 'Superqa007',
    password: 'Supertestqa1!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Reuschmayer',
    publisher: 'D\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);

    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.userName);
    cy.url().should('include', '/profile');

    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);

    cy.contains('a', book.title).click();

    cy.get('#title-wrapper').should('contain', book.title);

    cy.get('.text-right > #addNewRecordButton').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });

    cy.visit('/profile');

    cy.contains('a', book.title).should('be.visible');

    cy.contains('[role="row"]', book.title).find('[title = "Delete"]').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});
