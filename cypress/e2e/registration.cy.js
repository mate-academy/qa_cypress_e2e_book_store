/// <reference types='cypress' />

describe('User should have an ability to', () => {
  const user = {
    username: 'fbi',
    password: 'Secret13!',
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    decription: 'Like it or not'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
    cy.login();
  });

  it('User is able to log in', () => {
    cy.get('#userName-value')
    .should('contain', user.username);
  });

  it('User is able to add book to collection', () => {
    cy.contains('.btn.btn-light', 'Book Store')
    .click();

    cy.url()
    .should('include', '/books');

    cy.findByPlaceholder('Type to search')
    .type('Speaking JavaScript');

    cy.get('.col-12.mt-4.col-md-6')
    .should('contain.text', 'Speaking JavaScript');

    cy.contains('[role="row"]', book.title)
    .should('contain', book.author)
    .and('contain', book.publisher);

    cy.get('.action-buttons')
    .click();

    cy.get('#description-wrapper > .col-md-9 > #userName-value')
    .should('contain', book.decription);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click({force: true});

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(added);
    });
  });

  it('delete book from collection', () => {
    cy.contains('#item-3', 'Profile')
    .click();

    cy.contains('[role="row"]', book.title)
    .find('#delete-record-undefined')
    .click();

    cy.get('#closeSmallModal-ok')
    .click();

    cy.on('window:alert', (alert) => {
      exprect(alert).to.equal(allertMessage.deleted);
    });
  });
});