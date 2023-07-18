/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: "Adamio12",
    password: "Keklol1!"
  }

  const book = {
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o',
    title: 'Speaking JavaScript'
  }

  before(() => {
    cy.visit('/login');
  });



  it('should add a book to user collection', () => {
    cy.findByPlaceholder("UserName").type(user.username);
    cy.findByPlaceholder("Password").type(user.password);
    cy.get('#login').click();

    // cy.contains('li', 'Book Store').click();
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.contains('label', book.description).should('have.text', book.description);
    cy.get('[class="text-right fullButton"]').click();

    cy.on('window:alert', (str) => {
      if (str === 'Book added to your collection.') {
        expect(str).to.equal(`Book added to your collection.`);
      } else {
        expect(str).to.equal(`Book already present in the your collection!`)
      };
    });

    cy.contains('li', 'Profile').click();

    cy.get('[href="/profile?book=9781449365035"]').should('have.text', 'Speaking JavaScript');
    cy.contains('div', 'Axel Rauschmayer').should('have.text', 'Axel Rauschmayer');

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.visit('/profile');

  });
});
