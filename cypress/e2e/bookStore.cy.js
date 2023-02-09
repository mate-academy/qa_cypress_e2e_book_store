/// <reference types='cypress' />
import LoginPage from "../PageObjects/LoginPage";
import BookStorePage from "../PageObjects/BookStorePage";
import ProfilePage from "../PageObjects/ProfilePage";

const username = "test_anna_s";
const password = "Test123@";

describe("Book Store app", () => {
  before(() => {
    cy.viewport(1024, 768);
    cy.visit("/");
  });

  it.only("should allow an existing user to login", () => {
    LoginPage.navigate();
    LoginPage.typeUsername(username);
    LoginPage.typePassword(password);
    LoginPage.clickSubmit();
  });

  it("should allow an existing user to add a book", () => {
    LoginPage.navigate();
    LoginPage.typeUsername(username);
    LoginPage.typePassword(password);
    LoginPage.clickSubmit();
    cy.wait(4000);
    BookStorePage.navigate();
    BookStorePage.typeSearchBox();
    BookStorePage.clickOnBook();
    BookStorePage.verifyBook();
    BookStorePage.clickOnWidget();
    cy.wait(4000);
    BookStorePage.addToCollection();
    cy.wait(4000);
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book added to your collection`);
    });
  });

  it("should allow an existing user to delete a book", () => {
    LoginPage.navigate();
    LoginPage.typeUsername(username);
    LoginPage.typePassword(password);
    LoginPage.clickSubmit();
    cy.wait(4000);
    BookStorePage.navigate();
    BookStorePage.typeSearchBox();
    BookStorePage.clickOnBook();
    BookStorePage.verifyBook();
    BookStorePage.clickOnWidget();
    cy.wait(4000);
    BookStorePage.addToCollection();
    cy.wait(4000);
    ProfilePage.navigate();
    ProfilePage.verifyJavaBook();
    ProfilePage.deleteBook();
    cy.wait(4000);
    ProfilePage.verifyDelete();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
