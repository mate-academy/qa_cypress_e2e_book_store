/// <reference types='cypress' />
import { user, book, alertMessage } from "../support/testData";
describe('Smoke test run', () => {
  beforeEach(() => {
    cy.loginRequest(user.username, user.password);
  });
  it('Successful login', () => {
    cy.get('#userName-value').should('contain', user.username);
  });
  it('User is able to add book to the collection', () => {
    cy.get('#gotoStore').click({force:true});
    cy.get('#searchBox').type(book.title);
    cy.contains('a', book.title).click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click({force:true});
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.success);
    });
  });
  it('User is able to remove book from the collection', () => {
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.delete);
    });
  });
});