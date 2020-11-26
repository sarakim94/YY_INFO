exports.data = function(req, res) {
    var year = req.body.year;
    var result_data = new Object();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'CC1')
    .execute('DASH_SALES')
    .then(result => {
        var len = result.recordset.length;
        
        result_data.sales = new Array();
        result_data.sales.push(result.recordset[0].sales);
        result_data.money = new Array();
        result_data.money.push(result.recordset[0].money);

        res.json(result_data);
        res.end();      
    }); 
};