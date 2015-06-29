/*
 * GET article listing.
 */
exports.list = function(req, res){
  req.getConnection(function(err,connection){
     var consulta = 'select username, title, nombre, idarticle,location from user inner join article_has_categoria on article_has_categoria.article_user_iduser=user.iduser inner join article on article_has_categoria.article_idarticle=article.idarticle inner join categoria on article_has_categoria.categoria_idcategoria=categoria.idcategoria inner join region on article_has_categoria.article_region_idregion=region.idregion';  
     connection.query(consulta,function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('articulos/articulos',{title:"articulos",articulos:rows});
                           
         });
       
    });
  
};

/**
*GET article new
*/	
exports.add = function(req, res, next){
  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM region',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('articulos/add',{title:"Nuevo Articulo",region:rows});
                           
         });
       
    });
  //res.render('articulos/add',{title:"Nuevo Articulo"});
};

/**
*POST article save
*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        
        var article = {

            title:input.title,
            content:input.content,
            region:input.region,
            categoria:input.categoria
        };
        connection.query("INSERT INTO article VALUES (?,?,?,?,?)",[ ,article.title,article.content,article.user_iduser,article.region_idregion], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('articulos/articulos');
          
        });
    
    });
};


/**
* GET article view
*/
exports.view = function(req, res){
	
	var id = req.params.id;

  req.getConnection(function(err,connection){
     connection.query('SELECT * FROM article WHERE idarticle = ?',[id],function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('articulos/view',{title:"articulos",articulos:rows});
                           
         });
       
    });
  
};
