/**
* GET facturas add
*/
exports.add = function(req, res){
	
	var id = req.params.id;
	var cliente;
    
	req.getConnection(function(err,connection){  
     connection.query("SELECT * FROM Clientes WHERE idClientes= ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('facturas/add',{title:"Nueva Factura",cliente:rows});
                           
         });
                 
    });
  
};

/**
*POST facturas save
*/
exports.save = function(req,res){
    
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));

    console.log(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var factura= {

            fecha:input.fecha,
            Clientes_idClientes:id,
            tipo:input.tipo
        };
        
       connection.query("INSERT INTO Factura VALUES (?,?,?,?)",[ ,factura.fecha,factura.Clientes_idClientes,factura.tipo],function(err,rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
          
        });

        connection.query("SELECT MAX(idfactura) AS idfactura FROM Factura",function(err,rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
            connection.query("SELECT * FROM Factura WHERE idfactura = ?",[rows[0].idfactura],function(err,rows)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
           
            //res.render('facturas/detalle',{title:"detalle factura",factura:rows});
            
            connection.query("SELECT * FROM Producto",function(err,rows2)
          {
    
            if (err)
                console.log("Error inserting : %s ",err );
            
            var producto;
            res.render('facturas/detalle',{title:"detalle factura",factura:rows,producto:rows2});
            
          });

          });
          
        });   

        
    });
};

/**
* POST detalle factura
*/
exports.save_detalle = function(req,res){
    
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
    
    connection.query("SELECT precio FROM Producto WHERE idProducto = ?",[input.productos],function(err,rows)
          {
            if (err)
              console.log("Error inserting : %s ",err );
            var price = rows[0].precio;
          

      var monto = input.cantidad * price;
        
      var detalle = {

            cantidad:input.cantidad,
            total:monto,
            Factura_idfactura:id,
            Producto_idProducto:input.productos
        };
      connection.query("INSERT INTO Detalle VALUES (?,?,?,?,?)",[ ,detalle.cantidad,detalle.total,detalle.Factura_idfactura,detalle.Producto_idProducto], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
          
          res.render('facturas/detalle',{title:"detalle factura",factura:rows});
          
        });
      });    
    });
};