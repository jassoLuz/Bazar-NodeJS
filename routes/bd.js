var mysql=require('mysql');

function handleDisconnect() {
    var conexion=mysql.createConnection({
        host:'us-cdbr-east-04.cleardb.com',
        user:'baec3702f459d5',
        password:'57597920',
        database:'heroku_10ff34f8473daa0',
        port:'3306'
    });

    conexion.connect(function (error){
    if(error) {                                     
        console.log('error when connecting to db:', error);
        setTimeout(handleDisconnect, 2000); 
      }   
});
conexion.on('error', function(error) {
    console.log('db error', error);
    if(error.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw error;                              
    }
  });
  module.exports=conexion;
}

handleDisconnect();

