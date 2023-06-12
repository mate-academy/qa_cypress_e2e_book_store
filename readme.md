# Cypress: New Article form

## Workflow

1. Fork the repo.
1. Clone **your** forked repository.
1. Run the command `npm i`.
1. Create a new branch `git checkout -b testing`.
1. Resolve tasks in the `cypress`/`e2e`/`createArticle.cy.js`.
1. Check yourself before submitting the task with a [Cypress checklist](https://mate-academy.github.io/qa-program/checklists/cypress.html).
1. Create a pull request.
1. Do not forget to click on `Re-request review` if you submit the homework after previous review.

## Task

App for testing: [Conduit](https://conduit.mate.academy)

[Create](https://demoqa.com/register) your account **manually** before completing the task.  

**Your task** is to check next flow:

1. Login:
   - assert your username after login username;
   - asser new url;
1. Navigate to `Book store`.
1. Type into search field 'Speaking JavaScript'.
1. Click on 'Speaking JavaScript' book.
   - assert description of the book.
1. Click on [Add To Your Collection].
1. Confirm popup. You can do it with cy.on():

    ```js
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    })
    ```

1. Go to your profile page.
1. Assert 'Speaking JavaScript' in your shopping list.
1. Delete Speaking JavaScript book from your list.

## Advanced level

1. Split your test flow on 3 tests: login, add book, delete book.
1. Create `cy.login()` command to login with API. Use `cy.request()` with `.setCookie()` to implement this command.
1. Use `cy.login()` in second and third tests.
