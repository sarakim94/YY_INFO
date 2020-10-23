exports.data = function(req, res) {
    var data = new Array();
    var series = new Array();
    var obj = new Object();
    
    return global.pool.request()
    .input('TYPE', 'B1')
    .execute('DASH_ATTRITION')
    .then(result => {
        // DASHBOARD CARD DATA
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            data.push(result.recordset[i].CNT);
        }
        
        obj.name = '퇴사자수';
        obj.data = data;

        series.push(obj);

        res.json(series);
        res.end();      
    }); 
};