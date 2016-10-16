var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

var usercount = 0;
var userhashmap = {};                                   //stores client information
var port = process.env.PORT || 8080;                    //heroku port or default port 3000

app.get('/', function(req, res){                        //response handler
    res.sendFile(__dirname + '/index.html');            //default response
});
app.use('/assets', express.static('assets'));           //serve the assets folder
app.use('/js', express.static('js'));                   //serve the js folder
//404
app.use(function(req, res, next) {                      //404 response handler
    res.status(404).send('404: Sorry cant find that!'); //basic 404 response
});

http.listen(port, function(){                           //http serving
    console.log('listening on ' + port);
});