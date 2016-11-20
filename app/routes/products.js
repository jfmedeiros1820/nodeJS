
module.exports = function(app) {
    app.get('/products', function(request, response, next) {
        var connection = app.infra.ConnectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.list(function(err, results) {
            if(err){
                return next(err);
            }
            response.format({
                html: function(){
                    response.render('products/list', {list: results});        
                },
                json: function(){
                    response.json(results);
                }
            });
        });
        connection.end();
    });

    app.get('/products/form', function(request, response){
        response.render('products/form', {
            validationErrors: {},
            product: {}
        });
    });

    app.post('/products', function(request, response){
        request.assert('title', 'Title is required').notEmpty();
        request.assert('price', 'Price has to be a number').isFloat();

        var product = request.body;

        var errors = request.validationErrors();
        if(errors){
            response.format({
                html: function(){
                    response.status(400).render('products/form', {
                        validationErrors: errors,
                        product: product
                    });
                },
                json: function(){
                    response.status(400).json(errors);
                }
            });
            
            return;
        }

        var connection = app.infra.ConnectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.save(product, function(err, results){
            response.redirect('products');
        })
    });
}