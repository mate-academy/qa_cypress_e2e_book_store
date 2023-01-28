class Profile {
    idJavaScript = '[id="see-book-Speaking JavaScript"]';
    dltBook ='[id="delete-record-undefined"]';
    okButn = '#closeSmallModal-ok';
    navigate() {

        cy.visit('https://demoqa.com/profile')
    }
    verifyJavaBook() {

        cy.get(this.idJavaScript).should('contain', 'Speaking JavaScript');
    }

    deleteBook() {

        cy.get(this.dltBook).click()
    }

    verifyDelete() {
        cy.get(this.okButn).click();
    }
}
export default Profile;