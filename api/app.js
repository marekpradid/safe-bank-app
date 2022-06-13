// module-alias see package.json - _moduleAliases
require('better-module-alias')(__dirname);
// dotenv - .env config
const CONFIG = require('$config/config');

// Mongoose
require('$db/mongoose');

//Others
const chalk = require('chalk');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

// Utilities
const createDummyData = require('$util/create-dummy-data');

// Routers
const authRouter = require('$routers/authRouter');
const commonRouter = require('$routers/commonRouter');
const usersRouter = require('$routers/usersRouter');
const accountsRouter = require('$routers/accountsRouter');
const cardRouter = require('$routers/cardsRouter');
const messageRouter = require('$routers/messagesRouter');
const transferRouter = require('$routers/transfersRouter');
const formsRouter = require('$routers/formsRouter');
const statsRouter = require('$routers/statsRouter');

// Middlewares
const auth = require('$middleware/auth');
const errorHandler = require('$middleware/error-handler');

// App
const express = require('express');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// CORS
app.use(cors());

// routes
// No auth required routes
app.use('/auth', authRouter);
app.use('/common', commonRouter);

// Verify JWT and add user data to next requests
app.use(auth);

// Auth routes
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/cards', cardRouter);
app.use('/messages', messageRouter);
app.use('/transfers', transferRouter);
app.use('/forms', formsRouter);
app.use('/stats', statsRouter);

// Handle errors only in development
if (process.env.CURRENT_ENV === 'development') {
    app.use(errorHandler);
} else {
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Server Error');
    });
}

// Start the app
app.listen(CONFIG.port, async () => {
    console.log(
        '%s App is running at http://localhost:%d in %s mode',
        chalk.green('✓'),
        CONFIG.port,
        CONFIG.current_env
    );

    await createDummyData();

    console.log('  Press CTRL-C to stop\n');
});
console.log("Ahoj !!!");