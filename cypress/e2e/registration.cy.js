/// <reference types='cypress' />

describe('Login as your registered account', () => {
  const username = 'Valko2';
  const password = 'QAjun22!';

  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('Login as your registered account', () => {
      cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Login',
        body: {
          userName: username,
          password,
        },
      }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('UserID', response.body.userId);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userName', response.body.username);
        expect(response.body).to.have.property('username', username);
      });
    
    // cy.request('POST', 'https://demoqa.com/Account/v1/Login', { userName: username, password })
    //   .then((response) => {
    //     cy.setCookie('token', response.body.token);
    //     expect(response.body).to.have.property('username', 'Valko2');
    //   });
    
    // cy.inputByAttribute('placeholder', 'UserName')
    //   .type(username);
        
    // cy.inputByAttribute('placeholder', 'Password')
    //   .type(password);

    // cy.inputByAttribute('id', 'login')
    //   .click();
  });

  it.skip('Check your username after login username', () => {
     cy.inputByAttribute('id', 'userName-value')
        .contains(username);
    })
  });

// Navigate to books list
// Type into search field "Speaking JavaScript"
// Click on 'Speaking JavaScript' link
// Click on [Add To Your Collection] button on Speaking JavaScript preview page