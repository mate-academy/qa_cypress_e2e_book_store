/// <reference types='cypress' />

/// <reference types='cypress' />

describe('User should have an abillity to', () => {
  beforeEach(() => {
cy.visit('https://demoqa.com/login');
cy.login();
// cy.get('#userName')
// .type('Superwoman');
// cy.get('[placeholder="Password"]')
// .type('Password123@{enter}');
// cy.url()
// .should('include', '/profile')
  });

  it('successfully login', () => {
    cy.viewport(1200,720)

  });

  it('go to book store and search for the book', () => {
    cy.viewport(1200,720)
    cy.contains('#item-2', 'Book Store')
    .click()
    cy.get('#searchBox')
    .type('Speaking JavaScript')
    cy.contains('a', 'Speaking JavaScript')
    .click()
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click()
    cy.on('window:alert', alert => {
      expect(alert).to.equal(`Book already present in the your collection!`)
    });
  });

it('delete selected book from account', () => {
    cy.contains('#item-3', 'Profile')
    .click()

    cy.contains('.rt-tr.-odd', 'Speaking JavaScript')
    .find('[title="Delete"]')
    .click()
  });

});
