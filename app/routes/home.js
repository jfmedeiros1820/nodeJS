module.exports = function(app){

    app.get('/', function(request, response, next){
        var connection = app.infra.ConnectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.list(function(err, results) {
            if(err){
                return next(err);
            }
            response.render('home/index', {books: results});
        });
        connection.end();
    });
}