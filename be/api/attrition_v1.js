exports.data = function(req, res) {
    var data = new Object();

    return global.pool.request()
    .input('TYPE', 'V1')
    .execute('DASH_ATTRITION')
    .then(result => {
        // DASHBOARD CARD DATA
        data.in_cnt = result.recordset[0].IN_CNT;
        data.in_per = result.recordset[0].IN_PER;
        data.out_cnt = result.recordset[0].OUT_CNT;
        data.out_per = result.recordset[0].OUT_PER;
        
        res.json(data);
        res.end();
    }); 
};