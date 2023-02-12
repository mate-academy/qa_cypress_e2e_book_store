/// <reference types='cypress' />

const user = {
  userName: 'zorka',
  password: 'Test1234!',
};

const book = {
  title: 'Speaking JavaScript',
  description: 'Like it or not, JavaScript is everywhere these days',
};

describe('Book Store app', () => {

  it('add book to the basket', () => {
    //login with API
    cy.login(user.userName, user.password);
    cy.visit('/profile');

    //assert username
    cy.get('#userName-value')
      .should('have.text', user.userName);
    //assert new url
    cy.url()
      .should('contain', '/profile');

    cy.get('button#gotoStore')
      .click();

    cy.findByPlaceholder('Type to search')
      .type(book.title);

    cy.contains(`[id="see-book-${book.title}"] > a`, `${book.title}`)
      .click();

    //assert description of the book
    cy.contains('#description-wrapper', 'Description')
      .should('contain', book.description);

    cy.contains('.btn', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });
});
