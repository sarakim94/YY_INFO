exports.data = function(req, res) {
    var year = req.body.year;

    var data = new Object;
    data.chartOptions = new Object();
    data.series = new Array();

    var object1 = new Object();
    object1.name = '재고수량';
    object1.type = 'column';
    object1.data = new Array();

    var object2 = new Object();
    object2.name = '소모일수';
    object2.type = 'line';
    object2.data = new Array();

    data.chartOptions.chart = new Object();
    data.chartOptions.chart.height = 400;
    data.chartOptions.chart.type = 'line';

    data.chartOptions.fill = new Object();
    data.chartOptions.fill.type = 'gradient';

    data.chartOptions.stroke = new Object();
    data.chartOptions.stroke.width = new Array();
    data.chartOptions.stroke.width.push(0);
    data.chartOptions.stroke.width.push(4);

    data.chartOptions.dataLabels = new Object();
    data.chartOptions.dataLabels.enabled = true;
    data.chartOptions.dataLabels.enableOnSeries = new Array();
    data.chartOptions.dataLabels.enableOnSeries.push(1);

    data.chartOptions.labels = new Array();
    data.chartOptions.xaxis = new Object();
    data.chartOptions.yaxis = new Array();
    
    var tmp = new Object();
    tmp.title = new Object();
    tmp.title.text = '재고수량';
    data.chartOptions.yaxis.push(tmp);
    tmp = new Object();
    tmp.opposite = true;
    tmp.title = new Object();
    tmp.title.text = '소모일수';
    data.chartOptions.yaxis.push(tmp);
    
    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'M1')
    .execute('DASH_INDICATORS')
    .then(result => {
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            data.chartOptions.labels.push(result.recordset[i].item_nm + '[' + result.recordset[i].unit + ']' );
            object1.data.push(result.recordset[i].stor_qty);
            object2.data.push(result.recordset[i].somo);
        }

        data.series.push(object1);
        data.series.push(object2);

        res.json(data);
        res.end();      
    }); 
};