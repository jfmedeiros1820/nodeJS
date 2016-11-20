var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProductsController', function() {

    beforeEach(function(done){
        var conn = express.infra.ConnectionFactory();
        conn.query('delete from books', function(ex, result){
            if(!ex){
                done();
            }
        });
    });

    afterEach(function(done){
        var conn = express.infra.ConnectionFactory();
        conn.query('delete from books', function(ex, result){
            if(!ex){
                done();
            }
        });
    });

    it('#JSON list', function(done){
        request.get('/products')
            .set('Accept', 'application/json')
            .expect(200, done)
            .expect('Content-Type', /json/);
    });

    it('#Create new invalid product', function(done){
        request.post('/products')
            .send({title:'', description: 'new book'})
            .expect(400, done);
    });

    it('#Create new valid product', function(done){
        request.post('/products')
            .send({title:'New Book', description: 'new book', price: 34.70})
            .expect(302, done);
    });
});