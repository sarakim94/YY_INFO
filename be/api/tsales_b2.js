exports.data = function(req, res) {
    var year = req.body.year;
    var month = req.body.month;

    var chart = new Object();
    chart.chartOptions = new Object();
    chart.chartOptions.chart = new Object();
    chart.chartOptions.chart.type = 'bar';
    chart.chartOptions.chart.stacked = true;
    chart.chartOptions.chart.stackType = '100%';
    chart.chartOptions.xaxis = new Object();
    chart.chartOptions.xaxis.categories = new Array();

    chart.series = new Array();
    var tmp = new Object();
    tmp.name = '수금금액';
    tmp.data = new Array();
    var tmp2 = new Object();
    tmp2.name = '미달성금액';
    tmp2.data = new Array();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'B2')
    .input('MONTH', month)
    .execute('DASH_TSALES')
    .then(result => {
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            chart.chartOptions.xaxis.categories.push(result.recordset[i].dept_nm);
            tmp.data.push(result.recordset[i].money);
            tmp2.data.push(result.recordset[i].remainder);
        }

        chart.series.push(tmp);
        chart.series.push(tmp2);

        res.json(chart);
        res.end();      
    }); 
};