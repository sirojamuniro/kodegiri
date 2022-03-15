const express = require('express');
const router = express.Router();

const { validate } = require('../../rules/requestValidate');

const uploads_event = require('../../middlewares/uploads/event');

const authAdminController = require('../../controllers/admin/AuthController');
const ValidationMiddleware = require('../../middlewares/admin/auth.validation.middleware');

//validation request body
const validationLogin = require('../../rules/admin/auth/login');
const validationAuth = require('../../rules/admin/auth/auth');



const ManajemenUserController = require('../../controllers/admin/ManajemenUserController');
const ManajemenAdminController = require('../../controllers/admin/ManajemenAdminController');
const HomeController = require('../../controllers/admin/HomeController');
const ManagementEventController = require('../../controllers/admin/ManagementEventController');

// router.use(ValidationMiddleware.validLogin)
/* GET home page. */
router.get('/login', authAdminController.loginView);
router.post('/login', validationLogin.validate('login'), authAdminController.login);
router.get('/logout', authAdminController.logout);
router.get('/index',ValidationMiddleware.validLogin,HomeController.homeView)

//admin
router.get('/listadmin',ValidationMiddleware.validLogin,ManajemenAdminController.listAdminView)
router.get('/listadmin/:id',ValidationMiddleware.validLogin,ManajemenAdminController.getById)
router.post('/update-admin/:id',ValidationMiddleware.validLogin,ManajemenAdminController.update)
router.post('/register-admin',ValidationMiddleware.validLogin, validationAuth.auth('register'),ManajemenAdminController.registerAdmin)
router.get('/change-password-admin-view',ValidationMiddleware.validLogin,ManajemenAdminController.changePasswordView)
router.post('/change-password-admin',ValidationMiddleware.validLogin,ManajemenAdminController.changePassword)
router.get('/profile-admin',ValidationMiddleware.validLogin,ManajemenAdminController.profileView)
router.post('/update-profile-admin/:id',ValidationMiddleware.validLogin,ManajemenAdminController.updateProfile)

//user
router.get('/listuser',ValidationMiddleware.validLogin,ManajemenUserController.listUserView)
router.get('/listuser/:id',ValidationMiddleware.validLogin,ManajemenUserController.listDetailUserView)

//event
router.get('/listevent',ValidationMiddleware.validLogin,ManagementEventController.listEventView); //view product
router.post('/input-event',ValidationMiddleware.validLogin,uploads_event.single('image'), ManagementEventController.post);
router.post('/delete-event/:id',ValidationMiddleware.validLogin,ManagementEventController.delete);
router.get('/listevent/:id',ValidationMiddleware.validLogin,ManagementEventController.getById);
router.post('/update-event/:id',ValidationMiddleware.validLogin,uploads_event.single('image'),ManagementEventController.update);

module.exports = router;
