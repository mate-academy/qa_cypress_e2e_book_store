/// <reference types='cypress' />

describe("Book Store app", () => {
  const user = {
    username: "KillerSvinosobak",
    password: "Ratatatata1!1",
  };
  const book = {
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media",
    description: "Like it or not, JavaScript is everywhere ",
  };

  beforeEach(() => {
    cy.visit("/login");
  });

  it("should provide an ability to login", () => {
    cy.findByPlaceholder("UserName").type(user.username);
    cy.findByPlaceholder("Password").type(user.password);
    cy.get("#login").click();
    cy.get("#userName-value").should("contain", user.username);
    cy.url().should("include", "/profile");
  });

  it("should provide an ability to search for the book and add to cart", () => {
    cy.login(user.username, user.password);
    cy.contains("#item-2", "Book Store").click();
    cy.findByPlaceholder("Type to search").type("Speaking JavaScript");
    cy.get('[role="row"]')
      .should("contain", book.title)
      .should("contain", book.author)
      .should("contain", book.publisher);
    cy.contains("a", book.title).click();
    cy.contains("#addNewRecordButton", "Add To Your Collection").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(testData.alert.bookAdded);
    });
  });

  it("should provide an ability to delete book from cart", () => {
    cy.login(user.username, user.password);
    cy.contains("#item-3", "Profile").click();
    cy.contains('[role="row"]', book.title).find('[title="Delete"]').click();
    cy.get("#closeSmallModal-ok").click();
  });
});
