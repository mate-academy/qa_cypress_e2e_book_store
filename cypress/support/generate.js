const faker = require('faker');

function generateUser() {
    const username = 'UnitTest';
    const password = '12345Qwert!';

    return { username, password };
}

module.exports = { generateUser };