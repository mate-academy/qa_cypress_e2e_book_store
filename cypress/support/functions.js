/// <reference types='cypress' />

function createUserData() {
  return {
    userName: 'GogoDuck',
    password: 'Qwer!234'
  };
}

function pageLinks() {
  return {
    logIn: '/login',
    books: '/books',
    profile: '/profile'
  };
};

function reqUrls() {
  return {
    loginUrl: 'https://demoqa.com/Account/v1/Login'
  };
}

function loginUser(userName, password) {
  cy.get('#userName').type(userName);
  cy.get('#password').type(password);
  cy.get('#login').click();
}

module.exports = { createUserData, pageLinks, reqUrls, loginUser };
