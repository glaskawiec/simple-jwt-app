import express, { Express } from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

const server = app.listen(3000, () => {
  console.log('Magic happens on port 3000');
});

export default server;
