class BookStorePage {
  elements = {
    inputSearchBox: () => cy.get("#searchBox"),
    inputJSbook: () => cy.get("a[href='/books?book=9781449365035']"),
    inputDescrip: () => cy.get("#title-wrapper > .col-md-9 > #userName-value"),
    btnWidget: () => cy.get(":nth-child(4) > .group-header > .header-wrapper"),
    btnCollection: () => cy.get(".text-right > #addNewRecordButton"),
  };

  navigate() {
    cy.visit("/books");
  }

  typeSearchBox(text = "Speaking JavaScript") {
    this.elements.inputSearchBox().type(text);
  }

  clickOnBook(value = "Speaking JavaScript") {
    this.elements.inputJSbook().contains(value).click();
  }

  verifyBook() {
    this.elements.inputDescrip().should("contain.text", "Speaking JavaScript");
  }

  clickOnWidget() {
    this.elements.btnWidget().click();
  }

  addToCollection(btnName = "Add To Your Collection") {
    this.elements.btnCollection().contains(btnName).click();
  }
}
module.exports = new BookStorePage();
