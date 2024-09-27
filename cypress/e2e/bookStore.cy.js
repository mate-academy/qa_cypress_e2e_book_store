/// <reference types='cypress' />

describe('Book Store app', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to successfully log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('contain', '/profile');
    cy.get('#userName-value').should('contain', user.firstName);
    cy.get('#gotoStore').click();
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('#title-wrapper').should('contain', 'Speaking JavaScript');
    cy.get('#author-wrapper').should('contain', 'Axel Rauschmayer');
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere');
    cy.get('.text-right.fullButton').click();
    cy.CheckBookAdded();
    cy.contains('Profile').click();
    cy.get('.action-buttons').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.CheckDeleteAlert();
    cy.contains('rt-td', 'Speaking JavaScript').should('not.exist');
  });
});
