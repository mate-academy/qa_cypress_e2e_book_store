/// <reference types='cypress' />
const user = {
  username: 'totoro777',
  password: 'Totoro777!',
};

const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.'
}

describe('Book Store app', () => {
  before(() => {
   cy.visit('/');
    
  });

  it('login with valid creds', () => {
    cy.visit('/login');
    cy.findByPlaceholder("UserName")
      .type(user.username);
    cy.findByPlaceholder("Password")
      .type(`${user.password}{enter}`);
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('have.text', user.username);
  });

  it('searching for a book and adding to the cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.publisher)
      .and('contain', book.author);
    cy.contains('a', book.title)
      .click();
    cy.contains('#description-wrapper', 'Description')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.equal('Book added to your collection.');
    })
  });

  it('deleting the book', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains(book.title);
    cy.get('#delete-record-undefined')
      .click();
    // cy.on('window:alert', (alert) => {
    //   expect(alert)
    //   .to.equal('Do you want to delete this book?');    
    // });
    cy.get('#closeSmallModal-ok')
      .click();
  });
});
