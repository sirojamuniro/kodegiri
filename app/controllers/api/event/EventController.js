const Models = require('../../../../models');
const {
	Sequelize
} = require('../../../../models');
const User = Models.users;
const Event = Models.events;
const Op = Sequelize.Op;
const path = require('path');
const fs = require('fs');
class EventController {
	static async getDetail(req, res) {
		const {
			start,
			limit
		} = req.query;

		try {

		let data =	await Event.findAndCountAll({
				order: [
					['id', 'DESC']
				],
				limit: limit > 0 ? Number(limit) : null,
				offset: start > 0 ? Number(start) : null
			})
				
				const resObj = data.rows.map(data => {

					return Object.assign({}, {
						id: data.id,
						name: data.name,
						start_time: data.start_time,
						image: data.image,					

					})
				})

				res.status(200).send({
					message: 'Success',
					data: {
						count: data.count,
						rows: resObj
					},

				});
		
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}

	static async get(req, res) {
		const {
			start,
			limit
		} = req.query;

		try {

			let data = await Event.findAndCountAll({

				order: [
					['id', 'DESC']
				],
				limit: limit > 0 ? Number(limit) : null,
				offset: start > 0 ? Number(start) : null
			})
				const resObj = data.rows.map(data => {
					return Object.assign({}, {
						id: data.id,
						name: data.name,
						start_time: data.start_time,
						image: data.image,		

					})
				})
				res.status(200).send({
					message: 'Success',
					data: {
						count: data.count,
						rows: resObj
					},
				});
			
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}

	static async getById(req, res) {
		try {
			const id = req.params.id;

			let data= 	await Event.findAndCountAll({
				where: {
					id: id
				},
				
			})
				const resObj = data.rows.map(data => {

					return Object.assign({}, {

						id: data.id,
						name: data.name,
						start_time: data.start_time,
						image: data.image,		

					})
				})
				res.status(200).send({
					message: 'Success',
					data: {
						count: data.count,
						rows: resObj
					},

				});
			
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}

	static async searchEvent(req, res) {
		const {
			start,
			limit
		} = req.query;

		const search = req.body.search;

		const sort = req.body.sort;

		const indicator = req.body.indicator

		const id = indicator != "" ? indicator : "name";

		const price = sort != "" ? sort : "ASC";

		try {
			await Event.findAndCountAll({
				where: {
					[Op.or]: [{
							name: {
								[Op.like]: `%${search}%`
							}
						},
						{
							location: {
								[Op.like]: `%${search}%`
							}
						},
					],

				},
				order: [
					[`${id}`, `${price}`]
				],
				limit: limit > 0 ? Number(limit) : null,
				offset: start > 0 ? Number(start) : null
			}).then((data) => {
				const resObj = data.rows.map(data => {

					return Object.assign({}, {

						id: data.id,
						name: data.name,
						start_time: data.start_time,
						image: data.image,	
					})
				})
				res.status(200).send({
					message: 'Success',
					data: {
						count: data.count,
						rows: resObj
					},
				});
			})
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}

	static async post(req, res) {
		try {
			let fileName = req.file != null ? req.file.filename : null
			let post = {
				image: fileName,
				name:req.body.name,
                location:req.body.location,
				is_active:req.body.is_active,
				start_time:req.body.start_time
			}
			await Event.create(post)
			res.status(200).send({
				message: 'Success',
				data: post
			});
		}
		catch (error) {
			console.log(error);
			res.status(400).send({
				status: "Error",
				data: error.message
			})
		}
	}

	
	static async update(req, res) {
		const id = req.params.id;
	
		let checkEvent = await Event.findOne({where:{id:id, deleted:false}})

		let fileName = req.file != null ? req.file.filename : null;

		try {
			if(checkEvent.image != null){
				if(fileName != null){

					fs.unlinkSync(path.join(__dirname, process.env.PATH_EVENT + '/' + checkEvent.image))	
					
					await Event.update({
						image: fileName,
						name:req.body.name,
						location:req.body.location,
						is_active:req.body.is_active,
						start_time:req.body.start_time
					}, {
						where: { id: id}
					})
		
					res.status(200).send({
						message: 'Success',
					
					});
			}else {
				await Event.update({					
					name:req.body.name,
					location:req.body.location,
					is_active:req.body.is_active,
					start_time:req.body.start_time
				}, {
					where: { id: id}
				})
	
				res.status(200).send({
					message: 'Success',
					
				});
			}
		}
		else{

			if(fileName != null){
				
				await Event.update({
					image: fileName,
					name:req.body.name,
					location:req.body.location,
					is_active:req.body.is_active,
					start_time:req.body.start_time
				}, {
					where: { id: id}
				})
	
				res.status(200).send({
					message: 'Success',
					
				});
			}else {
				await Event.update({
					name:req.body.name,
					location:req.body.location,
					is_active:req.body.is_active,
					start_time:req.body.start_time
				}, {
					where: { id: id}
				})

				res.status(200).send({
					message: 'Success',
					
				});
			}
		}
			
		}
		catch (error) {
			
			console.log(error);
			res.status(400).send({
				status: "Error",
				data: error.message
			})
		}
	}

	static async delete(req, res) {

		const id = req.params.id
		try {

			await Event.update({
					deleted: true,

				}, {
					where: {
						id: id
					}
				})
			
			res.status(200).send({
				status: 'Success',
				message: "Event deleted successfully!"
			})
			
		} catch (error) {

			res.status(400).send({
				status: "Error",
				data: error.message
			})
		}
	}

}



module.exports = EventController