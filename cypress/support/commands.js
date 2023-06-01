
Cypress.Commands.add('login', () => {
    const username = 'annyurkevych';
    const password = 'P78bw20ao!';
    
    cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
      userName: username,
      password: password
    }).then(response => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('expires', response.body.expires);
      cy.setCookie('userName', response.body.userName);
    });
  });
  
  