/// <reference types='cypress' />

const cypressConfig = require("../../cypress.config");
const { auth } = require("../support");

describe("User should be able to", () => {
  const user = {
    username: "erondondon",
    password: "Asdf%12345",
  };

  beforeEach(() => {
    auth(cy, user);
  });

  it("login successfully", () => {
    cy.get('[id="userName-value"]').should("contain", user.username);
  });

  it("to find a book in the Book Store", () => {
    cy.contains('[id = "item-2"]', "Book Store").click();
    cy.get('[id="searchBox"]').type("Speaking JavaScript");
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.contains('[id="addNewRecordButton"]', "Add To Your Collection").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it("to delete a certain book from his collection", () => {
    cy.contains('[class="rt-tr -odd"]', "Speaking JavaScript")
      .should("contain", "Axel Rauschmayer")
      .and("contain", `O'Reilly Media`);

    cy.get('[id="delete-record-undefined"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();
  });
});
