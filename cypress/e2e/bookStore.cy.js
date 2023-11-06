/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'hywomosamo',
    password: 'QwertY!8787'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };
  const alertMessage = {
    added: 'Book added to your collection',
    deleted: 'Book deleted'
  };

  beforeEach(() => {
    cy.visit('/login')
  });

  it('Should provide an ability to login', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
  });

  it.only('Should provite an ability to searh for the "Speaking JavaScript" book, add to collection and delete from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('.action-buttons')
      .click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('windiw:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', book.title)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('windiw:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
      });
    });
  });
});
