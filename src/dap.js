// var createError = require('http-errors');
import createError from 'http-errors';
// var express = require('express');
import express from 'express';
// var path = require('path');
import path from 'path';
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import logger from 'morgan';
// var sassMiddleware = require('node-sass-middleware');
import sassMiddleware from 'node-sass-middleware';
import mongoose from 'mongoose';

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const dap = express();

// view engine setup
dap.set('views', path.join(__dirname, '../views'));
dap.set('view engine', 'pug');

dap.use(logger('dev'));
dap.use(express.json());
dap.use(express.urlencoded({ extended: false }));
dap.use(cookieParser());
dap.use(sassMiddleware({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
dap.use(express.static(path.join(__dirname, '../public')));

dap.use('/', indexRouter);
dap.use('/users', usersRouter);

// catch 404 and forward to error handler
dap.use(function(req, res, next) {
  next(createError(404));
});

// error handler
dap.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default dap;
