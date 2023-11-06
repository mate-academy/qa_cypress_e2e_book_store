/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'rovypogeq',
    password: '23879JGUjhgjh#%$'
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
  });

  it('should provide the ability to log in', () => {
    cy.login(user.username, user.password);

    cy.contains('rovypogeq')
      .should('be.visible');
  });

  it('should allow adding the book to the collection', () => {
    cy.login(user.username, user.password);

    cy.get('button[id="gotoStore"]')
      .click();
    cy.get('input[id="searchBox"]')
      .type('Speaking JavaScript');
    cy.get('a[href="/books?book=9781449365035"]')
      .click();
    cy.contains('Speaking JavaScript')
      .should('be.visible');
    cy.contains('Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should allow deleting book from collection', () => {
    cy.login(user.username, user.password);

    cy.contains('Speaking JavaScript')
      .should('be.visible');
    cy.get('span[id="delete-record-undefined"]')
      .click();
    cy.get('button[id="closeSmallModal-ok"]')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
