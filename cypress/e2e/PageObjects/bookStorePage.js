class BookStore {
  constructor() {
    this.searchBox = "#searchBox";
    this.searchIcon = "#basic-addon2";
    this.addToCollectionBtn = "#addNewRecordButton";
    this.addToCollectionBtnText = "Add To Your Collection";
  }

  search(searchItem) {
    cy.get(this.searchBox).type(searchItem);
    cy.get(this.searchIcon).click();
  }

  chooseBook(book) {
    cy.contains("a", book).click();
  }

  assertDescription() {
    cy.fixture("book").then((book) => {
      cy.get("#description-wrapper")
        .find("#userName-value")
        .should("have.text", book.description);
    });
  }

  addToCollection() {
    cy.contains(this.addToCollectionBtn, this.addToCollectionBtnText).click();
  }
}

export default BookStore;
