/*
 * GET clientes listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM Clientes',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('clientes/clientes',{title:"clientes",clientes:rows});
                           
         });
       
    });
  
};

/**
*GET clientes new
*/	
exports.add = function(req, res, next){
  res.render('clientes/add',{title:"Nuevo Clientes"});
};

/**
*POST clientes save
*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var cliente = {

            nombre:input.nombre,
            apellido:input.apellido,
            doc:input.doc,
            direccion:input.direccion,
            telefono:input.telefono,
            email:input.email
        };
        connection.query("INSERT INTO Clientes VALUES (?,?,?,?,?,?,?)",[ ,cliente.nombre,cliente.apellido,cliente.doc,cliente.direccion,cliente.telefono,cliente.email], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('../');
          
        });    
    });
};


/**
* GET clientes edit
*/
exports.edit = function(req, res){
    
  var id = req.params.id;
    
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM Clientes WHERE idClientes = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('clientes/edit',{title:"Editar Cliente",cliente:rows});
                           
         });
                 
    });
};

/**
* POST clientes save edit
*/
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var cliente = {
            
            nombre:input.nombre,
            apellido:input.apellido,
            doc:input.doc,
            direccion:input.direccion,
            telefono:input.telefono,
            email:input.email
        
        };
        
        connection.query("UPDATE Clientes SET ? WHERE idClientes = ? ",[cliente,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('../');
          
        });
    
    });
};