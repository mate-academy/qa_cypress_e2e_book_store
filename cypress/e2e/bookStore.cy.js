/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'kravtsov@qa.team',
    password: 'Password1!',
  };
  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should successfully login', () => {
    cy.get('[placeholder="UserName"]').type(user.username);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get('#login').click();
    cy.url().should('eq', 'https://demoqa.com/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should successfully add a book to the collection', () => {
    cy.login(user.username, user.password);
    cy.contains('#item-2', 'Book Store').click();
    cy.get('[placeholder="Type to search"]').type(book.title);
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper').should('contain.text', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('should successfully delete a book from the collection', () => {
    cy.login(user.username, user.password);
    cy.contains('#item-3', 'Profile').click();
    cy.get('[role="row"]').should('contain', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
});
