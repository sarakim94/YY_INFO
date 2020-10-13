exports.data = function(req, res) {
    sql.close();
    sql.connect(config).then(async pool => {
        var data = new Object();

        const jwt = require('jsonwebtoken');
        const secret = 'yooyoung';
        var token = '';

        const id = req.body.username;
        const pw = req.body.password;
        
        console.log('GET ToKen API Start~');
        // 관리자인 경우 
        if (id === 'admin') {
            if(pw === '@yoo6114'){
                token = jwt.sign(id,secret);
            
                data = new Object();
                data = { 
                    key: token,
                    user: {
                        emp_cd: 'admin', emp_nm: '시스템관리자', dept_cd: '10050000', dept_nm: '전산팀'	
                    }
                }
            }
            else{
                // 관리자 PW가 틀렸을 경우
                return res.status(401).json({ message: 'Bad credentials' })
            }
        }
        // 일반 사용자인 경우
        else{
            await pool.request()
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
        }
        
        
        await pool.request()
        .input('TOKEN', data.key)
        .query('SELECT * FROM DASH_TOKEN WHERE TOKEN = @TOKEN')
        .then(async result => {
            if(result.recordset.length === 0){
                await pool.request()
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
    });
};