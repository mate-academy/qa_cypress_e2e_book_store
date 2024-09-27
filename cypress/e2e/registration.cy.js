/// <reference types='cypress' />

describe('Name of the group', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/login')
    cy.login();
  });

  const userData = {
    username: 'alijul',
    password: 'Qwerty123$%'
  };

  const book = {
    title:'Speaking JavaScript',
    author:'Axel Rauschmayer',
    publisher:'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser',
  };

  it('Successful Login', () => {
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', userData.username);
  });

  it('Add a book', () => {
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('[class="action-buttons"]').click();
    cy.get('[id="description-wrapper"]')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click({force: true});
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
  });

  it('Delete a book', () => {
  cy.contains('#item-3', 'Profile').click({force: true});
  cy.contains('[role="row"]', book.title).find('#delete-record-undefined').click();
  cy.get('#closeSmallModal-ok').click();
  cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
  });
  });
});