var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connection = require('express-myconnection');
var mysql = require('mysql');


var routes = require('./routes/index');
var users = require('./routes/users');
var producto = require('./routes/productos'); //creo un objeto producto que utliza los metodos de pacientes.js
var cliente = require('./routes/clientes'); //creo un objeto cliente que utliza los metodos de clientes.js
var factura = require('./routes/facturas'); //creo un objeto factura que utliza los metodos de facturas.js

var app = express();

//--Creo laconeccion con la base de datos------
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'nerv2309',
        //port : 3306,//port mysql
        database:'db_marketPlace'
    },'request')
);


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

//routes access
app.use('/', routes);
app.use('/users', users);

//----------------------------rutas para producto---------------------------------------
app.get('/productos', producto.list); //lista los productos
app.get('/productos/add', producto.add); //crear producto
app.post('/productos/add', producto.save); //guardar el producto creado anteriormente
app.get('/productos/view/:id', producto.view); //ver detalle de producto
//--------------------------------------------------------------------------------------

//----------------------------rutas para clientes---------------------------------------
app.get('/clientes', cliente.list); //lista los clientes
app.get('/clientes/add', cliente.add); //crear cliente
app.post('/clientes/add', cliente.save); //guardar el cliente creado anteriormente
app.get('/clientes/edit/:id', cliente.edit); //editar datos del cliente
app.post('/clientes/edit/:id',cliente.save_edit); // guarda los cambios editados del cliente
//--------------------------------------------------------------------------------------

//----------------------------rutas para Facturas---------------------------------------
app.get('/facturas/add/:id', factura.add); //realiza una nueva factura para un cliente
app.post('/facturas/add/:id', factura.save); //guarda la factura para un cliente 
app.post('/facturas/detalle/:id');
app.post('/facturas/detalle/:id', factura.save_detalle); //guardo el detalle de una factura cuando se compra un producto
//--------------------------------------------------------------------------------------

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


module.exports = app;