class doClick{
  elements = {   
    getField: (selector) => cy.get(`${selector}`)
  };

  click(selector){
    this.elements.getField(selector).click();
  };

  clickleftSideBar(selector){
    this.elements.getField(selector).click();
  };
};



module.exports = new doClick();