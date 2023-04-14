import BookStore from "../e2e/PageObjects/bookStorePage";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
  let token;
  cy.fixture("creds").then((data) => {
    cy.request("POST", "/Account/v1/GenerateToken", {
      userName: data.username,
      password: data.password,
    }).then(() => {
      cy.request("POST", "/Account/v1/Login", {
        userName: data.username,
        password: data.password,
      }).then((resp) => {
        token = resp.body.token;
        const userId = resp.body.userId;
        const username = resp.body.username;
        const expires = resp.body.expires;
        cy.setCookie("token", token);
        cy.setCookie("userID", userId);
        cy.setCookie("username", username);
        cy.setCookie("expires", expires);
        cy.request({
          method: "GET",
          url: `/Account/v1/User/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      });
    });
  });
});

Cypress.Commands.add("addBook", () => {
  const bookStore = new BookStore();
  cy.visit("/books");
  cy.fixture("book").then((book) => {
    bookStore.search(book.title);
    bookStore.chooseBook(book.title);
    bookStore.addToCollection();
  });
});
