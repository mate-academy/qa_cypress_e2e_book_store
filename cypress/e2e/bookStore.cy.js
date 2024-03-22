/// <reference types='cypress' />

const { userInfo, bookData } = require("../support/userData");

describe("Book Store app", () => {
  const { username, password } = userInfo();
  const { title, author, publisher } = bookData();

  beforeEach(() => {
    cy.visit("/register");
  });

  it("should provide the ability to logged in", () => {
    cy.loginByUI(username, password);
  });

  it("should provide the ability to add a book", () => {
    cy.loginByApi(username, password);
    cy.visit("/books");
    cy.get("#searchBox").type(title);
    //cy.get('.rt-td').eq(1).should('contain', book.title)
    cy.assertBook(1, title);
    //cy.get('.rt-td').eq(2).should('contain', book.author)
    cy.assertBook(2, author);
    //cy.get('.rt-td').eq(3).should('contain', book.publisher)
    cy.assertBook(3, publisher);
  });
});
