export const username = 'ValeriiaTest';
export const password = 'QAqwerty@123';
export const book = 'Speaking JavaScript';
const baseUrl = 'https://demoqa.com';
export const bookId = '9781449365035';
export const bookSub = 'An In-Depth Guide for Programmers';
export const bookAuthor = 'Axel Rauschmayer';
export const bookPublish = 'O\'Reilly Media';
export const bookTotalPages = '460';
export const bookDescription = 'Like it or not, JavaScript is everywhere';
export const bookWebSite = 'http://speakingjs.com/';
export const addAlert = 'Book added to your collection.';

export function loginInBookStore(user, pass) {
  cy.getByPlaceholder('UserName').type(user);
  cy.getByPlaceholder('Password').type(pass);
  cy.get('#login').click();
  urlIsValid('profile');
}

export function usernameIsDisplayed(user) {
  cy.get('.text-right #userName-label').should('have.text', 'User Name : ');
  cy.get('.text-right #userName-value').should('have.text', user);
}

export function urlIsValid(urlPart) {
  cy.url().should('eq', `${baseUrl}/${urlPart}`);
}

function goToBookStore() {
  cy.get('.menu-list').contains('Book Store').click();
}

export function searchBook (bookName) {
  goToBookStore();
  cy.getByPlaceholder('Type to search').type(bookName);
  cy.get('.mr-2').contains(bookName).click();
}

export function bookIdIsDisplayed(id) {
  cy.get('#ISBN-label').should('have.text', 'ISBN : ');
  cy.get('#ISBN-wrapper #userName-value').should('have.text', id);
}

export function bookTitleIsDisplayed(bookName) {
  cy.get('#title-label').should('have.text', 'Title : ');
  cy.get('#title-wrapper #userName-value').should('have.text', bookName);
}

export function bookSubTitleIsDisplayed(bookSubName) {
  cy.get('#subtitle-label').should('have.text', 'Sub Title : ');
  cy.get('#subtitle-wrapper #userName-value').should('have.text', bookSubName);
}

export function bookAuthorIsDisplayed(author) {
  cy.get('#author-label').should('have.text', 'Author : ');
  cy.get('#author-wrapper #userName-value').should('have.text', author);
}

export function bookPublisherIsDisplayed(publisher) {
  cy.get('#publisher-label').should('have.text', 'Publisher : ');
  cy.get('#publisher-wrapper #userName-value').should('have.text', publisher);
}

export function bookTotalPagesIsDisplayed(totalPages) {
  cy.get('#pages-label').should('have.text', 'Total Pages : ');
  cy.get('#pages-wrapper #userName-value').should('have.text', totalPages);
}

export function bookDescriptionIsDisplayed(description) {
  cy.get('#description-label').should('have.text', 'Description : ');
  cy.get('#description-wrapper #userName-value')
    .should('contain.text', description);
}

export function bookWebSiteIsDisplayed(site) {
  cy.get('#website-label').should('have.text', 'Website : ');
  cy.get('#website-wrapper #userName-value').should('have.text', site);
}

export function confirmPopup(message) {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(message);
  });
}

export function addBookToList(book) {
  goToBookStore();
  searchBook(book);
  cy.get('.text-right #addNewRecordButton').click();
}

export function deleteBook() {
  goToProfile();
  cy.get('#delete-record-undefined').click();
  cy.get('#closeSmallModal-ok').click();
}

export function bookListIsEmpty() {
  goToProfile();
  cy.get('.ReactTable').contains('No rows found').should('be.visible');
}

function goToProfile() {
  cy.get('.menu-list').contains('Profile').click();
}

export function bookIsDisplayedInProfile(title, author, publisher) {
  goToProfile();
  cy.get('.rt-tbody .mr-2').should('have.text', title);
  cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
    .should('have.text', author);
  cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
    .should('have.text', publisher);
}
