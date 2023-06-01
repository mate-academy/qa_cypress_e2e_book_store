Cypress.Commands.add('login', (username, password) => {
    cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
      userName:username,
      password
    }).then((response) => {
        cy.setCookie("userId", response.body.userId);
        cy.setCookie("userName", response.body.username);
        cy.setCookie("expires", response.body.expires);
        cy.setCookie("token", response.body.token);

      });
    });
