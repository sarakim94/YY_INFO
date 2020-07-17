var express     = require('express');
var bodyParser  = require('body-parser');               // POST 방식 전송을 위해 사용
var app         = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [Server Config]
global.sql = require('mssql');
global.config = {
user: 'sa',
password: 'sfaadmin',
server: '192.168.0.14',
database: 'mdb',
charset: 'utf8mb4'
};

// [CORS 허용 설정]
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// [ROUTER SET]
var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
