/// <reference types='cypress' />
import Login from "../PageObjects/Login";
import BookStore from "../PageObjects/BookStore";
import Profile from "../PageObjects/Profile";
describe('Book Store app', () => {

  it('should allow an existing user to login, add a book and delete a book', () => {
    
    cy.viewport(1024, 768);
    cy.visit('/login');
  
    const username = "test_anna_s";
    const password = "Test123@";
     

    const loginPage = new Login();
    loginPage.setUserName(username);
    loginPage.setPassword(password);
    loginPage.clickSubmit() 
    cy.wait(4000);
    cy.url().should('include', '/profile');
  
    

    const bookStore = new BookStore();
    bookStore.navigate();
    bookStore.typeSearchBox();
    bookStore.clickOnBook();
    bookStore.verifyBook();
    bookStore.clickOnWidget();
    cy.wait(4000);
    bookStore.addToCollection();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection`)
  })
  
  cy.go('back')
  cy.wait(4000)

   const profile = new Profile();
   profile.navigate();
   profile.verifyJavaBook();
   profile.deleteBook();
   cy.wait(4000);
   profile.verifyDelete()

  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book deleted.`)
    });
  });
});
