/// <reference types='cypress' />

describe('Book Store app', () => {
  describe('User data', () => {
    const user = {
      userName: 'AnnaTest',
      password: 'AnnaTest!123'
    }
    it('login', () => {
      cy.visit('/login')
      cy.get('[placeholder="UserName"]')
        .type(user.userName);
      cy.get('[placeholder="Password"]')
        .type(user.password);
      cy.get('[id="login"]')
        .click()
      cy.get('[id="userName-value"]')
        .should('contain', 'AnnaTest')
      cy.url()
        .should('include', '/profile')
    });
    it('Add book', () => {
      cy.login();
      cy.visit('/profile');
      cy.contains('.text', 'Book Store')
        .click()
      cy.get('[placeholder="Type to search"]')
        .type('Speaking JavaScript')
      cy.get('[id="see-book-Speaking JavaScript"]')
        .click()
      cy.get('#description-wrapper')
        .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.')
      cy.get('.text-right > #addNewRecordButton')
        .click({ force: true });
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Book added to your collection.')
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
