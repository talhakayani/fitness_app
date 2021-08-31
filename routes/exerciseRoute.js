const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exerciseController');

router.get('/', (req, res) => res.send('Invalid Path'));
router.post('/', (req, res) => res.send('Invalid Path'));
router.post('/exercise', exerciseController.addExercise);
router.get('/exercise/all', exerciseController.getAllExercises);
router.get('/exercise/:id', exerciseController.getExerciseById);
router.get('/exercise/all/:name', exerciseController.getExerciseByName);
router.put('/exercise/:id/update', exerciseController.updateExerciseById);
router.delete('/exercise/:id/delete', exerciseController.deleteExerciseById);

module.exports = router;
