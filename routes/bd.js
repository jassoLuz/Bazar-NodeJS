var mysql=require('mysql');

var conexion=mysql.createConnection({
    host:'us-cdbr-east-04.cleardb.com',
    user:'baec3702f459d5',
    password:'57597920',
    database:'heroku_10ff34f8473daa0',
    port:'3306'
});

conexion.connect(function (error){
    //console.log(error);

    if (error)
        console.log('Problemas de conexion con mysql');
    else
        console.log('se inicio conexion');
});


module.exports=conexion;