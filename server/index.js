import express from 'express';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import log from '../util/logger';

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

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome Page', welcomeMsg: 'You are welcome.' });
});

/**
  * Start Express server
  */
const server = http.createServer(app);
server.listen(app.get('port'), () => {
  log.info('Server is running at port %s', app.get('port'));
});

module.exports = app;
