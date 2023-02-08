const faker = require('faker');

function generateUser() {
  const randomNum = Math.random().toString().slice(2, 6);
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    userName: faker.internet.userName() + '_' + randomNum,
    password: 'Pla1nser!',
  };
}

module.exports = { generateUser };