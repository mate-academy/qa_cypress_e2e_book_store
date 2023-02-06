/// <reference types='cypress' />

const user = {
  userName: 'bohdana333',
  password: '3418419b@B'
};

describe('Book Store app', () => {
  it('login successful', () => {
    cy.visit('/login');

    cy.get('[placeholder="UserName"]').type(user.userName);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value')
      .should('contain', user.userName);
    cy.url()
      .should('include', '/profile');
  });

  it('add book successful', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('.text', 'Book Store').click();

    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.')
    cy.get('[class="text-right fullButton"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.visit('/profile');
    cy.get('[class="ReactTable -striped -highlight"]')
      .should('contain', 'Speaking JavaScript');
  });

  it('delete book successful', () => {
    cy.login();
    cy.visit('/profile');
    cy.addBook();

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});