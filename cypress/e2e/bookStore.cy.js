/// <reference types='cypress' />


describe('Book Store app', () => {
  const bookName = 'Speaking JavaScript';
  const user = {
    username: 'CaptainAmerica',
    password: 'Qwerty1!',
  };
  before(() => {

    cy.visit('/login');
  });

 
  it('should provide an ability to login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.contains('button', 'Login')
    .click();
    cy.get('#userName-value')
    .should('contain', user.username);
    cy.url()
    .should('eq', '/profile');
});


it('should add a book to the profile', () => {

  cy.login();
  cy.visit('https://demoqa.com/profile');

  cy.contains('#item-2', 'Book Store')
    .click();

  cy.get('#searchBox')
    .type(bookName);

  cy.contains('a', bookName)
    .click();

  cy.contains('.form-label', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')
    .should('exist');

  cy.contains('button', 'Add To Your Collection')
    .click();

  cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });

  it('should delete a book from the profile', () => {

    cy.login();

    cy.visit('https://demoqa.com/profile');

    cy.contains('.ReactTable', bookName)
      .should('exist');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });

  });

  });
