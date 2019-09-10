import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routes from './routes/youtube-dl.routes';
import config from './core/config';
import swaggerOptions from './core/swagger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const port = config.PORT;

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());

app.use('/youtube-dl', routes);

app.get('/', (req, res) => {
  res.send('Invalid route');
});

app.listen(port, () => {
  console.info('[INFO] Server listing on', port)
});
