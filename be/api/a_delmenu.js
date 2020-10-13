exports.data = function(req, res) {
    sql.close();
    sql.connect(config).then(async pool => {
        console.log('a_delmenu api !');
            
        await pool.request()
        .input('ID', req.body.id)
        .query('DELETE DASH_MENU WHERE ID=@ID')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
    });
};