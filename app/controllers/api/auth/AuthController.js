const Models = require('../../../../models');
const bcrypt = require('bcrypt');;
const jwtConvert = require('../../../helpers/jwtConvert');
const userService = require('../../../services/data/userService');
const User = Models.users;
const path = require('path');
const fs = require('fs');
const {
	isEmpty
} = require('lodash');

class AuthController {
	static async login(req, res) {
		try {

			let status = ['waiting-confirmation', 'active'];

			const condition = {
				email: req.body.email,
				status: status,
				role: 'user'
			};

			let dataUserService = await userService.getUser(condition);

			if (!dataUserService) {
				throw ({
					message: 'User not found'
				 })
				
			} else {

				let isValid = bcrypt.compareSync(req.body.password, dataUserService.password)

				if (isValid) {

						let token = jwtConvert.sign({
							role: dataUserService.role,
							email: req.body.email,
							status: dataUserService.status
						});
					
						await Models.users.update({
							token: token,
						}, {
							where: {
								email: req.body.email
							},
						});				

						res.status(200).send({
							message: 'Success',
							token: token
						})

				} else {
					res.status(400).send({
						status: 'Error',
						errors: [{
							message: "Wrong Password or Email"
						}]
					})
				}
			}
		} catch (error) {
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}

	static async logout(req, res) {
		try {
			await Models.users
				.findOne({
					where: {
						email: req.user.email,
						role: 'user'
					},
					raw: true
				})
				.then(async (data) => {
					if (!data) {
						res.status(400).send({
							status: 'Error',
							errors: [{
								message: 'User not found'
							}]
						})
					}

					await Models.users.update({
						token: null
					}, {
						where: {
							email: req.user.email
						},
					});

					res.status(200).send({
						status: 'Success',
						errors: [{
							message: 'You have been logged out'
						}]
					})
				})
		} catch (err) {
			res.status(400).send({
				status: "Error",
				errors: [{
					message: err.message
				}]
			})
		}
	}

	static async register(req, res) {
		const status = 'waiting-confirmation';
		const role = 'user';

		const verification_code = generateInt(6)
		const salt = bcrypt.genSaltSync();
		const password = bcrypt.hashSync(req.body.password, salt);

		let create = {
			name: req.body.name,
			gender: req.body.gender,
			dob: req.body.dob,
			email: req.body.email,
			phone: req.body.phone,
			password: password,
			token: null,
			verification_code: verification_code,
			role: role,
			status: status,
			email_verified_at: new Date(),
		}

		await Models.users.create(create)
			.then(async (result) => {
				res.status(200).send({
					status: "Success",
					message: 'Success Register'
				});
			}).catch((err) => {
				res.status(400).send({
					status: "Error",
					errors: [{
						message: err.message
					}]
				})
			});
	}

}

module.exports = AuthController