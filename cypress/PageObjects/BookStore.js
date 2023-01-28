class BookStore {
    txtSearchBox = "#searchBox";
    textDescrip = "#title-wrapper > .col-md-9 > #userName-value";
    btnWidget = ":nth-child(4) > .group-header > .header-wrapper";
    btnCollection = ".text-right > #addNewRecordButton";

    navigate() {
        cy.visit('https://demoqa.com/books');
    }

    typeSearchBox(text = 'Speaking JavaScript') {

        cy.get(this.txtSearchBox).type(text);

    }

    clickOnBook (value = 'Speaking JavaScript' ) {

        cy.get('a').contains(value).click()
    }

    verifyBook () {

        cy.get(this.textDescrip).should('contain.text', 'Speaking JavaScript');
    }

    clickOnWidget() {

        cy.get(this.btnWidget).click()
    }

    addToCollection(btnName = 'Add To Your Collection') {
        
        cy.get(this.btnCollection).contains(btnName).click()
    }
}
export default BookStore;