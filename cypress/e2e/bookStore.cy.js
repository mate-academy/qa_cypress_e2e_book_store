/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'rovypogeq',
    password: '23879JGUjhgjh#%$'
  };

  const book = {
    bookname: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is ' +
    'everywhere these days-from browser ' +
    'to server to mobile-and now you, too, ' +
    'need to learn the language or dive deeper than you have. ' +
    'This concise book guides you into and through JavaScript, ' +
    'written by a veteran programmer who o'
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
  });

  it('should provide the ability to log in', () => {
    cy.login(user.username, user.password);

    cy.contains(user.username)
      .should('be.visible');
  });

  it('should allow adding the book to the collection', () => {
    cy.login(user.username, user.password);

    cy.get('button[id="gotoStore"]')
      .click();
    cy.get('input[id="searchBox"]')
      .type(book.bookname);
    cy.get('span[id="see-book-Speaking JavaScript"]')
      .click();
    cy.contains(book.bookname)
      .should('be.visible');
    cy.contains(book.author)
      .should('be.visible');
    cy.contains(book.description)
      .should('be.visible');
    cy.contains('Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.contains('Profile')
      .click();
    cy.contains(book.bookname)
      .should('be.visible');
  });

  it('should allow deleting book from collection', () => {
    cy.login(user.username, user.password);

    cy.contains(book.bookname)
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
