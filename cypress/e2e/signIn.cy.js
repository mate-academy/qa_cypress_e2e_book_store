/// <reference types='cypress' />

describe('Login page', () => {
  const username = 'AlexZxS';
  const password = '1pandoraABC!';

  it('Login as your registered account', () => {
    cy.Login(username, password);
    cy.visit('https://demoqa.com/profile')
  });
});

describe('Account. User should be able to', () => {
    
    const username = 'AlexZxS';
    const password = '1pandoraABC!';
    
    beforeEach(() => {
      cy.Login(username, password);
      cy.viewport(1024, 1400);
    });

    it('Check your username after login', () => {
      cy.get('#userName-value').should('contain', username)
    });

    it('Navigate to books list', () => {
      cy.contains('.menu-list #item-2', 'Book Store').click();
      cy.get('#searchBox').type('Speaking JavaScript' + '{enter}');
      cy.get('.rt-tr.-odd').should('contain', 'Speaking JavaScript')
    });

    it(`Add book to the cart`, () => {
      cy.wait(2000);
      cy.contains('a', 'Speaking JavaScript').click();
      cy.contains('#addNewRecordButton', 'Add To Your Collection').click()
      cy.wait(2000);
      cy.on('window:alert', alert => {
        expect(alert).to.equal('Book added to your collection.')
      })
    });

    it('Open your profile page', () => {
      cy.contains('.menu-list #item-3', 'Profile').click();
      cy.get('.main-header').should('contain', 'Profile')
    });

    it(`Assert 'Speaking JavaScript' in your shopping list and Delete Speaking JavaScript book from your list`, () => {
      cy.get('.rt-tr.-odd')
        .should('contain', 'Speaking JavaScript')
        .and('contain', 'Axel Rauschmayer')
        .and('contain', `O'Reilly Media`)
        .find('[title="Delete"]')
        .click({force: true})
      cy.get('#closeSmallModal-ok').click()  
      cy.get('.rt-noData').should('contain', 'No rows found')
    });

  });