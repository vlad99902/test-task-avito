const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mysql = require('mysql');

/**
 * Create connection to database
 * Write down your configurations
 */

db = mysql.createConnection({
    password: '',
    user: 'root',
    database: 'meetings_db',
    host: 'localhost',
    port: '3306'
})

/**
 * Server port
 */
var server = {
    port: 3000
};

const usersRouter = require('../routes/user');
const meetingsRouter = require('../routes/meeting')
const meetingsWithUsersRouter = require('../routes/meeting_with_user');

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/meetings', meetingsRouter);
app.use('/fullmeetings', meetingsWithUsersRouter);

/**
 * Run server
 */

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));