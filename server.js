import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import jiraRoute from './routes/jira.routes';
import config from './core/config';
import swaggerOptions from './core/swagger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const port = config.PORT;


const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

app.use('/jira', jiraRoute);

app.get('/', (req, res) => {
  res.send('Invalid route');
});

app.listen(port, () => {
  console.log('Server listing on', port)
});