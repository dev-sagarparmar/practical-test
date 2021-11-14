import logger from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { NODE_ENV, PORT } from './config/env-var';
import routes from './src/routes';

const port = parseInt(PORT, 10) || 8000;
const app = express();

// Resolve CORS issue
app.use(cors());

app.use(logger('dev'));

// To parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`${NODE_ENV.toUpperCase()} Server listening at http://localhost:${port}`);
});

app.use('/api/', routes);

export default app;
