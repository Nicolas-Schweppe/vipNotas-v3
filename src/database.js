const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
const pool = mysql.createPool(database);



pool.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La base de datos fue cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Base de datos contador de conexiones');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La conexion se rechazo');
        }
    }
    if(connection) connection.release();
    console.log('Base de datos conectada');
});

// convierte promesas
pool.query = promisify(pool.query);
// 
module.exports = pool;