module.exports = function(app) {

    app.get('/promotions/form', function(request, response){
        var connection = app.infra.ConnectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.list(function(err, results) {
            if(err){
                return next(err);
            }
            response.render('promotions/form', {list: results});
        });
        connection.end();
    });

    app.post('/promotions', function(request, response){
        var promotion = request.body;
        app.get('io').emit('newPromotion', promotion);
        response.redirect('promotions/form');
    });
}