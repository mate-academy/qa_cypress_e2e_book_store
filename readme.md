Workflow:
1. Fork the repo.
1. Clone **your** forked repository.
1. Create a new branch `git checkout -b develop`.
1. Resolve tasks in the `cypress`/`integration`/`signIn.spec.js`.
1. Create a pull request.

## Basic level

App for testing: `https://demoqa.com/login`

Create your account **before** tests [register page](https://demoqa.com/register). Note: that action you should perform only once. Do not automate it!

**Your task** is to automate the next test cases:

1. Login as your registered account  
1. Check your username after login username
1. Navigate to books list
1. Type into search field "Speaking JavaScript"
1. Click on 'Speaking JavaScript' link
1. Click on [Add To Your Collection] button on Speaking JavaScript preview page
1. Confirm popup. You can do it with cy.on()
```js
cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
})
```
7. Open your profile page
8. Assert 'Speaking JavaScript' in your shopping list
9. Delete Speaking JavaScript book from your list

In order to be logged in before each test, do the following:
1. Create _beforeEach_ method for login before your tests
1. Add custom cypress **cy.login(email, password)** command (In this step you should **not** use cy.request)
1. Move _beforeEach_ method to support/index.js file and run login before each IT

## Advanced level

1. Rewrite Login method using **cy.request().then((resp) => {resp.body.token ....})**
1. Add cookies to defaults 
```js
Cypress.Cookies.defaults({
    preserve: [...]
})
```
