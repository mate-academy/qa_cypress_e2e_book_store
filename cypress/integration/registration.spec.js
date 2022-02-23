/// <reference types='cypress' />

describe('User should have an ability', () => {
  const user = {
    username:'Maryna_test',
    password:'123456Mk*'
  };
  const book = {
    name:'Speaking JavaScript',
    author:'Axel Rauschmayer'
  };
  before(() => {
    cy.login();
  });

  it('successefully login', () => {
    cy.visit('/profile');
       cy.get('#userName-value')
     .should('contain', user.username);
  });
  it('successfully search and add a book', () => {
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store')
    .click();
    cy.url().should('include','/books');
    cy.get('#searchBox')
    .type('Speaking JavaScript');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
    .should('contain',book.author)
    cy.contains('a','Speaking JavaScript')
    .click();
    cy.get('.text-right > #addNewRecordButton')
    .click();
    cy.on('window:alert', alert => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });
    it('successfully delete a book', () => {
      cy.visit('/profile');
      cy.contains('a','Speaking JavaScript')
      .should('exist');
      cy.get('#delete-record-undefined > svg')
      .click();
      cy.get('#closeSmallModal-ok')
      .click();
      cy.on('window:alert', alert => {
        expect(alert).to.equal('Book deleted.');
      });
    });
});
