/// <reference types='cypress' />
// /// <reference types="../support"/>


const user = {
  username: "Adam",
  password: "12345Qwert!"
};

const book ={
  name: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere',
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
  });

  it('Should provide abbility to log in', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);
    cy.findByPlaceholder('Password')
      .type(user.password);

    cy.get("#login")
      .click();

    cy.url().should('include', '/profile');
  
    cy.get('#userName-value').should('have.text', 'Adam');
});

  it('Should provide an abbility to Search for the book and add to chart', () => {
    
    cy.visit('/login');

    cy.login(user.username, user.password);

    cy.wait(500);

    cy.contains('[id=item-2]', 'Book Store')
    .click();

    cy.contains('#userName-value', user.username);

    cy.findByPlaceholder('Type to search')
      .type(book.name);

    cy.contains ('[role="row"]', book.name)
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
      .to.equal('Book added to your collection.');

    });

      cy.get('#submit')
        .click();

      cy.contains('.playgound-header', 'Login')
});

it('Should provide an abbility to delete the book ', () => {

    cy.login(user.username, user.password);

    cy.wait(500);

    cy.visit('/profile');

    cy.url().should('include', '/profile');
  
    cy.get('#userName-value')
      .should('have.text', 'Adam');

    cy.get('[id="delete-record-undefined"]')
      .click();

    cy.get('.modal-body')
      .should('contain.text', 'Do you want to delete this book?');

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book deleted.');
    });
      
  });

});
