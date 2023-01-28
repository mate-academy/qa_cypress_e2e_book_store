class Login {
    txtUserName = "input[placeholder='UserName']";
    txtPassword = "input[placeholder='Password']";
    btnSubmit = "#login";
    
    setUserName(username) {

      cy.get(this.txtUserName).type(username);

    }

    setPassword(password) {

      cy.get(this.txtPassword).type(password);

    }

    clickSubmit() {

        cy.get(this.btnSubmit).click();

    }
}

export default Login;