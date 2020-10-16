exports.data = async function(req, res) {
        console.log('a_delauth api !');
                
        await global.pool.request()
        .input('EMP_CD', req.body.emp_cd)
        .input('PGID', req.body.pgid)
        .query('DELETE DASH_MENU_AUTH WHERE EMP_CD = @EMP_CD AND PGID = @PGID ')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
};