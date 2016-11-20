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
            host:grupos[3],
            user:grupos[1],
            password:grupos[2],
            database:grupos[4]
        });
    }
}

module.exports = function(){
    return createDBConnection;
}