exports.data = function(req, res) {
    var type = req.body.type;
    var categories = new Array();
    var in_data = new Array();
    var out_data = new Array();
    var series = new Array();

    var obj_tmp;

    var chart = new Object();
        
    return global.pool.request()
    .input('TYPE', 'B2_' + type)
    .execute('DASH_ATTRITION')
    .then(result => {
        var len = result.recordset.length;

        chart.chartOptions = new Object();
        chart.chartOptions.colors = new Array();
        chart.chartOptions.colors.push('#48C278');
        chart.chartOptions.colors.push('#FF4646');

        chart.chartOptions.chart = new Object();
        chart.chartOptions.chart.type = 'bar';
        
        chart.chartOptions.stroke = new Object();
        chart.chartOptions.stroke.width = new Array();
        chart.chartOptions.stroke.width.push(1);
        chart.chartOptions.stroke.width.push(1);
        chart.chartOptions.stroke.width.push(4);

        chart.chartOptions.plotOptions = new Object();
        chart.chartOptions.plotOptions.bar = new Object();
        chart.chartOptions.plotOptions.bar.horizontal = false;
        chart.chartOptions.plotOptions.bar.columnWidth = '50%';
        chart.chartOptions.plotOptions.bar.endingShape = 'rounded';

        chart.chartOptions.dataLabels = new Object();
        chart.chartOptions.dataLabels.enabled = false;

        chart.chartOptions.xaxis = new Object();
        chart.chartOptions.xaxis.categories = new Array();
        
        for(var i=0; i<len; i++){
            chart.chartOptions.xaxis.categories.push(result.recordset[i].DEPT_NM);
            in_data.push(result.recordset[i].IN_EMP);
            out_data.push(result.recordset[i].OUT_EMP);
        }
        obj_tmp = new Object();
        obj_tmp.name = '입사자';
        obj_tmp.data = in_data;
        series.push(obj_tmp);
        
        obj_tmp = new Object();
        obj_tmp.name = '퇴사자';
        obj_tmp.data = out_data;
        series.push(obj_tmp);

        chart.series = series;
        
        res.json(chart);
        res.end();      
    }); 
};