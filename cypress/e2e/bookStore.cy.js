/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'dmytrohorodchuk',
    password: 'qwertyuiO12345@'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    // eslint-disable-next-line max-len
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
  };

  it('Should provide ability to log in, asserting URL and username.', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('Navigates to books, adding book, asserting popup.', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .contains(book.description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`);
    });
    cy.contains('#item-3', 'Profile').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .contains(book.title);
  });

  it('Delete book', () => {
    cy.login();
    cy.visit('/books');
    cy.contains('#item-3', 'Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
