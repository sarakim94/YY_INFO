exports.data = function(req, res) {
        var salesData = new Object();
        var series = new Array();
        var serie = new Object();
        var data = new Array();
        var tableData = new Array();
    
        return global.pool.request()
        .input('TYPE', req.params.type)
        .execute('DASH_TOTBOARD')
        .then(result => {
            // DASHBOARD CARD DATA
            var type = req.params.type;
            salesData.mon_sales = result.recordset[0].mon_sales;
            salesData.mon_sales_up = result.recordset[0].mon_sales_up;
            salesData.mon_goal_sales = result.recordset[0].mon_goal_sales;
            salesData.mon_goal_rate = result.recordset[0].mon_goal_rate;
            salesData.year_sales = result.recordset[0].year_sales;
            salesData.year_sales_up = result.recordset[0].year_sales_up;
            salesData.year_goal_sales = result.recordset[0].year_goal_sales;
            salesData.year_goal_rate = result.recordset[0].year_goal_rate;

            global.pool.request()
            .input('TYPE', type)
            .execute('DASH_TOTSALES')
            .then(result => {
                // DASHBOARD GRAPH DATA
                var len = result.recordset.length;

                serie.name = 'Goal';
                serie.type = 'column';
                for(var i=0; i<len; i++){
                    data.push(result.recordset[i].Goal);
                }
                serie.data = data;
                series.push(serie);

                serie = new Object();
                serie.name = 'Sales';
                serie.type = 'column';
                data = new Array();
                for(var i=0; i<len; i++){
                    data.push(result.recordset[i].Sales);
                }
                serie.data = data;
                series.push(serie);

                serie = new Object();
                serie.name = 'SalesFlow';
                serie.type = 'line';
                data = new Array();
                for(var i=0; i<len; i++){
                    data.push(result.recordset[i].SalesFlow);
                }
                serie.data = data;
                series.push(serie);

                salesData.series = series;

                // DASHBOARD TABLE DATA

                for(var i=0; i<len; i++){
                    data = new Object();
                    data.id = i+1;
                    data.name = (i+1).toString() + '월';
                    data.goal = result.recordset[i].Goal;
                    data.sales = result.recordset[i].Sales;
                    
                    if (result.recordset[i].SalesFlow >= 100){
                        data.status = 'complete';
                        data.statusType = 'success';
                        data.completion = 100;
                    }
                    else{
                        data.status = 'fail';
                        data.statusType = 'warning';
                        data.completion = result.recordset[i].SalesFlow;
                    }
                    
                    
                    tableData.push(data);
                }

                salesData.table = tableData;

                console.log(salesData);
                res.json(salesData);
                res.end();
            });    
        }); 
};