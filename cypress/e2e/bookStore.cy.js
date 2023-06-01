/// <reference types='cypress' />

describe("Book Store app", () => {
  const testData = {
    username: "AlexTest",
    password: "Pa$$w0rd!",
    book: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media",
    title: "Speaking JavaScript",
    addAlert: "Book added to your collection",
    deleteAlert: "Book deleted.",
  };

  before(() => {
    cy.visit("/login");
  });

  it("should login", () => {
    cy.findId("userName")
      .type(testData.username);

    cy.findId("password")
      .type(testData.password);

    cy.findId("login")
      .click();

    cy.findId("userName-value")
      .should("contain", testData.username);

    cy.url()
      .should("include", "/profile");
  });

  it("should find the book and add to the collection", () => {
    cy.login(testData.username, testData.password);

    cy.visit("https://demoqa.com/profile");

    cy.contains(".btn", "Book Store")
      .click();

    cy.url()
      .should("include", "/books");

    cy.findId("searchBox")
      .type(testData.book, "{enter}");

    cy.contains(".rt-table", testData.title)
      .should("contain", testData.author)
      .and("contain", testData.publisher);

    cy.contains("a", "Speaking JavaScript")
      .click();

    cy.findId("description-wrapper")
      .should(
        "contain",
        "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who "
      );

    cy.contains("button", "Add To Your Collection")
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(testData.addAlert);
    });
  });

  it("should delete book from collection", () => {
    cy.login(testData.username, testData.password);

    cy.visit("https://demoqa.com/profile");

    cy.findId("delete-record-undefined")
      .click();

    cy.findId("closeSmallModal-ok")
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(testData.deleteAlert);
    });
  });
});
