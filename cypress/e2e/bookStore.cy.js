/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'Test_userName',
    password: 'Test_1234$',
  };

  const book = {
    name: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o',
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow an existing user to log in', () => {
    cy.findByPlaceholder('UserName').type(user.userName)
    cy.findByPlaceholder('Password').type(user.password)
    cy.findById('login').click();

    cy.url().should('include', '/profile');
    cy.findById('userName-value').should('contain.text', user.userName);
  });

  it('should allow to search for a book and add it to the collection', () => {
    cy.login(user);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store')
      .click();

    cy.findById('searchBox').type(book.name)
    cy.contains('a', book.name).click();

    cy.findById('description-wrapper').should('contain.text', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book added to your collection.')
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.visit('/profile');
    cy.contains('a', book.name).should('exist');
  });

  it('should allow to remove a book from the collection', () => {
    cy.login(user);
    cy.visit('/profile');

    cy.findById('delete-record-undefined').click();
    cy.findById('closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });

    cy.get('.rt-noData').should('contain.text', 'No rows found');
  })
});
