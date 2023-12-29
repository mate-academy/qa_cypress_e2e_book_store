/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'vasylynazvizlo',
    password: '12345#Qw1'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere these day'
  };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to search for the book and add to collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
    cy.contains('span', 'Profile').click();
    cy.get('.mr-2').should('contain', 'Speaking JavaScript');
  });
  it('should allow to delete book from list', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
    cy.get('.rt-tbody').should('not.contain', 'Speaking JavaScript');
  });
});
