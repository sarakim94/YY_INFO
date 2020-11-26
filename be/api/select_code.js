exports.data = function(req, res) {
    var code = req.body.type;

    var tmp;
    var selectOptions = new Array();
    return global.pool.request()
    .input('TYPE', code)
    .execute('DASH_SELECT_CODE')
    .then(result => {
        var len = result.recordset.length;
        
        for(var i=0; i<len; i++){
            tmp = new Object();
            tmp.label = result.recordset[i].DEPT_NM;
            tmp.value = result.recordset[i].DEPT_CD;
            selectOptions.push(tmp);
        }

        res.json(selectOptions);
        res.end();      
    }); 
};