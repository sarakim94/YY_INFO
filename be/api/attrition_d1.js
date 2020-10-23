exports.data = function(req, res) {
    
    var data = new Array();
    
    return global.pool.request()
    .input('TYPE', 'D1')
    .execute('DASH_ATTRITION')
    .then(result => {
        // DASHBOARD CARD DATA
        data.push(result.recordset[0].cnt);
        data.push(result.recordset[1].cnt);
        data.push(result.recordset[2].cnt);
        data.push(result.recordset[3].cnt);

        res.json(data);
        res.end();
    }); 
};