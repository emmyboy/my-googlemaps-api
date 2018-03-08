var express = require('express');
var app = express();

// routes
app.use('/map', express.static('map'));
app.use('/api', require('./api/api.controller'));

// make '/map' default route
app.get('/', function (req, res) {
    return res.redirect('/map');
});

// start server
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
