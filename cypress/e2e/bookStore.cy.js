/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    username: "meritur2",
    password: "Meritur_#2",
    book: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media",
    title: "Speaking JavaScript",
    description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who ",
    addAlert: "**Book added to your collection**",
    deleteAlert: "**Book deleted.**",
  };
  before(() => {
    cy.visit('https://demoqa.com/login')
  });

    it("should allow to log in", () => {
      cy.getId("userName").type(testData.username);  
      cy.getId("password").type(testData.password);
      cy.getId("login").click();
      cy.getId("userName-value").should("contain", testData.username);
      cy.url().should("include", "/profile");
    });
  
    it("should be able to find the book and add it to the collection", () => {
      cy.login(testData.username, testData.password);
      cy.visit("https://demoqa.com/profile");  
      cy.contains(".btn", "Book Store").click();
      cy.url().should("include", "/books");
      cy.getId("searchBox").type(testData.book, "{enter}");
      cy.contains(".rt-table", testData.title).should("contain", testData.author)
        .and("contain", testData.publisher);
      cy.contains("a", "Speaking JavaScript").click();
      cy.getId("description-wrapper").should("contain", testData.description);
      cy.contains("button", "Add To Your Collection").click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal(testData.addAlert);
      });
    });
  
    it("should be able to delete book from collection", () => {
      cy.login(testData.username, testData.password);
      cy.visit("https://demoqa.com/profile");  
      cy.getId("delete-record-undefined").click();  
      cy.getId("closeSmallModal-ok").click();  
      cy.on("window:alert", (str) => {
        expect(str).to.equal(testData.deleteAlert);
      });
    });
  });
