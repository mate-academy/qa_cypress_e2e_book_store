/// <reference types='cypress' />
describe('Book Store app', () => {
 
 const user = {
  username: 'TesterTest',
  password: 'Qwerty12345!'
};

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should provide an ability to log in with registered data', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('#login', 'Login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should provide an ability to add a book to user\'s profile', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#publisher-wrapper').should('contain', book.publisher);
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });
    cy.contains('#item-3', 'Profile').click();
    cy.get('.mr-2').should('contain', book.title);
  });

  it('should provide an ability to delete book from collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.contains('button', 'OK').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});

