exports.data = function(req, res) {
    var year = req.body.year;
    var dept = req.body.dept;

    var chart = new Object();
    chart.chartOptions = new Object();
    chart.chartOptions.chart = new Object();
    chart.chartOptions.chart.type = 'line';
    chart.chartOptions.stroke = new Object();
    chart.chartOptions.stroke.width = 7;
    chart.chartOptions.stroke.curve = 'smooth';
    chart.chartOptions.xaxis = new Object();
    chart.chartOptions.xaxis.categories = new Array();
    chart.chartOptions.fill = new Object();
    chart.chartOptions.fill.type = 'gradient';
    chart.chartOptions.fill.gradient = new Object();
    chart.chartOptions.fill.gradient.shade = 'dark';
    chart.chartOptions.fill.gradient.gradientToColors = new Array();
    chart.chartOptions.fill.gradient.gradientToColors.push('#FDD835');
    chart.chartOptions.fill.gradient.shadeIntensity = 1;
    chart.chartOptions.fill.gradient.type = 'horizontal';
    chart.chartOptions.fill.gradient.opacityFrom = 1;
    chart.chartOptions.fill.gradient.opacityTo = 1;
    chart.chartOptions.fill.gradient.stops = new Array();
    chart.chartOptions.fill.gradient.stops.push(0);
    chart.chartOptions.fill.gradient.stops.push(100);
    chart.chartOptions.fill.gradient.stops.push(100);
    chart.chartOptions.fill.gradient.stops.push(100);
    chart.chartOptions.markers = new Object();
    chart.chartOptions.markers.size = 4;
    chart.chartOptions.markers.colors = new Array();
    chart.chartOptions.markers.colors.push('#FFA41B');
    chart.chartOptions.markers.strokeColors = "#fff";
    chart.chartOptions.markers.storkeWidth = 2;
    chart.chartOptions.markers.hover = new Object();
    chart.chartOptions.markers.hover.size = 7;
    chart.chartOptions.yaxis = new Object();
    chart.chartOptions.yaxis.title = new Object();
    chart.chartOptions.yaxis.title.text = '매출 금액';

    chart.series = new Array();
    var tmp = new Object();
    tmp.name = '매출실적';
    tmp.data = new Array();

    return global.pool.request()
    .input('YYYY', year)
    .input('TYPE', 'L1')
    .input('DEPT', dept)
    .execute('DASH_SALES')
    .then(result => {
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            chart.chartOptions.xaxis.categories.push(result.recordset[i].year);
            tmp.data.push(result.recordset[i].sales);
        }

        chart.series.push(tmp);

        res.json(chart);
        res.end();      
    }); 
};