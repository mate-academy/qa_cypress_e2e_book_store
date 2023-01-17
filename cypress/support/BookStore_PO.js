
class bookStore {
    searchField = '#searchBox';
    buttonGoToStore = '#gotoStore';
    fieldOfBook = '.mr-2';
    sideBarWidgets =':nth-child(4) > .group-header > .header-wrapper';
    sideBarBookStore =':nth-child(6) > .group-header > .header-wrapper > .header-text';
    sideBarBookStoreProfile = ':nth-child(6) > .element-list > .menu-list > #item-3';
    addBookButton = '.text-right > #addNewRecordButton';
    deleteBook = '#delete-record-undefined';
    popUpDeleteBookOk = '#closeSmallModal-ok';
    userNameFieldAfterLogin = '#userName-value';

  checkUserNameAfterLogin(username){
      cy.get(this.userNameFieldAfterLogin).should('contain.text', username); 
  };
  
  checkUrl(){
    cy.url().should('equal', Cypress.config().baseUrl + '/profile');  
  };

  checkAddedBookInProfile(book){
    cy.get(this.fieldOfBook).should('have.id', `see-book-${book}`);
  };
  
  checkWindowAlert(message){
    cy.on('window:alert', (str) => {expect(str).to.equal(message)
    });
  };

  clickToDeleteBook() {
    cy.get(this.deleteBook).click()
  };

  closeConfirmationPopUp() {
    cy.get(this.popUpDeleteBookOk).click()
  };
  
  clickButtonGoToStore() {
    cy.get(this.buttonGoToStore).scrollIntoView().click()
  };

  searchBook(book) {    
    cy.get(this.searchField).type(book).wait(500);
  };
  
  getBook() {
    cy.get(this.fieldOfBook).click()
  };

  clickLeftSideBarWidgets() {
    cy.get(this.sideBarWidgets).click()
  };

  clickLeftSideBarBookStore() {
    cy.get(this.sideBarBookStore).click()
  };

  clickLeftSideBarBookStoreProfile() {
    cy.get(this.sideBarBookStoreProfile).click()
  };

  addBook() {
    cy.get(this.addBookButton).scrollIntoView().click()
  };

}

module.exports = new bookStore();