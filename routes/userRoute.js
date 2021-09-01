const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', (req, res) => res.send('Invalid Path'));
router.post('/', (req, res) => res.send('Invalid Path'));
router.post('/user', userController.addUser);
router.get('/user/all', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.get('/user/all/:name', userController.getUserByName);
router.delete('/user/:id/delete', userController.deleteUserById);
router.put('/user/:id/update', userController.updateUserById);

module.exports = router;
