/// <reference types='cypress' />

describe('Book Store app', () => {
  const userName = 'iravakula';
  const myPassword = 'Ira@12345';

  const book = {
    title: 'Speaking JavaScript',
    desription: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  before(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
  });

  it('should successfully loggin the user with valid credentials', () => {
    cy.getByPlaceholder('UserName').type(userName);

    cy.getByPlaceholder('Password').type(myPassword);

    cy.get('#login').click();

    cy.url().should('contain', 'profile');

    cy.get('#userName-value').should('exist').and('contain', userName);
  });
  it('should provide ability to add book to the Cart', () => {
    cy.login(userName, myPassword);

    cy.url().should('contain', 'profile');

    cy.get('.menu-list').contains('Book Store').click();

    cy.getByPlaceholder('Type to search').type(book.title);

    cy.get('#basic-addon2').click();

    cy.get('[href="/books?book=9781449365035"]').click();

    cy.get('#description-label').should('exist');

    cy.get('#description-wrapper').should('contain', book.desription);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });

    cy.contains('#item-3', 'Profile').click();

    cy.get('.rt-table').should('contain', book.title).and('contain', 'Axel Ra');
  });

  it('should provide ability to delete book from the Cart', () => {
    cy.login(userName, myPassword);

    cy.url().should('contain', 'profile');

    cy.get('#delete-record-undefined').click();

    cy.get('.modal-body').should('contain', 'Do you want to delete this book?');

    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});
