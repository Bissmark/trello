const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
// const mongoStore = require('connect-mongo');
const passport = require('passport');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const app = express();

// const corsOpts = {
//     origin: '*',
//     credentials: true
// };
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // store: mongoStore.create({ 
    //     mongoUrl: process.env.DATABASE_URL 
    // })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/lists', require('./routes/lists'));
app.use('/cards', require('./routes/cards'));
app.use('/boards', require('./routes/boards'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express running on http://localhost:${ port }`);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
