exports.data = function(req, res) {
        var year = req.body.year;
        var series = new Array();
        var tmp = new Object;
        tmp.name = '생산금액';
        tmp.data = new Array();
        series.push(tmp);

        return global.pool.request()
        .input('YYYY', year)
        .input('TYPE', 'B2')
        .execute('DASH_INDICATORS')
        .then(result => {        
            if(result.recordset[0].M01 != 0){
                tmp.data.push(result.recordset[0].M01);
            }
            if(result.recordset[0].M02 != 0){
                tmp.data.push(result.recordset[0].M02);
            }
            if(result.recordset[0].M03 != 0){
                tmp.data.push(result.recordset[0].M03);
            }
            if(result.recordset[0].M04 != 0){
                tmp.data.push(result.recordset[0].M04);
            }
            if(result.recordset[0].M05 != 0){
                tmp.data.push(result.recordset[0].M05);
            }
            if(result.recordset[0].M06 != 0){
                tmp.data.push(result.recordset[0].M06);
            }
            if(result.recordset[0].M07 != 0){
                tmp.data.push(result.recordset[0].M07);
            }
            if(result.recordset[0].M08 != 0){
                tmp.data.push(result.recordset[0].M08);
            }
            if(result.recordset[0].M09 != 0){
                tmp.data.push(result.recordset[0].M09);
            }
            if(result.recordset[0].M10 != 0){
                tmp.data.push(result.recordset[0].M10);
            }
            if(result.recordset[0].M11 != 0){
                tmp.data.push(result.recordset[0].M11);
            }
            if(result.recordset[0].M12 != 0){
                tmp.data.push(result.recordset[0].M12);
            }

            res.json(series);
            res.end();      
        }); 
};