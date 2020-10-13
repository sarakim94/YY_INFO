exports.data = function(req, res) {
    sql.close();
    sql.connect(config).then(pool => {
        var id = req.params.id;

        var query     = "SELECT (" ;
            query = query + "SELECT RTRIM(B.EMP_CD) emp_cd, RTRIM(C.DEPT_NM) dept_nm, RTRIM(B.EMP_NM) emp_nm FROM DASH_MENU_AUTH A " ;
            query = query + "LEFT JOIN CM004M01 B ON A.EMP_CD = B.EMP_CD  ";
            query = query + "LEFT JOIN CM003M01 C ON B.DEPT_CD = C.DEPT_CD ";
            query = query + "WHERE A.PGID = @ID ORDER BY B.EMP_CD FOR JSON PATH) AS result ";

        return pool.request()
        .input('ID', id)
        .query(query)
        .then(async result => {
            res.send(result.recordset[0].result);
            res.end();     
        });
    });
};