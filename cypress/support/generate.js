const { faker } = require("@faker-js/faker");

function generateUser() {
	const randomNumber = Math.floor(Math.random() * 10 ** 10);
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const email = `${firstName}.${lastName}@email.com`.replace(/'/g, "");
	const mobile = randomNumber;
	const subjects = "Example subjects";
	const address = "Current address";
	const state = "NCR";
	const city = "Delhi";

	return { firstName, lastName, email, mobile, subjects, address, state, city };
}
module.exports = { generateUser };
