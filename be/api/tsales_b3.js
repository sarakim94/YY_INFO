exports.data = function(req, res) {
    var year = req.body.year;
    var month = req.body.month;

    var chart = new Object();
    chart.chartOptions = new Object();
    chart.chartOptions.chart = new Object();
    chart.chartOptions.chart.type = 'bar';
    chart.chartOptions.xaxis = new Object();
    chart.chartOptions.xaxis.categories = new Array();

    chart.series = new Array();
    var tmp = new Object();
    tmp.name = '콜 등록 수';
    tmp.data = new Array();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'B3')
    .input('MONTH', month)
    .execute('DASH_TSALES')
    .then(result => {
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            chart.chartOptions.xaxis.categories.push(result.recordset[i].dept_nm);
            tmp.data.push(result.recordset[i].call_cnt);
        }

        chart.series.push(tmp);

        res.json(chart);
        res.end();      
    }); 
};