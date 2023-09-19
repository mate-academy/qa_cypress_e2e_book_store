/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'marianatest',
    password: 'Mariana12345!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: '0\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should allow to login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('Should allow to add a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('.btn.btn-primary').eq(2).click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });
  });

  it('Should allow to delete a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('.modal-body').should('contain', 'Do you want to delete this book');
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});
