const router = require('express').Router()

//middleware validate headers content-type
const header = require('../../middlewares/header');
const user = require('../../middlewares/isUser');
const { validate } = require('../../rules/requestValidate');
const EventController = require('../../controllers/api/event/EventController');

//controller

//route
//product
router.get('', header.json,validate, EventController.get);
router.get('/detail', header.json,validate, EventController.getDetail);

router.get('/:id', header.json, validate,EventController.getById);

//search
router.post('', header.json, header.auth,user.checkUser,validate, EventController.searchEvent);
router.put('/:id', header.json, header.auth,user.checkUser,validate, EventController.update);
router.delete('/:id', header.json, header.auth,user.checkUser,validate, EventController.delete);


module.exports = router