function ProductsDAO(connection){
    this._connection = connection;
}

ProductsDAO.prototype.list = function(callback){
    this._connection.query('SELECT * FROM books', callback);
}

ProductsDAO.prototype.save = function(product, callback){
    this._connection.query('INSERT INTO books SET ?', product, callback);
}

module.exports = function(connection, callback){
    return ProductsDAO;
}