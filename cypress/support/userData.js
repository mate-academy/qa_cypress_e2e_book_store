function userInfo() {
  const username = 'tykhonko';
  const password = 'Qwe123!_';

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
