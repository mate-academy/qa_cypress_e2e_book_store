/// <reference types='cypress' />

describe("Book Store app", () => {});
const user = {
  username: "x54",
  password: "Qwert12!!..",
};
const book = {
  title: "Speaking JavaScript",
  description: "Like it or not, JavaScript is everywhere",
};

beforeEach(() => {
  cy.visit("/login");
});

it("should provide the ability to login", () => {
  cy.get("#userName")
  .type(user.username);
  cy.get("#password")
  .type(user.password);
  cy.get("#login")
  .click();
  cy.get("#userName-value")
  .should("contain", user.username);
  cy.url()
  .should("contain", "/profile");
  });
  
it("should provide the ability to add the book", () => {
  cy.login();
  cy.visit("/profile");
  cy.get("#gotoStore")
  .click({ force: true });
  cy.get("#searchBox")
  .type(book.title);
  cy.get(".mr-2")
  .click();
  cy.get(".col-md-9")
  .should("contain", book.description);
  cy.get(".text-right > #addNewRecordButton")
  .click();
  cy.on("window:alert", (str) => {
    expect(str).to
    .equal(`Book added to your collection.`);
  });
  
});
it("should provide the ability to delete the book", () => {
  cy.login();
  cy.visit("/profile");
  cy.get("#gotoStore")
  .click({ force: true });
  cy.get("#searchBox")
  .type(book.title);
  cy.get(".mr-2")
  .click();
  cy.get(".col-md-9")
  .should("contain", book.description);
  cy.get(".text-right > #addNewRecordButton")
  .click();
  cy.visit("/profile");
  cy.get(".mr-2")
  .should("contain", book.title);
  cy.get("#delete-record-undefined")
  .click();
  cy.get("#closeSmallModal-ok")
  .click();
  cy.on("window:alert", (str) => {
    expect(str).to
    .equal(`Book deleted.`);
  });
});
