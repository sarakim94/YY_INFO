exports.data = function(req, res) {
    var year = req.body.year;
    var result_data = new Object();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'C1')
    .execute('DASH_SALES')
    .then(result => {
        var len = result.recordset.length;
        
        result_data.sales = result.recordset[0].sales;
        result_data.s_ratio = result.recordset[0].s_ratio;
        result_data.money = result.recordset[0].money;
        result_data.m_ratio = result.recordset[0].m_ratio;

        res.json(result_data);
        res.end();      
    }); 
};