const CONFIG = require('$config/config');
const chalk = require('chalk');
const mongoose = require('mongoose').set(
    'debug',
    CONFIG.current_env === 'development'
);

mongoose.connect(CONFIG.mongodb_uri);

mongoose.connection.on('error', err => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
