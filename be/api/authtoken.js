exports.data = async function(req, res) {
        var data = new Object();

        const jwt = require('jsonwebtoken');
        const secret = 'yooyoung';
        var token = '';

        const id = req.body.username;
        const pw = req.body.password;
        
        console.log('GET ToKen API Start~');

        await global.pool.request()
        .input('ID', id)
        .input('PW', pw)
        .execute('DASH_LOGIN')
        .then(result => {
            if (result.recordset.length === 0) {
                res.status(401).json({ message: 'Bad credentials' })
            }
            else {
                token = jwt.sign(id,secret);
                data = new Object();
                data.key = token;
                data.user = result.recordset[0];
            }
        })
        .catch(err => {
            console.log(err.message)
        })
        
        await global.pool.request()
        .input('TOKEN', data.key)
        .query('SELECT * FROM DASH_TOKEN WHERE TOKEN = @TOKEN')
        .then(async result => {
            if(result.recordset.length === 0){
                console.log(data.key);
                await global.pool.request()
                .input('TOKEN', data.key)
                .input('ID', id)
                .query('INSERT INTO DASH_TOKEN(TOKEN,ID) VALUES ( @TOKEN, @ID)')
                .catch(err => {
                    console.log(err.message);
                })
            }
        })
        .catch(err => {
            console.log(err.message);
        })

        res.json(data);
        res.end();
};