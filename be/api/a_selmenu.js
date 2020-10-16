exports.data = function(req, res) {
        var menuData = new Array();
        var menu_h = new Object();

        console.log('Start a_selmanu!!');

        var query     = "SELECT (" ;
            query = query + "SELECT RTRIM(ID) id,lv,name, ";
            query = query + "CASE WHEN PATH IS NULL THEN '' ELSE PATH END AS path, ";
            query = query + "CASE WHEN ICON IS NULL THEN '' ELSE ICON END AS icon, ";
            query = query + "CASE WHEN P_ID IS NULL THEN '' ELSE RTRIM(P_ID) END AS p_id ";
            query = query + "FROM DASH_MENU ORDER BY ID FOR JSON PATH) AS menu ";


        return global.pool.request().query(query)
        .then(async result => {
            
            //var len = result.recordset.length;

            //for(var i=0; i<len; i++){
            //    menu_h = new Object();

            //    menu_h.id   = result.recordset[i].ID;
            //    menu_h.lv   = result.recordset[i].LV;
            //    menu_h.name = result.recordset[i].NAME;
            //    menu_h.path = result.recordset[i].PATH;
            //    menu_h.icon = result.recordset[i].ICON;
            //    menu_h.p_id = result.recordset[i].P_ID;

            //    menuData.push(menu_h);
            //}
            

            //res.json(menuData);
            res.send(result.recordset[0].menu);
            res.end();     
        });
};