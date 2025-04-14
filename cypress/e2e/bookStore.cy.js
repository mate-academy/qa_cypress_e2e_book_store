/// <reference types='cypress' />
const { generateUser } = require("../support/generate");

describe("", () => {
	it("should log in the user succesfully", () => {
		cy.visit("https://demoqa.com/login");

		cy.get("#userName").type("tola");
		cy.get("#password").type("1qaz2wsxA!");
		cy.get("#login")
			.click()
			.then(() => {
				cy.get("#userName-value").should("contain.text", "tola");
				cy.url().should("eql", "https://demoqa.com/profile");
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-2 > .text")
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books");
			});
		cy.get("#searchBox").type("Speaking JavaScript{enter}");
		cy.get('a[href="/books?book=9781449365035"]')
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books?book=9781449365035");
				cy.get("#description-label").should("be.visible");
				cy.get("#description-wrapper > .col-md-9 > #userName-value").should(
					"contain.text",
					"Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o"
				);
			});
		cy.get("#addNewRecordButton")
			.click({ force: true })
			.then(() => {
				cy.on("window:alert", (str) => {
					expect(str).to.equal(`Book added to your collection.`);
					cy.on("window:confirm", () => true);
				});
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-3")
			.click({ force: true })
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/profile");
				cy.get('a[href="/profile?book=9781449365035"]').should("be.visible");
			});
		cy.get(
			'.rt-tbody > :nth-child(1) > .rt-tr > [style="flex: 70 0 auto; width: 70px; max-width: 70px;"]'
		).click();
	});

	it("should add the book", () => {
		const { firstName, password } = generateUser();

		cy.visit("https://demoqa.com/register");
		cy.request("POST", "https://demoqa.com/Account/v1/User", {
			userName: firstName,
			password: password,
		});

		cy.visit("https://demoqa.com/login");
		cy.get("#userName").type(firstName);
		cy.get("#password").type(password);
		cy.get("#login")
			.click()
			.then(() => {
				cy.get("#userName-value").should("contain.text", firstName);
				cy.url().should("eql", "https://demoqa.com/profile");
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-2 > .text")
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books");
			});
		cy.get("#searchBox").type("Speaking JavaScript{enter}");
		cy.get('a[href="/books?book=9781449365035"]')
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books?book=9781449365035");
				cy.get("#description-label").should("be.visible");
				cy.get("#description-wrapper > .col-md-9 > #userName-value").should(
					"contain.text",
					"Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o"
				);
			});
		cy.contains('[type="button"]', "Add To Your Collection")
			.click({ force: true })
			.then(() => {
				cy.on("window:alert", (str) => {
					expect(str).to.equal(`Book added to your collection.`);
					cy.on("window:confirm", () => true);
				});
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-3")
			.click({ force: true })
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/profile");
				cy.get('a[href="/profile?book=9781449365035"]').should("be.visible");
			});
	});

	it("should delete the book", () => {
		const { firstName, password } = generateUser();

		cy.visit("https://demoqa.com/register");
		cy.request("POST", "https://demoqa.com/Account/v1/User", {
			userName: firstName,
			password: password,
		});

		cy.visit("https://demoqa.com/login");
		cy.get("#userName").type(firstName);
		cy.get("#password").type(password);
		cy.get("#login")
			.click()
			.then(() => {
				cy.get("#userName-value").should("contain.text", firstName);
				cy.url().should("eql", "https://demoqa.com/profile");
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-2 > .text")
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books");
			});
		cy.get("#searchBox").type("Speaking JavaScript{enter}");
		cy.get('a[href="/books?book=9781449365035"]')
			.click()
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/books?book=9781449365035");
				cy.get("#description-label").should("be.visible");
				cy.get("#description-wrapper > .col-md-9 > #userName-value").should(
					"contain.text",
					"Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o"
				);
			});
		cy.contains('[type="button"]', "Add To Your Collection")
			.click({ force: true })
			.then(() => {
				cy.on("window:alert", (str) => {
					expect(str).to.equal(`Book added to your collection.`);
					cy.on("window:confirm", () => true);
				});
			});
		cy.get(":nth-child(6) > .element-list > .menu-list > #item-3")
			.click({ force: true })
			.then(() => {
				cy.url().should("eql", "https://demoqa.com/profile");
				cy.get('a[href="/profile?book=9781449365035"]').should("be.visible");
			});
		cy.get("#delete-record-undefined")
			.click({ force: true })
			.then(() => {
				cy.on("window:alert", (str) => {
					expect(str).to.equal("Do you want to delete this book?.");
				});
				cy.get("#closeSmallModal-ok").click();
			});
	});
});
