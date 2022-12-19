/// <reference types='cypress' />

describe('Book Store app', () => {
  describe('User data', () => {
    const user = {
      userName: 'Tester1337',
      password: 'Tester!337'
    };

    it('Login', () => {
      cy.visit('/login');
      cy.get('[placeholder="UserName"]')
        .type(user.userName);
      cy.get('[placeholder="Password"]')
        .type(user.password);
      cy.get('#login')
        .click();
      cy.get('#userName-value')
        .should('contain', `${user.userName}`);
      cy.url()
        .should('include', '/profile');
    });

    it('Add book', () => {
      cy.login();
      cy.visit('/profile');
      cy.contains('.text', 'Book Store')
        .click();
      cy.get('#searchBox')
        .type('Speaking JavaScript');
      cy.get('[href="/books?book=9781449365035"]')
        .click();
      cy.get('#description-wrapper')
        .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.')
      cy.get('[class="text-right fullButton"]')
        .click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
      });
      cy.visit('/profile');
      cy.get('[class="ReactTable -striped -highlight"]')
        .should('contain', 'Speaking JavaScript');
    });

    it('Delete book', () => {
      cy.login();
      cy.visit('/profile');
      cy.get('#delete-record-undefined')
        .click();
      cy.get('#closeSmallModal-ok')
        .click();
    });
  });
});
