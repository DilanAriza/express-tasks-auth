const createError = require('http-errors');
const express = require('express');
const path = require('path');
const jwtMiddleware = require('express-jwt');
const logger = require('morgan');

const db = require('./configs/database');

const indexRouter = require('./routes/Routes.index');
const usersRouter = require('./routes/Routes.Users');
const sessionsRouter = require('./routes/Routes.Sessions');
const tasksRouter = require('./routes/Routes.Tasks');
const secrets = require('./configs/secrets');

db.connect();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    jwtMiddleware({
        secret: secrets.jwtSecret
    })
    .unless({
        path: [
            '/sessions',
            '/users/',
            '/users',
        ],
        method: 'GET'
    })
)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/tasks/', tasksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ 'Error: ': err });
});

module.exports = app;