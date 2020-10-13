exports.data = async function(req, res) {
    sql.close();
    sql.connect(config).then(async pool => {
        console.log('a_setauth api !');

        var pgid = req.body.pgid;
        var users = req.body.users;
        var len = users.length;

        for(var i=0; i<len; i++){
            await pool.request()
            .input('EMP_CD', users[i])
            .input('PGID', pgid)
            .query("DELETE DASH_MENU_AUTH WHERE EMP_CD = RTRIM(@EMP_CD) AND PGID = @PGID ")
            .catch(err => {
                console.log(err.message);
            })

            await pool.request()
            .input('EMP_CD', users[i])
            .input('PGID', pgid)
            .query("INSERT INTO DASH_MENU_AUTH VALUES (RTRIM(@EMP_CD),@PGID,'U','SYSTEM',1,1,1,1,1,0)")
            .catch(err => {
                console.log(err.message);
            })
        }

        res.end();
    });    
};