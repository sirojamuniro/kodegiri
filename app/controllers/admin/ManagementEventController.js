const Models = require('../../../models');
const Event = Models.events;
const path = require('path');
const fs = require('fs');


class ManagementEventController {

	static async listEventView(req, res) {
        let listArticle = [];
        let list = await Event.findAll({ where: { deleted: false} });
        let no = 1;
        
       await list.forEach((article) =>
       {  let temp ={
            image: article.image ?? null,
            id: article.id,
            name:!article.name ? null : article.name,
			description:!article.description ? null : article.description,
            start_time:article.start_time ?? null,
            location:article.location ?? null,
            is_active:article.is_active ?? null,
            no: no++
        }
        listArticle.push(temp)
        })
    
        res.render('event', {
            title: 'List Event',
            list_event:listArticle,
            manajemen_event_active:'active'
        });
    }

	static async post(req, res) {
        try {
			let fileName = req.file != null ? req.file.filename : null
			let post = {
				image: fileName,
				name:req.body.name,
				location:req.body.location,
                description:req.body.description,
				is_active:req.body.is_active,
				start_time:req.body.start_time
			}
			await Event.create(post)
			req.flash('msg_info', 'Sukses Tambah Event');

				res.redirect('/admin/listevent')
		}
		catch (error) {
			console.log(error);
			req.flash('msg_error', 'Eror tambah event');
            res.redirect('/admin/listevent')
		}
	}

    static async getById(req,res) {

        const id = req.params.id;

        let list = await Event.findOne({ 
			where: { id:id, deleted: false} });

       
		let listSelected = {
			image: list.image ?? null,
            id: list.id,
            name:!list.name ? null : list.name,
			description:!list.description ? null : list.description,
            start_time:list.start_time ?? null,
            location:list.location ?? null,
            is_active:list.is_active ?? null,
		}
		try {
			 res.render('event/edit', {
				 title: 'List Event Id',
				 list_event_id:listSelected,
				 manajemen_event_active:'active'
			 });
			
		}
		catch (error) {
			req.flash('msg_error', error.message || `Eror mendapatkan event`);
            res.redirect('/admin/listevent')
		}
	}

	static async update(req,res) {

		const id = req.params.id;
	
		let checkArticle = await Event.findOne({where:{id:id, deleted:false}})

		let fileName = req.file != null ? req.file.filename : null;

		try {
			if(checkArticle.image != null){
				if(fileName != null){

					fs.unlinkSync(path.join(__dirname, process.env.PATH_EVENT + '/' + checkArticle.image))	
					
					await Event.update({
						image: fileName,
						name:req.body.name,
						description:req.body.description,
						is_active:req.body.is_active,
						start_time:req.body.start_time
					}, {
						where: { id: id}
					})
		
					req.flash('msg_info', 'Sukses Update Event');

					res.redirect('/admin/listevent')
			}else {
				await Event.update({
					
					name:req.body.name,
					description:req.body.description,
					is_active:req.body.is_active,
					start_time:req.body.start_time
				}, {
					where: { id: id}
				})
	
				req.flash('msg_info', 'Sukses Update Event');

				res.redirect('/admin/listevent')
			}
		}
		else{

			if(fileName != null){
				
				await Event.update({
					image: fileName,
					name:req.body.name,
					description:req.body.description,
					is_active:req.body.is_active,
					start_time:req.body.start_time
				}, {
					where: { id: id}
				})
	
				req.flash('msg_info', 'Sukses Membuat Event');

				res.redirect('/admin/listevent')
			}else {
				await Event.update({
				
						name:req.body.name,
						description:req.body.description,
						is_active:req.body.is_active,
						start_time:req.body.start_time
				}, {
					where: { id: id}
				})

				req.flash('msg_info', 'Sukses Membuat Event');

				res.redirect('/admin/listevent')
			}
		}
			
		}
		catch (error) {
			
			req.flash('msg_error', 'Eror update event');
            res.redirect('/admin/listevent')
		}
	}

	static async delete(req,res) {

		const id = req.params.id
		
		try {
			
			await Event.destroy({
				where: { id: id}
			})
			req.flash('msg_info', 'Sukses Delete Event');

			res.redirect('/admin/listevent')
		}
		catch (error) {
		
			req.flash('msg_error', 'Eror delete event');
            res.redirect('/admin/listevent')
		}
	}
	
}

module.exports = ManagementEventController