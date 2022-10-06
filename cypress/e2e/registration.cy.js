/// <reference types='cypress' />

describe('Task', () => {

  beforeEach('1 - 3', () => {
    cy.viewport(1920, 1080);
    cy.login('Alexander', 'Anderson1!')
  })

  before(() => {
    cy.visit('https://demoqa.com/login')
  });

  it('3 - 7', () => {
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
     .click();

    cy.get('[id="searchBox"]')
     .type('Speaking JavaScript{enter}');

    cy.get('[class="rt-tr-group"]')
     .contains('Speaking JavaScript')
     .click();

    cy.get('[id="addNewRecordButton"]')
     .contains('Add To Your Collection')
     .click();
  });

  it('7 - 9', () => {

    cy.get('[id="item-3"]')
     .contains('Profile')
     .click();

    cy.get('[id="delete-record-undefined"]')
     .click();
    
    cy.get('[id="closeSmallModal-ok"]')
     .click();
  });
});