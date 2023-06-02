/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    
  });

it('Log in with valid credentials', () => {
    cy.login('koko', 'Koko123*')
    cy.visit('https://demoqa.com/login')
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('.mr-2', 'Speaking JavaScript').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(testData.alert.bookAdded);
      });
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    cy.visit('https://demoqa.com/profile');
    cy.contains('.ReactTable', 'Speaking JavaScript')
        
    });

it('user should be able to delete book from shopping list', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.contains('#item-3', 'Profile').click();
    cy.contains('[role="row"]', testData.book.title)
        .find('[title="Delete"]')
        .click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(testData.alert.bookDeleted);
      });
    });
  });
});
