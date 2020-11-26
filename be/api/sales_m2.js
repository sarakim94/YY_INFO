exports.data = function(req, res) {
    var year = req.body.year;
    var dept = req.body.dept;

    var series = new Array();
    var tmp1 = new Object();
    var tmp2 = new Object();
    var tmp3 = new Object();

    tmp1.name = '목표';
    tmp1.type = 'column';
    tmp1.data = new Array();
    tmp2.name = '수금';
    tmp2.type = 'column';
    tmp2.data = new Array();
    tmp3.name = '달성율';
    tmp3.type = 'line';
    tmp3.data = new Array();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'M2')
    .input('DEPT', dept)
    .execute('DASH_SALES')
    .then(result => {
        var len = result.recordset.length;

        for(var i=0; i<len; i++){
            tmp1.data.push(result.recordset[i].montar);
            tmp2.data.push(result.recordset[i].money);
            tmp3.data.push(result.recordset[i].monratio);
        }

        series.push(tmp1);
        series.push(tmp2);
        series.push(tmp3);
        
        res.json(series);
        res.end();      
    }); 
};