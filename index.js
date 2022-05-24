const express = require('express');
const app = express();
const { DatabaseConnection } = require('./src/config/database/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { invalidRoutes, errorHandler } = require('./src/api/middlewares/errorhandlers/error');

/* Database connection */
DatabaseConnection(app);

/* app middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


/* Importing routes */
const { productRoutes } = require('./src/api/routes/product');
const { userRoutes } = require('./src/api/routes/user');

/* api routes */
app.use('/', productRoutes);
app.use('/', userRoutes);

/* Handler for invalid urls */
app.use(invalidRoutes);
/* General error handler*/
app.use(errorHandler);