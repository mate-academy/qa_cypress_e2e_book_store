/// <reference types='cypress' />
  const username = 'qa_test22';
  const password = '123Qwert!';

describe('cypress forth HW', () => {


  beforeEach(() => {
    cy.login(username, password);
  });
  

  it('should  contain username after login username ', () => {

    cy.contains('#userName-value', username).should('be.visible');

  });

  it('go to book store and search for the book', ()  => {

    cy.get('#gotoStore').click();

    cy.get('#searchBox')
        .click()
        .type('Speaking JavaScript');
    
    cy.contains('a', 'Speaking JavaScript').click();

    cy.contains('button', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.contains('span', 'Profile').click();

    cy.contains('span', 'Speaking JavaScript').should('exist');

  });

  it('go to profile and delete the book', ()  => {

    cy.contains('span', 'Profile').click();

    cy.get('#delete-record-undefined').click();

    cy.get('[id="closeSmallModal-ok"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });

    cy.contains('span', 'Speaking JavaScript').should('not.exist');

  });
});
