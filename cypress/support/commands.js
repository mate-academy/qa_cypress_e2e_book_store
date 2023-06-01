Cypress.Commands.add("findByPlaceholder", (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"]`);
});

Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: "https://demoqa.com/Account/v1/Login",
    body: {
      userName: username,
      password,
    },
  }).then((response) => {
    cy.setCookie("token", response.body.token);
    cy.setCookie("userID", response.body.userId);
    cy.setCookie("expires", response.body.expires);
    cy.setCookie("userName", response.body.username);
  });
});
