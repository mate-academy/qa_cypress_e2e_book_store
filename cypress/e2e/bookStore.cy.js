/// <reference types='cypress' />

describe("Book Store app", () => {
  //create a simple test

  before(() => {
    cy.visit("https://demoqa.com/books");
    //comment for updating PR
  });

  it("basic test with minor changes for approval flow", () => {
    
    cy.get("#searchBox").type("Git Pocket Guide{enter}");
    cy.get("#see-book-Git Pocket Guide").click();
    cy.get("#addNewRecordButton").click();
    cy.get("#userName").type("John Doe");
    cy.get("#userEmail").type("some email");
  });
});
