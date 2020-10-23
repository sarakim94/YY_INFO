exports.data = function(req, res) {
    var data = new Array();

    return global.pool.request()
    .input('TYPE', 'P1')
    .execute('DASH_ATTRITION')
    .then(result => {
        // DASHBOARD CARD DATA
        data.push(result.recordset[0].MALE);
        data.push(result.recordset[0].FEMALE);

        res.json(data);
        res.end();
    }); 
};