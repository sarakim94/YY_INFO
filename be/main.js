var express     = require('express');
var bodyParser  = require('body-parser');               // POST 방식 전송을 위해 사용
var app         = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [Server Config]
global.sql = require('mssql');
global.config = require('./config.json');

// [CORS 허용 설정]
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// [ROUTER SET]
const apiRouter = express.Router();
app.use('/api', apiRouter);

sql.connect(config).then(pool => {
    global.pool = pool;
    var a_authuser  = require('./api/a_authuser');
    var a_delauth   = require('./api/a_delauth');
    var a_delmenu   = require('./api/a_delmenu');
    var a_inmenu    = require('./api/a_inmenu');
    var a_selmenu   = require('./api/a_selmenu');
    var a_setauth   = require('./api/a_setauth');
    var a_upmenu    = require('./api/a_upmenu');
    var authtoken   = require('./api/authtoken');
    var dashmenu    = require('./api/dashmenu');
    var getmenu     = require('./api/getmenu');
    var getmenutree = require('./api/getmenutree');
    var getuserlist = require('./api/getuserlist');
    var profile     = require('./api/profile');


    apiRouter.get('/a_authuser/:id', a_authuser.data);
    apiRouter.post('/a_delauth', a_delauth.data);
    apiRouter.post('/a_delmenu', a_delmenu.data);
    apiRouter.post('/a_inmenu', a_inmenu.data);
    apiRouter.get('/a_selmenu', a_selmenu.data);
    apiRouter.post('/a_setauth', a_setauth.data);
    apiRouter.post('/a_upmenu', a_upmenu.data);
    apiRouter.post('/members/auth-token', authtoken.data);
    apiRouter.get('/dashmenu/:type', dashmenu.data);
    apiRouter.get('/getmenu/:id', getmenu.data);
    apiRouter.get('/getMenutree', getmenutree.data);
    apiRouter.get('/getuserlist', getuserlist.data);
    apiRouter.get('/members/profile', profile.data);
});
//var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
