exports.data = function(req, res) {
        var year = req.body.year;
        var series = new Array();
        var tmp = new Object;
        tmp.name = '재고금액';
        tmp.data = new Array();
        

        return global.pool.request()
        .input('YYYY', year)
        .input('TYPE', 'B3')
        .execute('DASH_INDICATORS')
        .then(result => {        
            var len = result.recordset.length;

            for(var i=0; i<len; i++){
                tmp.data.push(result.recordset[i].amt);
            }

            series.push(tmp);
            res.json(series);
            res.end();      
        }); 
};