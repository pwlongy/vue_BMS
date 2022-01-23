var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pengwei',
  database : 'students'
});

connection.connect( function(err){
  if(err){
    console.log("服务器连接失败")
    return
  }
  console.log("服务器连接成功")
});