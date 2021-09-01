const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const { sequelize } = require('./models');
const userRoute = require('./routes/userRoute');
const exerciseRoute = require('./routes/exerciseRoute');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', userRoute);
app.use('/', exerciseRoute);
app.listen(PORT, async () => {
  //console.log('Connecting Database...');
  await sequelize.authenticate();
  //console.log(`Server Running: http://localhost:${PORT}/api-docs`);
});
