/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Create several Todo items via UI
     * @example
     * cy.createDefaultTodos()
     */
    createDefaultTodos(): Chainable<any>
    /**
     * Creates one Todo using UI
     * @example
     * cy.createTodo('new item')
     */cyp  
    login(username: string,password:string): Chainable<any>
  }
}