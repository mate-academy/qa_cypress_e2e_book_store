/// <reference types='cypress' />
const user = {
  username: 'Explorer',
  password: '1234567Tt@'
};

const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these days'
};

const alertMessage = {
  added: 'Book added to your collection.',
  deleted: 'Book deleted.'
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should allow to login with valid creds', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
    cy.get('#gotoStore').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();

    cy.get('#description-wrapper').should('contain.text', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.added);
    });

    cy.visit('/profile');

    cy.contains('a', book.title).should('be.visible');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
      .should('contain', book.author);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain', book.publisher);

    cy.get('#delete-record-undefined').click();

    cy.get('.modal-header').should('contain', 'Delete Book');
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.deleted);
    });
  });
});
