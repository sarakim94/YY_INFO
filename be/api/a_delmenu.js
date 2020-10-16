exports.data = async function(req, res) {
        console.log('a_delmenu api !');
            
        await global.pool.request()
        .input('ID', req.body.id)
        .query('DELETE DASH_MENU WHERE ID=@ID')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
};