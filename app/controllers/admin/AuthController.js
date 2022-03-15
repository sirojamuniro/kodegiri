const { validationResult } = require('express-validator');
const Models = require('../../../models');
const bcrypt = require('bcrypt');
const Admin = Models.users;

class AuthController {
    static loginView(req, res) {
        res.render('auth/login', {
            title: 'Login',
            layout: false
        });
    }

    static login(req, res) {
		const errors = validationResult(req);
 
		if (!errors.isEmpty()) {
            req.flash('msg_error', `Email or Username not found`);
			res.redirect('/admin/login');
		}
        
        let admin = Admin.findOne({
                where: {
					email: req.body.email
                },
            })
            .then((data_user) => {
              
                if(!data_user) {
                    req.flash('msg_error', "Email or Username not found");
                    res.redirect('/admin/login');
                } else {
                 
                    let user_id = data_user.id;
                    let email = data_user.email;
                    let name = data_user.name;
                    
					if(email){
						let isValid = bcrypt.compareSync(req.body.password, data_user.password)
                      
						if(isValid) {
							req.session.loggedin = true
							req.session.name = name;
							req.session.user_id = user_id;
                            req.session.email = email;
						
							res.redirect('/admin/index');
						} else {
							req.flash('msg_error', `Wrong password or Email`);
							res.redirect('/admin/logout');
						}
					}
					else{
						req.flash('msg_error', `Unauthorized`);
						res.redirect('/admin/logout');
					}
                }
            })
            .catch((err) => {
             
                req.flash('msg_error', err.message || "Some error occurred while login.");
                res.redirect('/admin/logout');
            })
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/admin/login');
    }

}

module.exports = AuthController
