'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes/routes.js');
const logger = require('./auth/middleware/logger.js');


const v1Routes = require('../src/auth/routes/v1');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Middleware
app.use(logger);

app.use('/api/v1', v1Routes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
