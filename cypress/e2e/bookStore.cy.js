/// <reference types='cypress' />

const user = {
  username:'John',
  password: 'Test@12345'
};

const book = {
  name: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'This concise book guides you into and through JavaScript'
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');  
  });

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.get('#login')
      .click();

    cy.url()
      .should('include', '/profile');  
    cy.get('#userName-value')
      .should('have.text', user.username);
  });

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('[id="item-2"]', 'Book Store')
      .click();
    cy.findByPlaceholder('Type to search')
      .type(book.name);
    cy.contains('[role="row"]', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.contains('a', book.name)
      .click();
    cy.contains('#description-wrapper', 'Description')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book added to your collection.')
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');

    cy.findByPlaceholder('Type to search')
      .type(book.name);
    cy.get('#basic-addon2')
      .click();

    cy.get('#delete-record-undefined')
      .click();
    
    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book deleted.`)
    });
  });
});
