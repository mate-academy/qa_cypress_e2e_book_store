export const auth = (cy, user) => {
  cy.viewport(1280, 1280);
  cy.visit("/login");
  cy.login(user.username, user.password);
};
