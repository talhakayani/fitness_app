const { Exercise } = require('../models');
const { options } = require('../routes/userRoute');

exports.addExercise = async (req, res) => {
  const { ex_name, no_of_repetitions, time } = req.body;
  await Exercise.create({ ex_name, no_of_repetitions, time })
    .then(exercise => {
      res.status(200).json({ mesage: 'Exercise Created', exercise });
    })
    .catch(err => {
      res.status(400).json({ message: err.errors[0].message });
    });
};

exports.getAllExercises = async (req, res) => {
  await Exercise.findAll()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json({ message: err.mesage }));
};

exports.getExerciseById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = {
    where: {
      id: id,
    },
  };
  await Exercise.findOne(query)
    .then(exercise => res.status(200).json({ message: 'found', exercise }))
    .catch(err => res.status(400).json({ message: err.mesage }));
};

exports.getExerciseByName = async (req, res) => {
  const name = req.params.name;
  const query = {
    where: {
      ex_name: name,
    },
  };
  await Exercise.findOne(query)
    .then(exercise => res.status(200).json({ message: 'found', exercise }))
    .catch(err => res.status(400).json({ message: err.mesage }));
};

exports.updateExerciseById = async (req, res) => {
  const id = req.params.id;
  const { ex_name, no_of_repetitions, time } = req.body;
  const query = {
    where: {
      id: id,
    },
  };
  await Exercise.update({ ex_name, no_of_repetitions, time }, query)
    .then(exercise => res.status(200).json(exercise))
    .catch(err => res.status(400).json({ message: err.mesage }));
};

exports.deleteExerciseById = async (req, res) => {
  const id = req.params.id;
  const query = {
    where: {
      id: id,
    },
  };
  await Exercise.destroy(query)
    .then(count => {
      if (count !== 0) res.status(200).json({ message: 'User deleted', count });
      else res.status(400).json({ message: 'No user found' });
    })
    .catch(err => res.status(400).json({ message: err.mesage }));
};
