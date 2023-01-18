/// <reference types='cypress' />
const bookStore = require("../support/BookStore_PO");


describe('Book Store app', () => { 
  beforeEach(() => {
    cy.logInNewUser()
    cy.visit(Cypress.config().baseUrl + '/profile') 
  });

  it('LogIn is done successfully', () => { 
    cy.fixture('fixtures').then((data) => {
      bookStore.checkUserNameAfterLogin(data.username);

      bookStore.checkUrl();
    })
  });

  it('Add book', () => { 
    cy.fixture('fixtures').then((data) => {  
      bookStore.clickLeftSideBarWidgets();
      bookStore.clickButtonGoToStore();
      bookStore.searchBook(data.book);
      cy.clickToGetBook(data.book);
      bookStore.clickLeftSideBarWidgets();
      bookStore.addBook();

      bookStore.checkWindowAlert(data.messageBookAdded);
  
      bookStore.clickLeftSideBarWidgets();
      bookStore.clickLeftSideBarBookStore();
      bookStore.clickLeftSideBarBookStoreProfile()

      bookStore.checkAddedBookInProfile(data.book);

      bookStore.clickToDeleteBook();     
      bookStore.closeConfirmationPopUp();

      bookStore.uncaughtException(data.messageBookAdded);
      
    });
  });

  it('Delete book', () => {
    cy.fixture('fixtures').then((data) => {   
   
      bookStore.clickLeftSideBarWidgets(); 
      bookStore.clickButtonGoToStore();
      bookStore.searchBook(data.book);
      cy.clickToGetBook(data.book)  
      bookStore.clickLeftSideBarWidgets();
      bookStore.addBook();

      bookStore.uncaughtException(data.messageBookDeleted);

      bookStore.clickLeftSideBarWidgets()
      bookStore.clickLeftSideBarBookStore();
      bookStore.clickLeftSideBarBookStoreProfile();
      cy.wait(5000);
      bookStore.clickToDeleteBook();
      bookStore.closeConfirmationPopUp();

      bookStore.checkWindowAlert(data.messageBookDeleted);
    });
  });
});

