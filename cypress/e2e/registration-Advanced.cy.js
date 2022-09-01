/// <reference types='cypress' />
//Test data: 
//First Name: Serhiy//Last Name: Breslav
//Username: SuperUser//Password: SuperPassword100!
//it('', () => {});

describe('Smoke Testing', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)

    const userName = 'SuperUser';
    const password = 'SuperPassword100!';

    cy.visit('https://demoqa.com/login');
  
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Login',
      body: {
        userName: userName,
        password: password,
      },
    })

    .then(response => {
      cy.setCookie('token',  response.body.token);
      cy.setCookie('expires', response.body.expires);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('userName', response.body.username);
    })

    cy.reload()
  });

  it('Check your username after login ', () => {
    cy.get('#userName-value')
      .should('contain.text', 'SuperUser')
  });
});
