function userInfo() {
  let username = "donk1hot8";
  let password = "Qwerty123456!";

  return { username, password };
}

function bookData() {
  let title = "Speaking JavaScript";
  let author = "Axel Rauschmayer";
  let publisher = "O'Reilly Media";

  return { title, author, publisher };
}

module.exports = { userInfo, bookData };