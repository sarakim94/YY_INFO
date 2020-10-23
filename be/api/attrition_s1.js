exports.data = function(req, res) {
    var series = new Array();
    var in_emp = new Object();
    var out_emp = new Object();
    var data;
    var d_temp;
    

    return global.pool.request()
    .input('TYPE', 'S1_IN')
    .execute('DASH_ATTRITION')
    .then(result => {
        // DASHBOARD CARD DATA
        var len1 = result.recordset.length;
        
        in_emp.name = '입사자';
        data = new Array();
        for(var i=0; i<len1; i++){
            d_temp = new Array();
            d_temp.push(result.recordset[i].PAY);
            d_temp.push(result.recordset[i].AGE);
            data.push(d_temp);
        }
        in_emp.data = data;

        global.pool.request()
            .input('TYPE', 'S1_OUT')
            .execute('DASH_ATTRITION')
            .then(result => {
            
            var len2 = result.recordset.length;
            
            out_emp.name = '퇴사자';
            data = new Array();
            for(var i=0; i<len2; i++){
                d_temp = new Array();
                d_temp.push(result.recordset[i].PAY);
                d_temp.push(result.recordset[i].AGE);
                data.push(d_temp);
            }
            out_emp.data = data;

            series.push(in_emp);
            series.push(out_emp);
            
            res.json(series);
            res.end();
        });
        
    }); 
};