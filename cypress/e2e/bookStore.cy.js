/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {username:'ladybug',
                password: 'Ladybug!123'
}
  
  before(() => {
    cy.visit('/login')
    
  });

  it('should provide user to log in, add book, delete book', () => {
    cy.get('#userName').type(user.username);

    cy.get('#password').type(user.password);

    cy.get('#login').click();

    cy.get('#userName-value')
      .should('contain', `${user.username}`);

    cy.url().should('include', 'profile');

    cy.get('#gotoStore').click();

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.get('[href="/books?book=9781449365035"]')
      .click();

    cy.get('#description-wrapper').should('exist');

    cy.contains('.btn','Add To Your Collection')
      .click({force: true});

    cy.once('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
      });     

    cy.contains('Profile').click();

    cy.get('.rt-tbody')
      .should('contain', 'Speaking JavaScript');

    cy.get('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();
    
  });
});
