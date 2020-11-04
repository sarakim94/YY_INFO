exports.data = function(req, res) {
    
    var series = new Array();
    var tmp1 = new Object;
    tmp1.name = '입사자';
    tmp1.type = 'column';
    tmp1.data = new Array();
    var tmp2 = new Object;
    tmp2.name = '퇴사자';
    tmp2.type = 'column';
    tmp2.data = new Array();
    var tmp3 = new Object;
    tmp3.name = '총인원';
    tmp3.type = 'line';
    tmp3.data = new Array();
    

    return global.pool.request()
    .input('TYPE', 'M1')
    .execute('DASH_ATTRITION')
    .then(result => {        
        var len = result.recordset.length;

        for(var i=0; i<len; i++){
            tmp1.data.push(result.recordset[i].in_cnt);
            tmp2.data.push(result.recordset[i].out_cnt);
            tmp3.data.push(result.recordset[i].tot_cnt);
        }

        series.push(tmp1);
        series.push(tmp2);
        series.push(tmp3);

        res.json(series);
        res.end();      
    }); 
};