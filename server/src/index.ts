import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', async (req, res) => {
  res.json({ hello: 'world' });
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${port}`);
});
