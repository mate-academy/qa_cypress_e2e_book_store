/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      findPlaceholder(placeholder: string): Chainable<any>;
      login(username: string, password: string): Chainable<any>;
    }
  }
  