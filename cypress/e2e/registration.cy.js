/// <reference types='cypress' />

describe('Login and actions with "Speaking JavaScript" book.', () => {
  const username = 'Valko2';
  const password = 'QAjun22!';

 it('login', () => {
    cy.login(username, password);
  });  

  it.skip('Login as your registered account with IP.', () => {
      cy.request({
        method: 'POST',
        url: '/Account/v1/Login',
        body: {
          userName: username,
          password,
        },
      }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userName', response.body.username);
        expect(response.body).to.have.property('username', username);
      });
  });
  
  it('Check your username after login username.', () => {
    cy.inputByAttribute('id', 'userName-value')
      .contains('Valko2');
  });

  it('Navigate to books list', () => {
    cy.visit('/books');
  });

  it('Type into search field "Speaking JavaScript".', () => {
    cy.inputByAttribute('id', 'searchBox')
    .type("Speaking JavaScript");
  });

  it('Click on "Speaking JavaScript" link.', () => {
    cy.get('a')
      .contains("Speaking JavaScript")
      .click();
  });

  it('Click on [Add To Your Collection] button on Speaking JavaScript preview page.', () => {
    cy.get('button')
      .contains("Add To Your Collection")
      .click();
  });

  it('Confirm popup. You can do it with cy.on().', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.equal(`Book added to your collection.`)
    });
  });

  it('Open your profile page', () => {
    cy.visit('/profile');
  });

  it('Assert "Speaking JavaScript" in your shopping list.', () => {
    cy.inputByAttribute('class', 'rt-table')
      .contains('Speaking JavaScript');
  })

  it('Delete Speaking JavaScript book from your list.', () => {
    cy.get(':nth-child(1) > .rt-tr > [style="flex: 70 0 auto; width: 70px; max-width: 70px;"] > .action-buttons > #delete-record-undefined > svg > path')
      .click()
      .then(() => {
        cy.get('button')
          .contains('OK')
          .click();
      });
    
    cy.on('window:alert', (text) => {
      expect(text).to.equal(`Book deleted.`)
    });    
  });
});