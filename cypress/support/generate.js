const faker = require('faker');

function generateUser() {
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const username = name + surname;
  const email = `${username}@mail.com`;
  const password = '12345Qwert!';
  const number = faker.internet.number;
  const address = faker.address;

  return { email, password, name, surname, number, address };
}

module.exports = { generateUser };
