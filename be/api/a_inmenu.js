exports.data = async function(req, res) {
    sql.close();
    sql.connect(config).then(async pool => {
        console.log('a_inmenu api !');
            
        await pool.request()
        .input('ID', req.body.id)
        .input('LV', req.body.lv)
        .input('NAME', req.body.name)
        .input('PATH', req.body.path)
        .input('ICON', req.body.icon)
        .input('P_ID', req.body.p_id)
        .query('INSERT INTO DASH_MENU(ID,LV,NAME,PATH,ICON,P_ID) VALUES ( @ID, @LV, @NAME, @PATH, @ICON, @P_ID )')
        .then( res.end())
        .catch(err => {
            console.log(err.message);
        })
    });
};