exports.data = function(req, res) {
    var year = req.body.year;

    var chart = new Object();
    chart.chartOptions = new Object();
    chart.chartOptions.legend = new Object();
    chart.chartOptions.legend.show = true;
    chart.chartOptions.legend.position = 'bottom';
    chart.chartOptions.plotOptions = new Object();
    chart.chartOptions.plotOptions.pie = new Object();
    chart.chartOptions.plotOptions.pie.donut = new Object();
    chart.chartOptions.plotOptions.pie.donut.lables = new Object();
    chart.chartOptions.plotOptions.pie.donut.lables.show = true;
    chart.chartOptions.plotOptions.pie.donut.lables.total = new Object();
    chart.chartOptions.plotOptions.pie.donut.lables.total.show = true;
    chart.chartOptions.plotOptions.pie.donut.lables.total.showAlways = false;
    chart.chartOptions.plotOptions.pie.donut.lables.total.label = 'Total';
    chart.chartOptions.plotOptions.pie.donut.lables.total.fontSize = '22px';
    chart.chartOptions.plotOptions.pie.donut.lables.total.fontFamily = 'Helvetica, Arial, sans-serif';
    chart.chartOptions.plotOptions.pie.donut.lables.total.fontWeight = 600;
    chart.chartOptions.plotOptions.pie.donut.lables.total.color = '#373d3f';
    chart.chartOptions.chart = new Object();
    chart.chartOptions.chart.type = 'donut';
    chart.chartOptions.labels = new Array();
    chart.chartOptions.fill = new Object();
    chart.chartOptions.fill.type = 'gradient';
    chart.series = new Array();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'D1')
    .execute('DASH_SALES')
    .then(result => {
        var len = result.recordset.length;

        for(var i=0; i<len; i++){
            chart.chartOptions.labels.push(result.recordset[i].dept_nm);
            chart.series.push(result.recordset[i].sales);
        }

        res.json(chart);
        res.end();      
    }); 
};