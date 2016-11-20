var mysql = require('mysql');

function createDBConnection(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'products_nodejs'
        });
    }
    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'products_nodejs_test'
        });
    }
}

module.exports = function(){
    return createDBConnection;
}