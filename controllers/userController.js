const { User } = require('../models');

exports.addUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, height, weight } = req.body;
    await User.create({ name, age, height, weight })
      .then(user => {
        if (!user) {
          res.status(200).json({ message: 'unable to create user' });
        } else {
          res.status(200).json({ message: 'user created!', user });
        }
      })
      .catch(err =>
        res
          .status(400)
          .json({ message: 'Something went wrong', error: err.message })
      );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll()
    .then(users => {
      if (!users) {
        res.status(400).json({ message: 'No user found' });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const filter = {
    where: {
      id: id,
    },
  };
  const user = await User.findOne(filter)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'No user found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.getUserByName = async (req, res) => {
  const name = req.params.name;
  console.log(name);
  const query = {
    where: {
      name: name,
    },
  };
  await User.findOne(query)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'No user found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.updateUserById = async (req, res) => {
  const id = req.params.id;
  const { name, age, height, weight } = req.body;
  await User.update({ name, age, height, weight }, { where: { id } })
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'Details not updated!' });
      } else {
        res.status(200).json({ message: 'Details Updated', user });
      }
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = {
    where: {
      id: id,
    },
  };
  await User.destroy(query)
    .then(count => {
      if (count !== 0) res.status(200).json({ message: 'User deleted', count });
      else res.status(400).json({ message: 'No user found' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
};
