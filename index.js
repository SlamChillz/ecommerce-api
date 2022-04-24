const express = require('express');
const app = express();
const { DatabaseConnection } = require('./src/config/database/db');

DatabaseConnection(app);