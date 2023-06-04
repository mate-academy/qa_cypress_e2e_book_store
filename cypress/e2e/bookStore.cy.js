/// <reference types='cypress' />

const username = 'Ace';
const password = '!23Qweasd';

it('Log in', () => {
  cy.login(username, password);

  cy.get('#userName-value')
  .should('contain', username);
});

it('Log in with API', () => {
  cy.loginAPI(username, password);

  cy.getCookie('token').should('exist');
});

it('Add Book', () => {
  cy.loginAPI(username, password);

  cy.visit('');

  cy.get('#fixedban')
    .invoke('remove');

  cy.contains('Book Store App')
    .click();

  cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
    .click();

  cy.get('#searchBox')
    .clear()
    .type('Speaking Javascript');

  cy.get('.action-buttons')
    .click();

  cy.get('#fixedban')
    .invoke('remove');

  cy.get('#description-wrapper > .col-md-9')
    .should('contain', 'JavaScript');

  cy.contains('Add To Your Collection')
    .click({ force: true });

  cy.contains('Profile')
    .click();

  cy.get('.rt-table')
    .contains('speaking javascript', { matchCase: false });

  cy.on('window:alert', (str) => {
    expect(str).to.equal('Book added to your collection.')
  })
});

it('Delete Book', () => {
  cy.loginAPI(username, password);

  cy.visit('/profile');

  cy.contains('Profile')
    .click();

  cy.get('[title = "Delete"]')
    .click();

  cy.get('#closeSmallModal-ok')
    .click();

  cy.on('window:alert', (str) => {
    expect(str).to.equal('Book deleted.')
  })

  cy.get('.rt-noData')
  .should('contain', 'No rows found');
});
