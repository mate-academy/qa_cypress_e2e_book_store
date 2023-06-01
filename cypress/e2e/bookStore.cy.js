/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
  });

  const username = 'TetserUsername';
  const password = 'Password1@';
  const book = 'Speaking JavaScript';
  const bookDescription = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o';

  it('should login with existing login data', () => {

    cy.visit('/')
    
    cy.findById('userName')
    .type(username);

    cy.findById('password')
    .type(password);

    cy.findById('login')
    .click();

    cy.url()
    .should('eq', 'https://demoqa.com/profile');

    cy.get('#userName-value')
    .should('contain.text', username);
  });

  it('should allow to add book', () => {
    
    cy.login();
    cy.visit('https://demoqa.com/profile');

    cy.findById('gotoStore')
    .click();

    cy.url()
    .should('eq', 'https://demoqa.com/books')

    cy.findById('searchBox')
    .type(book);

    cy.contains(book)
    .click();

    cy.contains('#userName-value', bookDescription)
    .should('exist');

    cy.contains('button', 'Add To Your Collection')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
  });

  it('should allow to delete book', () => {

    cy.login();
    cy.visit('https://demoqa.com/profile');

    cy.contains('.ReactTable', book)
    .should('exist');

    cy.findById('delete-record-undefined')
    .click();

    cy.findById('closeSmallModal-ok')
    .click();
  });
});
