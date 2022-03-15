const router = require('express').Router()

//middleware validate headers content-type
const header = require('../../middlewares/header');


//validation request body
const validator = require('../../rules/api/auth');
const { validate } = require('../../rules/requestValidate');

//controller
const AuthController = require('../../controllers/api/auth/AuthController');

//route
router.post('/login', header.json, validator.auth('login'), validate, AuthController.login);
router.post('/register', header.json, validator.auth('register'), validate, AuthController.register);



module.exports = router