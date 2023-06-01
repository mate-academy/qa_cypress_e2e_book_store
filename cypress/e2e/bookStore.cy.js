/// <reference types='cypress' />

const bookName = 'Speaking JavaScript';

describe('Book Store app', () => {
  before(() => {
    
  });

  it('should login user with existing credentials', () => {

    const userName = 'Test_User';
    const password = 'qwe123QWE!';

    cy.visit('https://demoqa.com/login')

    cy.get('#userName').type(userName);
    cy.get('#password').type(password);
    cy.contains('button', 'Login').click();
    cy.get('#userName-value').should('contain', userName);

    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should add a book to cart', () => {
    cy.login();

    cy.visit('https://demoqa.com/profile');

    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(bookName);
    cy.contains('a', bookName).click();
    cy.get('#title-wrapper').should('contain', bookName);
    cy.contains('button', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('should delete a book from the cart', () => {
    cy.login();

    cy.visit('https://demoqa.com/profile');

    cy.contains('.ReactTable', bookName).should('exist');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
