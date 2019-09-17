import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import log from '../util/logger';
import { mongoConnector } from './middlewares/mongo';
import database from './database';

/**
	* Connect to database
	*/
let db = mongoConnector();

/**
  * Create express server
  */
const app = express();

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');
app.use(helmet());
app.use(cors());
// get information from html forms
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// setup database
database(app);

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome Page', welcomeMsg: 'You are welcome.' });
});

module.exports = app;
