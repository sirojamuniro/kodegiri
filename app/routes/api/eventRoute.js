const router = require('express').Router()

//middleware validate headers content-type
const header = require('../../middlewares/header');
const user = require('../../middlewares/isUser');
const { validate } = require('../../rules/requestValidate');
const EventController = require('../../controllers/api/event/EventController');
const uploads_event = require('../../middlewares/uploads/event');

//controller

//route
//event
router.get('', EventController.get);
router.get('/detail', EventController.getDetail);
router.post('/', header.auth,user.checkUser, uploads_event.single('image'), EventController.post);
router.put('/:id', header.auth,user.checkUser, uploads_event.single('image'), EventController.update);
router.delete('/:id', header.json, header.auth,user.checkUser,validate, EventController.delete);
router.get('/:id',EventController.getById);
router.post('/test',EventController.getTest);
//search
router.post('/search', EventController.searchEvent);



module.exports = router