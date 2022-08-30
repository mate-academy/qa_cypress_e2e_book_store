/// <reference types='cypress' />

describe('jun-22', () => {
  const user = {
    username: 'KhrystynaBorys',
    password: 'Khrystynaborys2304!',
  };

  beforeEach(() => {
    cy.login();
    
  });

  it('successfully login and add a book', () => {

    cy.get('#userName-value')
    .should('contain', user.username);

    cy.get('[id="gotoStore"]')
    .click();

    cy.get('[id="searchBox"]')
    .type('Speaking JavaScript');

    cy.get('[id="see-book-Speaking JavaScript"]')
    .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click();

    cy.on('window:alert', (str) => {
     expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('delete the book', ()  => {

    cy.get('[class="navbar-toggler-icon"]')
    .click();

    cy.contains('span', 'Profile')
    .click();

    cy.get('[id="delete-record-undefined"]')
    .click();
    
    cy.get('[id="closeSmallModal-ok"]')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });
  });
});
