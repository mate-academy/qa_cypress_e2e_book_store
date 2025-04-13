/// <reference types='cypress' />
import * as data from './bookStoreUtils';

describe('Book Store app', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/login');
    data.loginInBookStore(data.username, data.password);
  });

  it('should login user in the system', () => {
    data.usernameIsDisplayed(data.username);
    data.urlIsValid('profile');
  });

  it('should to display book description', () => {
    data.searchBook(data.book);

    data.bookIdIsDisplayed(data.bookId);
    data.bookTitleIsDisplayed(data.book);
    data.bookSubTitleIsDisplayed(data.bookSub);
    data.bookAuthorIsDisplayed(data.bookAuthor);
    data.bookPublisherIsDisplayed(data.bookPublish);
    data.bookTotalPagesIsDisplayed(data.bookTotalPages);
    data.bookDescriptionIsDisplayed(data.bookDescription);
    data.bookWebSiteIsDisplayed(data.bookWebSite);
  });

  it('should to add book in the list', () => {
    data.addBookToList(data.book);

    data.confirmPopup(data.addAlert);
    data.bookIsDisplayedInProfile(data.book, data.bookAuthor, data.bookPublish);
  });

  it('should delete book in the list', () => {
    data.addBookToList(data.book);
    data.deleteBook();

    data.bookListIsEmpty();
  });
});
