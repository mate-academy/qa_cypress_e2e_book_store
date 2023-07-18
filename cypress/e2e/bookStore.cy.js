/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    UserName: `user1111`,
    Password: `123123aaA!`
  };

  const book = {
    Title: 'Speaking JavaScript',
    Authorlabel: `Axel Rauschmayer`
  };

  before(() => {
    cy.visit(`/login`);
    cy.url().should('include', '/login');
  });

  it('is allow to add and remove books for a user', () => {
    cy.findByPlaceholder('UserName').type(user.UserName);
    cy.findByPlaceholder('Password').type(user.Password + `{enter}`);
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain.text', user.UserName);
    cy.contains(`#item-2`, `Book Store`).click();
    cy.findByPlaceholder(`Type to search`).type(book.Title);
    cy.contains(`a`, book.Title).should(`be.visible`);
    cy.contains(`a`, book.Title).click();
    cy.get('#title-wrapper').should('contain.text', book.Title);
    cy.get('#author-wrapper').should('contain.text', book.Authorlabel);
    cy.get(`#description-wrapper`).should(`be.visible`);
    cy.contains(`#addNewRecordButton`, `Add To Your Collection`).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`, `Book deleted.`);
    });
    cy.contains(`#item-3`, `Profile`).click();
    cy.contains(`a`, book.Title).should(`be.visible`);
    cy.get(`#delete-record-undefined`).click();
    cy.get(`#closeSmallModal-ok`).click();
  });
});
