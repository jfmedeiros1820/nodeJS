var http = require('http');

var config = {
    hostname: 'localhost',
    port: 3000,
    path: '/products',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var product = {
    title: 'Book of Post',
    description: 'Description of the post',
    price: 32.89
}

var client = http.request(config, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Body ' + body);
    });
})

client.end(JSON.stringify(product));