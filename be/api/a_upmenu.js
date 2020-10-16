exports.data = async function(req, res) {
        console.log('a_upmenu api !');
            
        await global.pool.request()
        .input('LV', req.body.lv)
        .input('NAME', req.body.name)
        .input('PATH', req.body.path)
        .input('ICON', req.body.icon)
        .input('P_ID', req.body.p_id)
        .input('ID', req.body.id)
        .query('UPDATE DASH_MENU SET LV=@LV, NAME=@NAME, PATH=@PATH, ICON=@ICON, P_ID=@P_ID WHERE ID=@ID')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
};