const express = require('express');
const app = express();
const { DatabaseConnection } = require('./src/config/database/db');

const cors = require('cors');

/* Database connection */
DatabaseConnection(app);

/* Importing routes */
const { productRoutes } = require('./src/api/routes/product');

/* app middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* api routes */
app.use('/', productRoutes);