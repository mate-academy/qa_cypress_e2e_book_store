/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
  cy.visit ('/login');
  });

  const user = {
    username: 'sie',
    password: 'Qw12345678!'
  };
  let bookTitle = 'Speaking JavaScript';
  let bookDesc = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'

  it('User is able to Log In', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password)
    cy.get('#login') 
      .click();
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('include', 'https://demoqa.com/profile');
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(bookTitle);
    cy.contains('a',bookTitle)
      .click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .should('contain', bookDesc);
    cy.contains('#addNewRecordButton','Add To Your Collection')
      .click();
      cy.wait(500);
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Book added to your collection.');      
    });
  });
  it('User is able to delete a book from the cart', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password)
    cy.get('#login') 
      .click();
    cy.wait(1000);
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3')
      .click();
    cy.contains('[role="row"]', bookTitle)
      .find('[title = "Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Book deleted.');
    });
    });
});
