/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'userTest1',
    password: 'Qwerty!23'
  };

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere'
  };
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow user to log in', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow user to add a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible');
  });
  it('should allow user to delete a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('.modal-body').should('contain', 'Do you want to delete this book?');
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
