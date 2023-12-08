/// <reference types='cypress' />

describe("Book Store app", () => {
  const user = {
    username: 'j.bravo',
    password: 'Haslo123%'
  };
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to log in", () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should("include", "/profile");
    cy.get("#userName-value").should("contain", "j.bravo");
  });

  it("should be able to add the book", () => {
    cy.login();
    cy.visit('/profile');
    cy.get(".btn").contains("Go To Book Store").click();
    cy.url().should("contain", "books");
    cy.get("#searchBox").type("Speaking JavaScript");
    cy.get(".action-buttons a").contains("Speaking JavaScript").click();
    cy.get("#title-wrapper").should("contain", "Speaking JavaScript");
    cy.get("#author-wrapper").should("contain", "Axel Rauschmayer");
    cy.get("#description-wrapper").should(
      "contain",
      "Like it or not, JavaScript is everywhere"
    );
    cy.get(".btn").contains("Add To Your Collection").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get(".btn").contains("Profile").click();
    cy.get(".rt-td").contains("Speaking JavaScript");
  });

  it("should be able to delete the book", () => {
    cy.login();
    cy.visit('/profile');
    cy.url().should("include", "/profile");
    cy.get("#userName-value").should("contain", "j.bravo");
    cy.get(".rt-td").contains("Speaking JavaScript");
    cy.get("#delete-record-undefined").click();
    cy.get("#closeSmallModal-ok").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
