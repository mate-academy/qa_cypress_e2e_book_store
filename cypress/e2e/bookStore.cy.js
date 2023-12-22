/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'KathyMSmith',
    password: 'Ks2010!!?'
  };
  const book = {
    isbn: '9781449365035',
    title: 'Speaking JavaScript'
  };
  before(() => {

  });

  it('should login user with valid credentials', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.username).should('be.visible');
    cy.url().should('contains', '/profile');
    cy.get('#userName-value').should('contain', user.username);
    cy.get('.menu-list').contains('Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('.btn.btn-primary').contains('Add To Your Collection').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal(`Book added to your collection.`);
    });
    cy.get('span.text').contains('Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
