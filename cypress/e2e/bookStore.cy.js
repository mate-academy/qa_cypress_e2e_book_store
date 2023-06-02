/// <reference types='cypress' />

describe('Book Store app', () => {
  const bookName = 'Speaking JavaScript';

  beforeEach (() => {
    cy.visit('/login');
  });

  it('should login user with existing creds', () => {
    const userName = 'annalymorenko';
    const password = 'Password12!';

    cy.get('#userName')
      .type(userName);

    cy.get('#password')
      .type(password);

    cy.contains('button', 'Login')
      .click();

    cy.get('#userName-value')
      .should('contain', userName);

    cy.url()
      .should('eq', 'https://demoqa.com/profile');
  });

  it('should add a book to the profile', () => {
    cy.login();

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
  });

  it('should delete a book from the profile', () => {
    cy.login();

    cy.contains('#item-3', 'Profile')
      .click();

    cy.contains('[role="row"]', bookName)
      .find('[title="Delete"]')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book deleted.');
    });
  });
});
