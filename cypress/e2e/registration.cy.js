/// <reference types='cypress' />
const { generateUser } = require('../support/generate');

describe('Demoqa tests', () => {
  const user = generateUser();

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('Cart workflow', () => {
    cy.get('input[id="userName"]')
      .type(user.username);

    cy.get('input[id="password"]')
      .type(user.password);

    cy.get('button[id="login"]')
      .click();

    cy.url().should('include', '/profile');

    cy.get('label[class="form-label"]')
      .should('contain.text', user.username);

    cy.contains('#item-2', 'Book Store')
      .click();

    cy.url().should('include', '/books');

    cy.get('input[id="searchBox"]')
      .type('Speaking JavaScript{enter}');

    cy.get('a[href="/books?book=9781449365035"]')
      .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click({force: true});

    cy.contains('#item-3', 'Profile')
    .click();

    cy.contains('a', 'Speaking JavaScript')
      .should('contain.text', 'Speaking JavaScript');

    cy.get('div[class="rt-td"]')
      .should('contain.text', 'Axel Rauschmayer')
      .and('contain.text', 'O\'Reilly Media');

    cy.get('#delete-record-undefined > svg > path')
      .click({force: true});

    cy.get('button[id="closeSmallModal-ok"]')
      .click();
  });
});