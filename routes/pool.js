var mysql=require('mysql')
var pool=mysql.createPool(
    {host:"localhost",
    port:3306,
    user:'root',
    password:'1234',
    database:'resume_builder',
    connectionLimit:100,
    multipleStatements:true,
    timezone:'Asia/Kolkata'
}
)
module.exports=pool