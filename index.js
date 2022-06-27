import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
// Initialize database table
import dbTable from './dbTable/index.js'

// routes 
import routes from './routes/index.js';

const host = '0.0.0.0';
const port = config.service.port || 3000;
// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
app.use('/', routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Server listen to port
app.listen(port, host, function(){
  console.log('Listening on port ' + port);
});

export default app;