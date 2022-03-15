const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Models = require('../../../../models');
const User = Models.users;

class ProfileController {
	static async profile(req, res){
		let user = req.user;
		
		try {
			let condition = await User.findOne({
				where: {
					email: user.email,
					role: 'user'
				},
				raw: true
			})		

			if(!condition){
				res.status(400).send({ status: 'Error', errors: [{message: 'User not found' }] })
			}
			else{
				await User.findAll({where:{email:user.email},
					
				}).then((data) =>{
					const resObj = data.map(data => {
						let nik = data.nik ? data.nik : null
						return Object.assign(
							{},
							{
								id:data.id,
								photo:data.photo,
								title:data.title,
								place_dob:data.place_dob,
								dob:data.dob,
								nik: nik,
								name:data.name,
								email:data.email,
								phone:data.phone,
								status:data.status,
								role:data.role
							}
						)
					})
                    res.status(200).send({
                        message: 'Success',
						data: resObj
                    });
                })
			}
		}
		catch (error) {
			res.status(400).send({  status: "Error", errors: [{message: error.message }] })
		}
	}

	static async update(req, res){
		let {section} = req.query;

		let selectionSection;
		
		try {
			
			let user = req.user;

			let condition = await User.findOne({
				where: {
					email: user.email,
					role: 'user'
				},

				raw: true

			});		

			if(!condition){
				res.status(400).send({ status: 'Error', errors: [{message: 'User not found' }] })			
			}
			else {
			
				switch(section){
					case 'name':
						selectionSection= {
							name: req.body.name
						}						
						break;
					case 'nik':
						selectionSection= {
							nik: req.body.nik
						}
						break;	
					case 'dob':
						selectionSection= {
							dob: req.body.dob
						}
						break;
					case 'place_dob':
						selectionSection= {
						place_dob: req.body.place_dob
					}
					break;
					case 'phone':
						selectionSection= {
							phone: req.body.phone
						}
						break;	
					default:
						break;
					}

					await Models.users.update(selectionSection,	{
						where: { email: user.email }
				})
				.then((data) => {
		
					res.status(200).send({ status: 'Success',message:"Success update profile" })
				})
				.catch((error) => {

					res.status(400).send({ status: "Error", errors: [{message: 'data not found' }]  })
				})
			}
		}
		catch (error) {
			
			res.status(400).send({ status: "Error", errors: [{message: error.message }]})
		}
	}



	static async changePassword(req, res){

		const salt = bcrypt.genSaltSync();

		let new_password = bcrypt.hashSync(req.body.new_password, salt);	

		try {
			await Models.users.update({
				password : new_password
			}, {
				where: { email: req.user.email }
			})
			.then((data) => {
				res.status(200).send({ status: 'Success', message: "Account password has been changed successfully!" })
			})
		}
		catch (error) {
			res.status(400).send({ status: "Error", errors: [{message: error.message }]})
		}
	}
}


module.exports = ProfileController