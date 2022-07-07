/// <reference types='cypress' />

describe('User should have an ability to', () => {
  const user = {
    username: 'zxctester',
    password: '12345Qwert!'
  };

  const book = {
    title: 'Speaking JavaScript'
  }

  const { username, password } = user;
  const { title } = book;

  beforeEach(() => {
    cy.visit('/login');
    cy.login();
  });

  it('log in to existing account', () => {
    cy.get('#userName-value')
      .should('contain', username);
  });

  it('add a book to the collection', () => {
    cy.contains('#item-2', 'Book Store')
      .click();

    cy.get('#searchBox')
      .type(title);

    cy.contains('a', title)
      .click();

    cy.get('#description-wrapper')
      .should('contain', 'Description');

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  })

  it('delete a book from the collection', () => {
    cy.contains('#item-3', 'Profile')
      .click();

    cy.contains('.rt-tr.-odd', title)
      .find('[title="Delete"]')
      .click();

    cy.contains('#closeSmallModal-ok', 'OK')
      .click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book deleted.`)
    });
  })
});
