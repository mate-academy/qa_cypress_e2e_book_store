/// <reference types='cypress' />
import Login from "./PageObjects/loginPage";
import LeftPanel from "./PageObjects/leftPanel";
import BookStore from "./PageObjects/bookStorePage";
import Profile from "./PageObjects/profilePage";

describe("Book Store app", () => {
  const ln = new Login();
  const lp = new LeftPanel();
  const bookStore = new BookStore();
  const profile = new Profile();
  before(() => {
    cy.visit("/login");
  });

  afterEach(() => {
    cy.visit("/profile");
    profile.logout();
  });

  it("Login", () => {
    cy.fixture("creds").then((creds) => {
      ln.typeUsername(creds.username);
      ln.typePswd(creds.password);
    });
    ln.submitLogin();
    cy.fixture("creds").then((creds) => {
      ln.verifyLogin(creds.username);
    });
    ln.verifyLoginURL();
  });

  it("Add book", () => {
    cy.login();
    cy.visit("/profile");
    lp.selectCategory("Book Store");
    cy.fixture("book").then((book) => {
      bookStore.search(book.title);
      bookStore.chooseBook(book.title);
      bookStore.assertDescription();
      bookStore.addToCollection();
      lp.selectCategory("Profile");
      profile.assertBookInCollection(book.title);
      profile.deleteAllBooksFromCollection();
      profile.submitDeleteBookModal();
    });
  });

  it("Delete book", () => {
    cy.login();
    cy.addBook();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    lp.selectCategory("Profile");
    profile.deleteBookFromCollection();
    profile.submitDeleteBookModal();
    profile.assertCollectionIsEmpty();
  });
});
