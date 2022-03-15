const Models = require('../../../models');
const Admin = Models.users;
const bcrypt = require('bcrypt');

class ManajemenAdminController {


    static async getById(req,res) {

        const id = req.params.id;

        let list = await Admin.findOne({ 
			where: { id:id, deleted: 0} });
          
		let listSelected = {
            id: list.id,
            name: list.name ? list.name : null,
            email: list.email ? list.email : null,
            phone: list.phone ?? null,
            gender: list.gender ?? null,
		}
		try {
			 res.render('listadmin/edit', {
				 title: 'List Admin Edit',
				 list_admin_id:listSelected,
				 manajemen_admin_active:'active'
			 });
			
		}
		catch (error) {
			req.flash('msg_error', error.message || `Eror mendapatkan user`);
            res.redirect('/admin/listarticle')
		}
	}

 
	static async update(req, res) {
        const id = req.params.id;
        let checkPassword = !req.body.password ? null :req.body.password;
        let checkAdmin = await Admin.findOne({where:{id:id}})

        let password;
        const salt = bcrypt.genSaltSync();

        if(checkPassword != null){
        password = bcrypt.hashSync(req.body.password, salt);
        }
        else{
            password = checkAdmin.password
        }

		try {
			await Admin.update({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                gender:req.body.gender,
                password:password,
            },
            {where:{id:id}});

			req.flash(`msg_info', 'Sukses Update Admin ${req.body.name}`);

            res.redirect('/admin/listadmin')
        }

		catch (error) {
			req.flash('msg_error', error.message || `Eror Update Admin`);
            res.redirect('/admin/listadmin')
		}
	}
    

	static async listAdminView(req, res) {
        let listAdmin = [];
        let list = await Admin.findAll({   
        where: { deleted: 0} });

        let no = 1;

        try{

            await list.forEach((admin) =>
            {  let temp ={
             
                 id: admin.id,
                 name:admin.name ? admin.name : null,
                 email: admin.email ? admin.email: null,
                 phone: admin.phone ?? null,
          
                 no: no++
             }
             listAdmin.push(temp)
             })

             res.render('listadmin', {
                title: 'List Admin',
                list_admin:listAdmin,
                manajemen_admin_active:'active'
            });

        }
        catch (error) {
        req.flash('msg_error', error.message || `Eror mendapatkan admin`);
        res.redirect('/admin/listadmin')}
    }

	static async registerAdmin(req, res) {

		const salt = bcrypt.genSaltSync();
		const password = bcrypt.hashSync(req.body.password, salt);

		try {
        let createAdmin = {
                name: req.body.name,
                email:req.body.email,
                phone: req.body.phone,
                password: password,
                gender:req.body.gender,
              
            }
			await Admin.create(createAdmin)
			req.flash('msg_info', 'Sukses Menambahkan User');

            res.redirect('/admin/listadmin')
		}
		catch (error) {
			req.flash('msg_error', error.message || `Eror menambahkan admin`);
            res.redirect('/admin/listadmin')
		}
	}

    static changePasswordView(req, res) {
		res.render('home/changepassword', {
            title: 'Change Password',
			// layout:true
            profile_active:'active'
        });
    }

    static async changePassword(req, res){
     
		try {
            let admin = await Admin.findOne({where:{email:req.session.email},raw:true})
            
            let isValid = bcrypt.compareSync(req.body.old_password, admin.password)

            if(isValid){
                const salt = bcrypt.genSaltSync();
                let new_password = bcrypt.hashSync(req.body.new_password, salt);	
              
                await Models.admin.update({
                    password : new_password
                }, {
                    where: { email: req.session.email }
                })
                
                req.flash('msg_info', `Sukses mengganti password`);
                res.redirect('/admin/change-password-admin-view');
            }
            else{
                req.flash('msg_error',  `Password Salah`);
                res.redirect('/admin/change-password-admin-view');
            }       
      
		}
		catch (error) {
            req.flash('msg_error', error.message || `Eror mengganti password`);
            res.redirect('/admin/change-password-admin-view');}
		
	}

    static async profileView(req, res){
        let list = await Admin.findOne({  
        where: { email:req.session.email, deleted: 0} });


        try{

           let listSelected ={               
                 id: list.id,
                 name: list.name ? list.name : null,
                 email: list.email ?list.email : null,
                 phone: list.phone ?? null,
                 gender:list.gender ?? null,
               
             
                }

             res.render('home/profile', {
                title: 'Profile Admin',
                list_admin:listSelected,
                profile_active:'active'
            });

        }
        catch (error) {
        req.flash('msg_error', error.message || `Eror mendapatkan admin`);
        res.redirect('/admin/listadmin')}
        }

        static async updateProfile(req, res){
            const id = req.params.id;
    
            try{
                await Admin.update({name:req.body.name, phone:req.body.phone},{where:{id:id}});
                req.flash('msg_info', 'Sukses Mengganti Profile');
    
                res.redirect('/admin/profile-admin')
             
    
            }
            catch (error) {
            req.flash('msg_error', error.message || `Eror update admin`);
            res.redirect('/admin/listadmin')}
            }
	
}

module.exports = ManajemenAdminController