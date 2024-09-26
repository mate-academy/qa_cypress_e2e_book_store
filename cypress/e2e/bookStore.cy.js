/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'romda.com',
    password: '123Qwert!'
  };

  const book = {
    descreption: 'Like it or not, JavaScript is everywhere'
  };
  before(() => {
    cy.visit('/');
  });

  it('user should be able to login and search book and delete it', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('a[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper').should('contain', book.descreption);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('.ReactTable').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.reload();
    cy.get('.ReactTable').should('not.contain', 'Speaking JavaScript');
  });
});
