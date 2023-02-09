class ProfilePage {
  elements = {
    inputJsBook: () => cy.get('[id="see-book-Speaking JavaScript"]'),
    deleteIcon: () => cy.get('[id="delete-record-undefined"]'),
    okButn: () => cy.get("#closeSmallModal-ok"),
  };

  navigate() {
    cy.visit("https://demoqa.com/profile");
  }
  verifyJavaBook() {
    this.elements.inputJsBook().should("contain", "Speaking JavaScript");
  }

  deleteBook() {
    this.elements.deleteIcon().click();
  }

  verifyDelete() {
    this.elements.okButn().click();
  }
}
module.exports = new ProfilePage();
