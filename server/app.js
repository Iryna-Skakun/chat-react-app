var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server;

app.use(express.static(path.join(__dirname, 'public')));

var wss = new WebSocketServer({server: server});
var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort(function (a, b) {
    return Math.random() > 0.5;
});
var clients = [];

wss.on('connection', function (ws) {
    clients.push(Object.assign(ws, {userID: Date.now()}));
    var userName = false;
    var userColor = false;
    ws.on('message', function (msg) {
        if (!userName) {
            userName = msg;
            userColor = colors.shift();

            for (var i = 0; i < clients.length; i++) {
                clients[i].send(JSON.stringify({type: 'connected_new_user', userID: ws.userID, userName}));
            }

            console.log(userName + ' login');
        } else {
            console.log(userName + ' say: ' + msg);
            var obj = {
                time: new Date(),
                text: msg,
                author: userName,
                color: userColor
            };
            var json = JSON.stringify({type: 'message', data: obj});
            for (var i = 0; i < clients.length; i++) {
                clients[i].send(json);
            }
        }
    });
    ws.on('close', function () {
        var index = clients.indexOf(ws);

        clients.splice(index, 1);
        if (userName !== false && userColor != false) {
            colors.push(userColor);
        }

        var json = JSON.stringify({type: 'disconnected_user', userID: ws.userID});
        for (var i = 0; i < clients.length; i++) {
            clients[i].send(json);
        }

    });
    ws.on('error', function () {
        ws.terminate();
    });
});


app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.get('/', function (req, res) {
    res.sendfile('views/chat.html');
});

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


module.exports = app;