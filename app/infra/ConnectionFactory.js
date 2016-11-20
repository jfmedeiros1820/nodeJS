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

    if(process.env.NODE_ENV == 'production'){
        var connectionUrl = process.env.CLEARDB_DATABASE_URL;
        var grupos = connectionUrl.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        return mysql.createConnection({
            host: 'us-cdbr-iron-east-04.cleardb.net',
            user: 'b875f2db0aed1b',
            password: 'c14e5de0',
            database: 'heroku_3a828c6cfe3f38e'
        });
    }
}

module.exports = function(){
    return createDBConnection;
}