import { faker } from '@faker-js/faker'

function generateUser() {
    const randomNumber = Math.random().toString().slice(2, 6);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const userName = `${firstName}${randomNumber}`.toLowerCase();
    const password = `Qwer1234!`;

    return {
        firstName,
        lastName,
        userName,
        password
    };
};

module.exports = {generateUser};