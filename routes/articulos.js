
exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM article',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('articulos',{title:"Articulos",articulos:rows});
                           
         });
       
    });
  
};