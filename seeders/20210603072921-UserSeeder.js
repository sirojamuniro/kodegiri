'use strict';
require('dotenv').config()

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('users', [{
			id:1,
			name: 'John Chena',
			gender: 'mr',
			dob: '1998-9-9',
			place_dob: 'Jakarta',
			email: 'user@example.com',
			phone: '+6281234567890',
			nik: '222889-2232-22323',
			photo:'default-user-profile.jpg',
			password: bcrypt.hashSync('123456', salt),
			idnumber: 'default-user-profile.jpg',
			status: 'active',
			role: 'user',
			email_verified_at: new Date(),
			created_at: new Date(),
			updated_at: new Date()
		}]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	}
};
