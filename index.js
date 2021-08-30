const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { sequelize, Exercise, User } = require('./models');
//const exerciserRouter = require('./routes/exerciseRoute');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json()); //middelware to convert the response in JSON format

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness App',
      version: '1.0.0',
      description: 'A simple Fitness app',
    },
  },
  apis: ['index.js'],
};
const swaggerDocs = swaggerDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - ex_name
 *         - no_of_repetitions
 *         - time
 *       properties:
 *         ex_name:
 *           type: string
 *           description: The name of the exercise
 *         no_of_repetitions:
 *           type: integer
 *           description: Number of repetitions of the exercise
 *         time:
 *           type: string
 *           description: Duration of the Exercise in seconds
 *       example:
 *         ex_name: Push Ups
 *         no_of_repetitions: 10
 *         time: 30 Seconds / sec
 *     Errors:
 *        type: object
 *        required:
 *         - status
 *         - message
 *        properties:
 *          status:
 *            type: integer
 *            description: show the status of the response
 *          message:
 *            type: string
 *            description: show the error message
 *     User:
 *        type: object
 *        required:
 *         - name
 *         - age
 *         - height
 *         - weight
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the user
 *          age:
 *            type: integer
 *            description: year of age of the user in round figure
 *          height:
 *            type: float
 *            description: Height of the user
 *          weight:
 *            type: float
 *            description: Weight of the user
 *        example:
 *          name: Talha Kayani
 *          age: 30
 *          height: 5.11
 *          weight: 80.0
 */

/**
 * @swagger
 * /exercise:
 *    post:
 *      summary: Insert the new Exercises
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Exercise'
 *      responses:
 *        200:
 *          description: New exercise inserted successfully
 *          content:
 *            application/json:
 *            schema:
 *              $ref: '#components/schemas/Exercise'
 *        400:
 *          description: Error while inserting exercise
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 *
 */
app.post('/exercise', async (req, res) => {
  const { ex_name, no_of_repetitions, time } = req.body;
  try {
    const exercise = await Exercise.create({
      ex_name,
      no_of_repetitions,
      time,
    });
    return res.status(200).json(exercise);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err);
  }
});
/**
 * @swagger
 * /exercise/all:
 *    get:
 *      summary: This will return list of all the registered exercises
 *      responses:
 *        200:
 *          description: Sucessfully retreive the list of all exercises
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#componenets/schemas/Exercise'
 *        400:
 *          description: No exercise found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 *
 *
 */

app.get('/exercise/all', async (req, res) => {
  const ex = await Exercise.findAll().then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(300).json({ status: 300, message: 'no exercise found!' });
});
/**
 * @swagger
 * /exercise/{id}:
 *    get:
 *      summary: This will return the details of the registered exercise having id = {id}
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The exercise id
 *      responses:
 *        200:
 *          description: Sucessfully retreive the details of exercise
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#components/schemas/Exercise'
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#componenets/schemas/Errors'
 */
app.get('/exercise/:id', async (req, res) => {
  const id = req.params.id;
  const ex = await Exercise.findAll({ where: { id: id } }).then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(300).json({ status: 300, message: 'no exercise found!' });
});
/**
 * @swagger
 * /exercise/all/{name}:
 *    get:
 *      summary: This will return the details of the registered exercise having name = {name}
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: The exercise name it should be exactly same
 *      responses:
 *        200:
 *          description: Sucessfully retreive the details of exercise
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#components/schemas/Exercise'
 *        400:
 *          description: No exercise found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */
app.get('/exercise/all/:name', async (req, res) => {
  const ex_name = req.params.name;
  const ex = await Exercise.findAll({
    where: {
      ex_name: ex_name,
    },
  }).then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(300).json({ status: 300, message: 'no exercise found!' });
});
/**
 * @swagger
 * /exercise/{id}:
 *    put:
 *      summary: This will update the record of the registered exercise having id = 1
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The exercise id it should be exactly same
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Exercise'
 *      responses:
 *        200:
 *          description: Sucessfully update the exercise
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 *        400:
 *          description: No exercise found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#componenets/schemas/Errors'
 */
app.put('/exercise/:id', async (req, res) => {
  const id = req.params.id;
  const { ex_name, no_of_repetitions, time } = req.body;

  await Exercise.update(
    { ex_name, no_of_repetitions, time },
    { where: { id: id } }
  )
    .then(([rows, data]) => res.status(200).json(data))
    .catch(rr => res.status(400).json({ message: 'data not found' + rr }));
});
/**
 * @swagger
 * /exercise/{id}:
 *    delete:
 *      summary: This will delete the record of the registered exercise having id = 1
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id, it should be exactly same
 *      responses:
 *        200:
 *          description: Sucessfully delete the exercise
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 *        400:
 *          description: No exercise found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */
app.delete('/exercise/:id', async (req, res) => {
  const id = req.params.id;
  await Exercise.destroy({ where: { id } })
    .then(count => {
      if (count !== 0) res.status(200).json({ message: 'Record Deleted' });
      else res.status(300).json({ message: 'no record matched!' });
    })
    .catch(err => res.status(400).json(err));
});

//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// USERS //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Insert the new User
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      responses:
 *        200:
 *          description: New User inserted successfully
 *          content:
 *            application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *        400:
 *          description: Error while creating user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 *
 */
app.post('/user', async (req, res) => {
  const { name, age, weight, height } = req.body;
  try {
    const user = await User.create({ name, age, weight, height });
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
/**
 * @swagger
 * /user/{id}:
 *    delete:
 *      summary: This will delete the record of the registered user having id = 1
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id, it should be exactly same
 *      responses:
 *        200:
 *          description: Sucessfully update the user
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */
app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id } })
    .then(count => {
      if (count !== 0) res.status(200).json({ message: 'Record Deleted' });
      else res.status(300).json({ message: 'no record matched!' });
    })
    .catch(err => res.status(400).json(err));
});

/**
 * @swagger
 * /user/all:
 *    get:
 *      summary: This will return list of all the registered user
 *      responses:
 *        200:
 *          description: Sucessfully retreive the list of all users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#components/schemas/User'
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */

app.get('/user/all', async (req, res) => {
  const ex = await User.findAll().then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(400).json({ status: 400, message: 'no exercise found!' });
});

/**
 * @swagger
 * /user/{id}:
 *    get:
 *      summary: This will return the details of the registered user having id = 1
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user ID
 *      responses:
 *        200:
 *          description: Sucessfully retreive the list of all users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#components/schemas/User'
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#componenets/schemas/Errors'
 */
app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const ex = await User.findAll({ where: { id: id } }).then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(400).json({ status: 400, message: 'no exercise found!' });
});

/**
 * @swagger
 * /user/all/{name}:
 *    get:
 *      summary: This will return the details of the registered user having name = 'talha'
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: The user name it should be exactly same
 *      responses:
 *        200:
 *          description: Sucessfully retreive the list of all users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  #ref: '#components/schemas/User'
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */
app.get('/user/all/:name', async (req, res) => {
  const ex_name = req.params.name;
  const ex = await User.findAll({
    where: {
      name: ex_name,
    },
  }).then(ex => ex);
  if (ex) return res.status(200).json(ex);
  else
    return res.status(400).json({ status: 400, message: 'no exercise found!' });
});
/**
 * @swagger
 * /user/{id}:
 *    delete:
 *      summary: This will delete the record of the registered user having id = 1
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user name it should be exactly same
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      responses:
 *        200:
 *          description: Sucessfully retreive the list of all users
 *        400:
 *          description: No user found!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Errors'
 */
app.put('/user/:id', async (req, res) => {
  const id = req.params.id;
  const { name, age, height, weight } = req.body;

  await Exercise.update({ name, age, height, weight }, { where: { id: id } })
    .then(([rows, data]) => res.status(200).json(data))
    .catch(rr => res.status(400).json({ message: 'data not found' + rr }));
});

app.listen(PORT, async () => {
  console.log('fetching server...');
  await sequelize.authenticate();
  console.log(`server running on: http://localhost:${PORT}/api-docs`);
});
