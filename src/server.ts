import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api', router);

const x = server.listen(3000);

export default x;
