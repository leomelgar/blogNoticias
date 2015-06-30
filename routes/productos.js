/*
 * GET productos listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
     // var consulta = 'select username, title, nombre, idarticle,location from user inner join article_has_categoria on article_has_categoria.article_user_iduser=user.iduser inner join article on article_has_categoria.article_idarticle=article.idarticle inner join categoria on article_has_categoria.categoria_idcategoria=categoria.idcategoria inner join region on article_has_categoria.article_region_idregion=region.idregion';  
     connection.query('SELECT * FROM Producto',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('productos/productos',{title:"productos",productos:rows});
                           
         });
       
    });
  
};

/**
*GET producto new
*/	
exports.add = function(req, res, next){
  res.render('productos/add',{title:"Nuevo Producto"});
};

/**
*POST producto save
*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var producto = {

            nombre:input.nombre,
            precio:input.precio,
            proveedor:input.proveedor,
            descripcion:input.descripcion
        };
        connection.query("INSERT INTO Producto VALUES (?,?,?,?,?)",[ ,producto.nombre,producto.precio,producto.proveedor,producto.descripcion], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('../');
          
        });
    
    });
};


/**
* GET producto view
*/
exports.view = function(req, res){
	
	var id = req.params.id;

  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM Producto WHERE idProducto = ?',[id],function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('productos/view',{title:"productos",productos:rows});
                           
         });
       
    });
  
};
