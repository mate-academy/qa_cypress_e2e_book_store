const { faker } = require("@faker-js/faker");

function generateUser() {
	const randomNumber = Math.floor(Math.random() * 10 ** 10);
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const userName = firstName;
	const password = "1qaz2wsxA!";

	return { firstName, lastName, userName, password };
}
module.exports = { generateUser };
