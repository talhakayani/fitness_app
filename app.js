const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const { Sequelize } = require('./models');
const userRoute = require('./routes/userRoute');
const exerciseRoute = require('./routes/exerciseRoute');

const PORT = process.env.PORT || 3000; //5432; //process.env.PORT || 5432;
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', userRoute);
app.use('/', exerciseRoute);

sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

app.listen(PORT, () => {
  sequelize.authenticate();
});
// app.listen(PORT, async () => {
//   console.log('Connecting Database...');
//   await sequelize.authenticate();
//   console.log(`Server Running: http://localhost:${PORT}/api-docs`);
// });
// , async () => {
// console.log('Connecting Database...');
// await sequelize.authenticate();
// console.log(`Server Running: http://localhost:${PORT}/api-docs`);
// });
