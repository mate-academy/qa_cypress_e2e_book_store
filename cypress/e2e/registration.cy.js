/// <reference types='cypress' />

describe('jun-22', () => {
  const user = {
    username: 'KhrystynaBorys',
    password: 'Khrystynaborys2304!',
  };

  beforeEach(() => {
    cy.login();
    
  });

  it('successfully login', () => {

    cy.get('#userName-value')
    .should('contain', user.username);

  });

    it('add a book', () => {

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

    cy.get('[class="navbar-toggler-icon"]')
    .click();

    cy.contains('span', 'Profile')
    .click();

    cy.contains('[class="rt-tr-group"]', 'Speaking JavaScript')
    .should('exist');

    cy.contains('[class="rt-tr-group"]', 'Axel Rauschmayer')
    .should('exist');

    cy.contains('[class="rt-tr-group"]', 'Reilly Media')
    .should('exist');
    
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

    cy.contains('[class="rt-table"]', 'Speaking JavaScript')
    .should('not.exist');
    
  });
});
