const router = require('express').Router()

//middleware validate headers content-type
const header = require('../../middlewares/header');

//validation request body
const validator = require('../../rules/api/user');
const { validate } = require('../../rules/requestValidate');
const user = require('../../middlewares/isUser');


//controller
const AuthController = require('../../controllers/api/auth/AuthController');
const ProfileController = require('../../controllers/api/user/ProfileController');


//route
router.get('/profile', header.json, header.auth, validate, ProfileController.profile);
router.put('/update-profile', header.json, header.auth,validate, ProfileController.update);

router.post('/change-password', header.json, header.auth, validator.auth('change-password'), validate, ProfileController.changePassword);
router.get('/logout', header.json, header.auth, AuthController.logout);

module.exports = router