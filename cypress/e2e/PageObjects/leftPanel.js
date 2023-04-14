class LeftPanel {
  constructor() {
    this.buttons = "span.text";
  }

  selectCategory(category) {
    cy.contains(this.buttons, category).click();
  }
}

export default LeftPanel;
