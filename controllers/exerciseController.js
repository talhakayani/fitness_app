const { Exercise } = require('../models');

exports.addExercise = async (req, res) => {
  const { ex_name, no_of_repetitions, time } = req.body;
  await Exercise.create({ ex_name, no_of_repetitions, time })
    .then(exercise =>
      res.status(200).json({ mesage: 'Exercise Created', exercise })
    )
    .catch(err =>
      res.status(400).json({ message: 'Unable to create the Exercise' })
    );
};

exports.getAllExercises = async (req, res) => {
  await Exercise.findAll()
    .then(exercises => {
      if (!exercises) {
        res.status(200).json({ message: 'No exercise found' });
      } else {
        res.status(200).json(exercises);
      }
    })
    .catch(() => res.status(400).json({ message: 'unable to get the record' }));
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
    .then(exercise => {
      if (!exercise) {
        res.status(200).json({ message: 'No exercise found' });
      } else {
        res.status(200).json({ message: 'Exercise found', exercise });
      }
    })
    .catch(() => res.status(400).json({ message: 'Exercise not found' }));
};

exports.getExerciseByName = async (req, res) => {
  const name = req.params.name;
  const query = {
    where: {
      ex_name: name,
    },
  };
  await Exercise.findOne(query)
    .then(exercise => {
      if (!exercise) {
        res.status(200).json({ message: 'No exercise found' });
      } else {
        res.status(200).json({ message: 'Exercise found', exercise });
      }
    })
    .catch(() => res.status(400).json({ message: 'Exercise not found' }));
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
    .then(exercise => {
      if (!exercise) {
        res.status(200).json({ message: 'No exercise found' });
      } else {
        res
          .status(200)
          .json({ message: 'Exercise found and updated', exercise });
      }
    })
    .catch(() => res.status(400).json({ message: 'Exercise not found' }));
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
      else res.status(400).json({ message: 'No exercise found!' });
    })
    .catch(err => res.status(400).json({ message: 'unable to delete user' }));
};
