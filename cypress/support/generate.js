const faker = require('faker');

function generateUser() {
  const random = Math.random().toString().slice(2, 6);
  const username = faker.internet.userName() + '_' + random;
  const password = '@Password_1';

  return { password, username };
}

module.exports = { generateUser };