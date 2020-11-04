exports.data = function(req, res) {
    var object = new Object();
    object.series = new Array();

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
    
    object.chartOptions = new Object();
    object.chartOptions.chart = new Object();
    object.chartOptions.chart.type = 'line';
    object.chartOptions.colors = new Array();
    object.chartOptions.colors.push('#5C90FE');
    object.chartOptions.colors.push('#FE5C5C');
    object.chartOptions.colors.push('#00FF00');

    object.chartOptions.stroke = new Object();
    object.chartOptions.stroke.width = new Array();
    object.chartOptions.stroke.width.push(1);
    object.chartOptions.stroke.width.push(1);
    object.chartOptions.stroke.width.push(4);

    object.chartOptions.fill = new Object();
    object.chartOptions.fill.type = 'gradient';

    object.chartOptions.xaxis = new Object();
    object.chartOptions.xaxis.categories = new Array();

    object.chartOptions.yaxis = new Array();
    var y_tmp1 = new Object();
    y_tmp1.max = 200;
    y_tmp1.tickAmount = 5;
    y_tmp1.axisTicks = new Object();
    y_tmp1.axisTicks.show = true;
    var y_tmp2 = new Object();
    y_tmp2.max = 200;
    y_tmp2.tickAmount = 5;
    y_tmp2.opposite = true;
    y_tmp2.axisTicks = new Object();
    y_tmp2.axisTicks.show = false;
    var y_tmp3 = new Object();
    y_tmp3.tickAmount = 5;
    y_tmp3.opposite = true;
    y_tmp3.axisTicks = new Object();
    y_tmp3.axisTicks.show = true;
    object.chartOptions.yaxis.push(y_tmp1);
    object.chartOptions.yaxis.push(y_tmp2);
    object.chartOptions.yaxis.push(y_tmp3);

    object.chartOptions.legend = new Object();
    object.chartOptions.legend.show = true;
    object.chartOptions.legend.position = 'bottom';

    return global.pool.request()
    .input('TYPE', 'M1')
    .execute('DASH_ATTRITION')
    .then(result => {        
        var len = result.recordset.length;

        for(var i=0; i<len; i++){
            tmp1.data.push(result.recordset[i].in_cnt);
            tmp2.data.push(result.recordset[i].out_cnt);
            tmp3.data.push(result.recordset[i].tot_cnt);

            object.chartOptions.xaxis.categories.push(result.recordset[i].yyyy);
        }

        object.series.push(tmp1);
        object.series.push(tmp2);
        object.series.push(tmp3);

        res.json(object);
        res.end();      
    }); 
};