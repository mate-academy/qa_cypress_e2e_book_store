/// <reference types='cypress' />

const user = {
  username : 'boris',
  password : 'strongPass1!',
}

const book = {
  name: 'Speaking JavaScript',
}

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to login', () => {
    cy.get('[placeholder="UserName"]')
      .type(user.username);
    cy.get('[placeholder="Password"]')
      .type(user.password);
    cy.get('#login')
      .click();

    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('have.text', user.username);
  });
  
  it('should provide an ability to find a book and add to cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/books');
    cy.url({ timeout: 10000 })
      .should('include', '/books');
    cy.get('#userName-value')
      .should('have.text', user.username);
    cy.get('[placeholder="Type to search"]')
      .type(book.name);
    cy.contains('a', book.name)
      .click();
    cy.contains('#title-wrapper', 'Title')
      .should('contain', book.name);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    })
  });

  it('should provide an ability to find delete book', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    })
  });  
});
