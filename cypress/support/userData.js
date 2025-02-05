function userInfo() {
  let username = "Gusith";
  let password = "Gusith1!_";

  return { username, password };
}

function bookData() {
  let title = "Speaking JavaScript";
  let author = "Axel Rauschmayer";
  let publisher = "O'Reilly Media";

  return { title, author, publisher };
}

module.exports = { userInfo, bookData };