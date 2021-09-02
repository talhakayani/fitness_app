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
// if(!sequelize){
//     sequelize = new Sequelize({
//       database: ,
//       username: "[won't show username]",
//       password: "[won't show password]",
//       host: 'ec2-54-221-195-148.compute-1.amazonaws.com',
//       port: 5432,
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
//         },
//       },
//     });
// }
app.listen(PORT, async () => {
  console.log(sequelize);
  await sequelize.authenticate();
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
