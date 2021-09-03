const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const { sequelize } = require('./models');
const userRoute = require('./routes/userRoute');
const exerciseRoute = require('./routes/exerciseRoute');
const Sequelize = require('sequelize');

const PORT = process.env.PORT || 3000; //5432; //process.env.PORT || 5432;
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', userRoute);
app.use('/', exerciseRoute);
app.listen(PORT, async () => {
  await sequelize.authenticate();
});
