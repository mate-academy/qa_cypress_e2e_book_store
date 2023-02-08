/// <reference types='cypress' />

const firstName = 'John';
const lastName = 'QA';
const username = 'John_QA';
const password = 'JohnQA!23';
const profileUrl = '/profile';
const searchQuery = 'Speaking JavaScript';
const bookDescr = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o';



describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should allow adding to and deleting book from the shopping list', () => {

    cy.findByPlaceholder('UserName')
      .type(`${username}`);

    cy.findByPlaceholder('Password')
      .type(`${password}`);

    cy.get('#login')
      .click();

    cy.get('#userName-value')
      .should('contain', `${username}`);

    cy.url()
    .should('include', `${profileUrl}`);

    cy.contains('.group-header', 'Book Store Application')
      .click();

    cy.contains('#item-2', 'Book Store')
      .click();

    cy.findByPlaceholder('Type to search')
      .type(`${searchQuery}`);

    cy.contains(`${searchQuery}`)
      .click();

    cy.get('#description-wrapper') 
      .should('contain', `${bookDescr}`)

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })

    cy.contains('#item-3', 'Profile')
      .click();

    cy.get('#delete-record-undefined') 
      .click();    

    cy.get('#closeSmallModal-ok') 
      .click();     
    

  });
});
