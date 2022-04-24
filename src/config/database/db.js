require('dotenv').config();
const mongoose = require('mongoose');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;

const URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DATABASE}?authSource=admin`;

const DatabaseConnection =async (app) => {
    try {
        await mongoose.connect(URL, () => {
            console.log('Connected to database...');
            app.listen(process.env.APP_PORT, () => {
                console.log(`Application running on http://${process.env.APP_HOST}/${process.env.APP_PORT}`);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { DatabaseConnection };