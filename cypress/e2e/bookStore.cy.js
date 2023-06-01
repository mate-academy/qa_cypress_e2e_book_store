/// <reference types='cypress' />

describe('Book Store app', () => {
    const bookName = 'Speaking JavaScript';
    const userName = 'OlehHoryk';
    const password = 'OlehHoryk@8';
    const dataText = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.';
  
    it('should login user with existing creds', () => {
    cy.visit('https://demoqa.com/login');
  
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
    cy.visit('https://demoqa.com/profile');
  
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(bookName);
    cy.contains('a', bookName)
      .click();
  
    cy.contains('.form-label', dataText)
      .should('exist');
  
    cy.contains('button', 'Add To Your Collection')
      .click();
  
    cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`);
    });
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
  
  