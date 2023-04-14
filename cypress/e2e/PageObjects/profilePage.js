class Profile {
  constructor() {
    this.deleteBookBtn = "#delete-record-undefined";
    this.deleteAllBooksBtn = "#submit";
    this.deleteAllBooksBtnText = "Delete All Books";
    this.submitDeleteBookBtn = "#closeSmallModal-ok";
    this.tableRow =
      ".rt-tbody .rt-tr-group:first-child .rt-td:nth-child(2):not(.action-buttons)";
    this.logoutBtn = "#submit";
  }

  assertBookInCollection(book) {
    cy.contains("a", book).should("be.visible");
  }

  deleteBookFromCollection() {
    cy.get(this.deleteBookBtn).click();
  }

  deleteAllBooksFromCollection() {
    cy.contains(this.deleteAllBooksBtn, this.deleteAllBooksBtnText).click();
  }

  submitDeleteBookModal() {
    cy.get(this.submitDeleteBookBtn).click();
  }

  assertCollectionIsEmpty() {
    cy.get(this.tableRow).should("exist");
  }

  logout() {
    cy.get(this.logoutBtn).click();
  }
}

export default Profile;
