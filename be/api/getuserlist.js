exports.data = function(req, res) {
        var userList = new Array();
        var item = new Object();
        var child = new Array();

        var query = '';

        query = "SELECT A.DEPT_CD, A.DEPT_NM FROM ( ";
        query = query + 'SELECT A.DEPT_CD, A.DEPT_NM,B.EMP_CD, B.EMP_NM ';
        query = query + 'FROM CM003M01 A, CM004M01 B ';
        query = query + 'WHERE A.DEPT_CD = B.DEPT_CD ';
        query = query + 'AND B.EMP_RE_DT IS NULL ';
        query = query + 'AND A.USE_GB = 0 ';
        query = query + ') A GROUP BY A.DEPT_CD, A.DEPT_NM ';

        var query2 = '';
        query2 = "SELECT A.DEPT_CD DEPT_CD, A.DEPT_NM DEPT_NM,B.EMP_CD EMP_CD, B.EMP_NM EMP_NM, B.EMP_SEX ";
        query2 = query2 + 'FROM CM003M01 A, CM004M01 B ';
        query2 = query2 + 'WHERE A.DEPT_CD = B.DEPT_CD ';
        query2 = query2 + 'AND B.EMP_RE_DT IS NULL ';
        query2 = query2 + 'AND A.DEPT_CD = @ID ';

        return global.pool.request()
        .query(query)
        .then(async result => {
            var len = result.recordset.length;

            for(var i=0; i<len; i++){
                item = new Object();

                item.id    = result.recordset[i].DEPT_CD;
                item.label = result.recordset[i].DEPT_NM;
                
                item.children = new Array();

                var id = result.recordset[i].DEPT_CD;
                await global.pool.request()
                .input('ID', id)
                .query(query2)
                .then(result => {
                    var len2 = result.recordset.length;
                    
                    

                    for(var j=0; j<len2; j++){
                        var c_item = new Object();
                        var img = ''
                        
                        if(result.recordset[j].EMP_SEX == 1){
                            img = '🙍‍♂️';
                        }else{
                            img = '👱‍♀️';
                        }
                        c_item.id    = result.recordset[j].EMP_CD;
                        c_item.label = result.recordset[j].EMP_NM + img;
                        item.children.push(c_item);
                    }
                })

                userList.push(item);
            }
            
            //console.log(menuData);

            res.json(userList);
            res.end();     
        });
};