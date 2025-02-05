function userInfo() {
  const username = 'gustavotest1234';
  const password = 'test1234';

  return {
    username,
    password
  };
}

function bookInfo() {
  const title = 'Speaking JavaScript';
  const author = 'Axel Rauschmayer';
  const publisher = `O'Reilly Media`;

  return {
    title,
    author,
    publisher
  };
}

module.exports = { userInfo, bookInfo };
