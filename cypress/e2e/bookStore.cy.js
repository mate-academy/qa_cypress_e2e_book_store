/// <reference types='cypress' />


const user = {
  username: 'BookStore',
  password: 'Book1234!',
};

const book = {
  name: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere',
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
  });

  it('Should provide an ability to log in', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);

    cy.findByPlaceholder('Password')
      .type(user.password);

    cy.get('[id=login]')
      .click();
    
    cy.url()
      .should('include', '/profile');

    cy.get('[id=userName-value]')
      .should('have.text', user.username);
  });

  it('Should provide an ability to search for the book and add to the cart', () => {
    cy.login(user.username, user.password)
    cy.visit('/profile')
    cy.get('[id=gotoStore]')
      .click()
    
    cy.findByPlaceholder('Type to search')
      .type(book.name);
    cy.contains('[role="row"]', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher); 
    
    cy.contains('a', book.name)
      .click();
    cy.contains('[id=description-wrapper]', 'Description')
      .should('contain', book.description);

    cy.contains('[id=addNewRecordButton]', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book added to your collection.')
    });
  });

  it('Should provide an ability to delete the book from the cart', () => {
    cy.login(user.username, user.password)
    cy.visit('/profile')

    cy.get('[id=userName-value]')
      .should('have.text', user.username);

    cy.get('[id=delete-record-undefined]')
      .click();
    
    cy.get('.modal-body')
      .should('contain.text', 'Do you want to delete this book?')  
    
    cy.get('[id=closeSmallModal-ok]')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book deleted.')
    });
  });
});
