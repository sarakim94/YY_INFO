exports.data = function(req, res) {
    sql.close();
    sql.connect(config).then(pool => {
        var menuData = new Array();
        var item = new Object();
        var child = new Array();

        var query = '';

        query = "SELECT RTRIM(ID) ID,NAME,ICON FROM DASH_MENU WHERE LV = 0 ";
        
        var query2 = '';
        query2 = "SELECT RTRIM(ID) ID,NAME,ICON FROM DASH_MENU WHERE P_ID = @P_ID ";

        return pool.request()
        .query(query)
        .then(async result => {
            var len = result.recordset.length;

            for(var i=0; i<len; i++){
                item = new Object();

                item.id    = result.recordset[i].ID;
                item.text  = result.recordset[i].NAME;
                item.icon  = result.recordset[i].ICON;
                item.opened = true;
                item.selected = false;

                item.children = new Array();

                var id = result.recordset[i].ID;
                
                await pool.request()
                .input('P_ID', id)
                .query(query2)
                .then(result => {
                    var len2 = result.recordset.length;

                    for(var j=0; j<len2; j++){
                        var c_item = new Object();
                        
                        c_item.id    = result.recordset[j].ID;
                        c_item.text = result.recordset[j].NAME;
                        c_item.icon = 'ni ni-app';
                        item.selected = false;
                        item.children.push(c_item);
                    }
                })

                menuData.push(item);
            }

            res.json(menuData);
            res.end();     
        });
    });    
};