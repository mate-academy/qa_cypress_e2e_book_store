/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getElementById(id: string): Chainable<any>;
    getElementByAttribute(name: string, value: string): Chainable<any>;
    findAndFillInput(id: string, value: string): Chainable<any>;
    findOneItem(query: string): Chainable<any>;
    login(userName: string, password: string): Chainable<any>;
  }
}
