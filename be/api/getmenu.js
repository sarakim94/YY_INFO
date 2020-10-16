exports.data = function(req, res) {
        var id = req.params.id;
        var menuData = new Array();
        var menu = new Object();
        var menu_h = new Object();
        var menu_d_temp = new Object();

        var query = '';

        if(id === 'admin'){
            query = 'SELECT A.NAME AS NAME, A.PATH AS PATH FROM DASH_MENU A LEFT JOIN DASH_MENU_AUTH B ON A.ID = B.PGID WHERE A.P_ID = @PGID GROUP BY A.ID,A.NAME,A.PATH';
        }
        else{
            query = 'SELECT A.NAME AS NAME, A.PATH AS PATH FROM DASH_MENU A LEFT JOIN DASH_MENU_AUTH B ON A.ID = B.PGID WHERE A.P_ID = @PGID AND B.EMP_CD = @EMP_CD';
        }
        
        console.log('GET MENU API Start~');

        return global.pool.request()
        .query('SELECT ID,NAME,ICON FROM DASH_MENU WHERE LV = 0 ORDER BY ID')
        .then(async result => {
            var len = result.recordset.length;

            for(var i=0; i<len; i++){
                menu = new Object();
                menu_h = new Object();
                

                menu_h.name = result.recordset[i].NAME;
                menu_h.icon = result.recordset[i].ICON;

                menu.header = new Object();
                menu.header = menu_h;

                menu.detail = new Array();
                
                var pgid = result.recordset[i].ID;
                await global.pool.request()
                .input('EMP_CD', id)
                .input('PGID', pgid)
                .query(query)
                .then(result => {
                    
                    
                    var len2 = result.recordset.length;
                    
                    for(var j=0; j<len2; j++){
                        menu_d_temp = new Object();
                        menu_d_temp.name = result.recordset[j].NAME;
                        menu_d_temp.path = result.recordset[j].PATH;
                        menu.detail.push(menu_d_temp)
                    }
                    menuData.push(menu);
                })
            }
            
            console.log(menuData);

            res.json(menuData);
            res.end();     
        });
};