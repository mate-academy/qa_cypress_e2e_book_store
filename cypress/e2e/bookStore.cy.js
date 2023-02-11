/// <reference types='cypress' />

const user = {
  username: 'Robert_Polson',
  password: 'Test12345!@'
}

const book = {
  name: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
};

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login')
  });

  it('User should be able to login', () => {
    cy.get('[placeholder="UserName"]')
      .type(user.username)
    cy.get('[placeholder="Password"]')
      .type(user.password)
    cy.contains('#login', 'Login')
      .click();

    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('have.text', user.username);
  });

  it('User should be able to search for a book and add it to the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('[id="item-2"]', 'Book Store')
      .click();
    cy.get('[placeholder="Type to search"]')
      .type(book.name)
    cy.contains('[role="row"]', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.contains('a', book.name)
      .click();
    cy.contains('#description-wrapper', 'Description')
      .should('contain', 'Like it or not, JavaScript is everywhere')
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book added to your collection.')
    });
  });

  it('User should be able to remove a book from the collection', () => {
    cy.loginType(user.username, user.password);
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  })
});
