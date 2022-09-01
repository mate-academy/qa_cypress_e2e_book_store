/// <reference types='cypress' />
//Test data: 
//First Name: Serhiy//Last Name: Breslav
//Username: SuperUser//Password: SuperPassword100!
//it('', () => {});

describe('Smoke Testing', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)

    cy.logIn();
  });

  it('Check your username after login ', () => {
    cy.get('#userName-value')
      .should('contain.text', 'SuperUser')
  });

  it('Add book to store', () => {
    cy.get('#gotoStore').click()

    cy.get('#searchBox').type('Speaking JavaScript')

    cy.get('[href="/books?book=9781449365035"]').click()

    cy.scrollTo('bottom')

    cy.get('.text-right > #addNewRecordButton').click()

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3')
      .click()

    cy.get('a[href="/profile?book=9781449365035"]')
      .should('contain.text', 'Speaking JavaScript')

    cy.get('#delete-record-undefined > svg').click()

    cy.get('#closeSmallModal-ok').click()
  });

  it('Delete book from store', () => {
    cy.get('#gotoStore').click()

    cy.get('#searchBox').type('Speaking JavaScript')

    cy.get('[href="/books?book=9781449365035"]').click()

    cy.scrollTo('bottom')

    cy.get('.text-right > #addNewRecordButton').click()

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3')
      .click()

      cy.get('#delete-record-undefined > svg').click()

      cy.get('#closeSmallModal-ok').click()
  });

});