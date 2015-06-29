var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//--Creo laconeccion con la base de datos------
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nerv2309',
  database : 'db_BlogNoticias'
});
//---------------------------------------------

var routes = require('./routes/index');
var users = require('./routes/users');
var articulos = require('./routes/articulos');

var app = express();

//---------realizo la coneccion con la base de datos----
connection.connect(function(err){
if(!err) {
    console.log("Coneccion establecida con la db_blogNoticias ... \n\n");
} else {
    console.log("Error connecting database ... \n\n");
}
});
//------------------------------------------------------


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/articulos', articulos.list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// app.get("/",function(req,res){
// connection.query('SELECT * from categoria', function(err, rows, fields) {
// connection.end();
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
//   });
// });


module.exports = app;
