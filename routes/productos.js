var express = require('express');
var router = express.Router();

var bd=require('./bd');

router.get('/', function(req, res, next) {
    bd.query('SELECT IdProducto,descripcion,precio,existencia FROM productos', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('productos',{productos:results,page:"productos"});
    });
});


router.get('/getDatosProductos', function(req, res, next) {
    bd.query('SELECT IdProducto,descripcion,precio,existencia FROM productos', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.json(results);
    });
});

router.get('/datos', function(req, res, next) {

    bd.query('SELECT IdProducto,descripcion,precio,existencia FROM productos', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        var string=JSON.stringify(results);
	    var datos =  JSON.parse(string);
        res.render('productosestatic',{productos:datos,page:"datos"});
    });
  
});

router.get('/alta', function(req, res, next) {
    res.render('frmusuario',{page:"productos",ope:"c"});
});


router.get('/modificar/:id', function(req, res, next) {

	console.log(req.params.id);

	 bd.query('SELECT IdProducto,descripcion,precio,existencia FROM productos WHERE IdProducto = '+req.params.id+' ', function(error, results, fields){
        if (error) {            
            console.log('error en el listado');
            return;
           }
           console.log(results);
           
            var string=JSON.stringify(results);
	        console.log('>> string: ', string );
	        var json =  JSON.parse(string);

           res.render('frmusuario',{productos:json,page:"productos",ope:"u"});
        });       

});

router.get('/auth', function(req, res, next) {
    res.render('auth',{page:"auth",ope:"c"});
});
//alta,modificar,eliminar
router.post('/operacion', function(req, res, next) {
     
      var tipoOperacion = "";
      var descripcion ="";
      var precio=0;
      var existencia ="";

      var query = "";

      var IdProducto="";

      
      //console.log(req);
      tipoOperacion = req.body.ope;

     if (tipoOperacion == "c") {
      
      	//Ligar los datos con los campos
      	descripcion = req.body.descripcion;
      	precio = req.body.precio;
      	existencia = req.body.existencia;

        query = "INSERT INTO productos (descripcion,precio,existencia) VALUES('"+descripcion+"','"+precio+"',"+existencia+");";

     }else if(tipoOperacion == "u"){
     	descripcion = req.body.descripcion;
      	precio = req.body.precio;
      	existencia = req.body.existencia;
      	IdProducto = req.body.IdProducto;

        query = "UPDATE productos SET descripcion = '"+descripcion+"', precio = '"+precio+"', existencia="+existencia+" WHERE IdProducto = "+IdProducto+" ";
     }else if(tipoOperacion == "d"){

        IdProducto = req.body.IdProducto;
        query = "DELETE FROM productos WHERE IdProducto = "+IdProducto+" ";
     }
     //console.log("la consulta es: "+query);

      bd.query(query, function (error, results, fields){
          if (error){
              console.log(error);
              return res.send(error);
          }
         console.log(results);
        // console.log(results.affectedRows.toString());
        return res.send(results.affectedRows.toString());
      }); 

});

module.exports = router;