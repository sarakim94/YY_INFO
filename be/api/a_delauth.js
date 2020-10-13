exports.data = function(req, res) {
    sql.close();
    sql.connect(config).then(async pool => {
        console.log('a_delauth api !');
                
        await pool.request()
        .input('EMP_CD', req.body.emp_cd)
        .input('PGID', req.body.pgid)
        .query('DELETE DASH_MENU_AUTH WHERE EMP_CD = @EMP_CD AND PGID = @PGID ')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
    });
};