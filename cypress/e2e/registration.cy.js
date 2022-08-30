/// <reference types='cypress' />

describe('User is able to', () => {
  const user = {
    username: 'fyqymukog',
    password: 'Pa$$w0rd!'
  };

  beforeEach(() => {
    cy.login();
  });

  it('successfully log in', () => {
    cy.get('#userName-value').should('contain', user.username);
  });

  it('navigate to books list and search for the book', () => {
    cy.get('#gotoStore').click();
    cy.get('#searchBox')
    .click()
    .type('Speaking JavaScript');

    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('.form-label', 'Speaking JavaScript').should('exist');
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
  });

  it('to assert and delete the book', () => {
    cy.get('#item-3.btn.btn-light.active').click();
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.get('#delete-record-undefined').click();

    cy.get('.modal-content').should('exist');
    cy.get('#closeSmallModal-ok').click();
    
    cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book deleted.`)
});
});
});

