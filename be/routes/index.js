// routes/index.js

module.exports = function(app)
{
    sql.connect(config).then(pool => {
        // ===================================================== GET TOKEN ============================================================
        app.post('/api/members/auth-token', async function(req, res){
            var data = new Object();

            const jwt = require('jsonwebtoken');
            const secret = 'yooyoung';
            var token = '';

            const id = req.body.username;
            const pw = req.body.password;
            
            console.log('GET ToKen API Start~');
            // 관리자인 경우 
            if (id === 'admin') {
                if(pw === '@yoo6114'){
                    token = jwt.sign(id,secret);
                
                    data = new Object();
                    data = { 
                        key: token,
                        user: {
                            emp_cd: 'admin', emp_nm: '시스템관리자', dept_cd: '10050000', dept_nm: '전산팀'	
                        }
                    }
                }
                else{
                    // 관리자 PW가 틀렸을 경우
                    return res.status(401).json({ message: 'Bad credentials' })
                }
            }
            // 일반 사용자인 경우
            else{
                await pool.request()
                .input('ID', id)
                .input('PW', pw)
                .execute('DASH_LOGIN')
                .then(result => {
                    if (result.recordset.length === 0) {
                        res.status(401).json({ message: 'Bad credentials' })
                    }
                    else {
                        token = jwt.sign(id,secret);
                        data = new Object();
                        data.key = token;
                        data.user = result.recordset[0];
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
            }
            
            
            await pool.request()
            .input('TOKEN', data.key)
            .query('SELECT * FROM DASH_TOKEN WHERE TOKEN = @TOKEN')
            .then(async result => {
                if(result.recordset.length === 0){
                    await pool.request()
                    .input('TOKEN', data.key)
                    .input('ID', id)
                    .query('INSERT INTO DASH_TOKEN(TOKEN,ID) VALUES ( @TOKEN, @ID)')
                    .catch(err => {
                        console.log(err.message);
                    })
                }
            })
            .catch(err => {
                console.log(err.message);
            })

            res.json(data);
            res.end();
        });
        // ==============================================================================================================================
        // ===================================================== TOKEN GET PROFILE ======================================================
        app.get('/api/members/profile', function(req, res){
            var authorization = req.headers.authorization;
            var token_array = authorization.split(' ');
            var token = token_array[1];
            const jwt = require('jsonwebtoken');
            const secret = 'yooyoung';
            
            console.log('GET Profile API Start~');
            try {
                var id = jwt.verify(token, secret);

                if(id === 'admin'){
                    return res.json({
                        emp_cd: 'admin', emp_nm: '시스템관리자', dept_cd: '10050000', dept_nm: '전산팀'	
                    })
                }

                var query     = 'SELECT A.ID AS emp_cd, B.EMP_NM AS emp_nm, C.DEPT_CD AS dept_cd, C.DEPT_NM AS dept_nm ' ;
                query = query + 'FROM DASH_TOKEN A ';
                query = query + 'LEFT JOIN CM004M01 B ON A.ID = B.EMP_CD ';
                query = query + 'LEFT JOIN CM003M01 C ON B.DEPT_CD = C.DEPT_CD ';
                query = query + 'WHERE A.ID = @ID ';

                
                return pool.request()
                .input('ID',id)
                .query(query)
                .then(result => {
                    if(result.recordset.length == 0){
                        res.status(401).json({ message: 'Not user' })    
                    }
                    else{
                        res.json(result.recordset[0])
                    }
                })
                .catch(err => {
                    res.status(401).json({ message: 'DASH_TOKEN SQL ERROR' })
                })
            }catch(err){
                res.sendStatus(403);
            }
        });
        // ==============================================================================================================================

        // ===================================================== USER  LIST  ============================================================
        app.get('/api/getuserlist', function(req, res){

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

            return pool.request()
            .query(query)
            .then(async result => {
                var len = result.recordset.length;

                for(var i=0; i<len; i++){
                    item = new Object();

                    item.id    = result.recordset[i].DEPT_CD;
                    item.label = result.recordset[i].DEPT_NM;
                    
                    item.children = new Array();

                    var id = result.recordset[i].DEPT_CD;
                    await pool.request()
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
        });
        // ==============================================================================================================================

        // ===================================================== DASH  MENU  ============================================================
        app.get('/api/getmenu/:id', function(req, res){

            
            var id = req.params.id;
            var menuData = new Array();
            var menu = new Object();
            var menu_h = new Object();
            var menu_d_temp = new Object();

            var query = '';

            if(id === 'admin'){
                query = 'SELECT A.NAME AS NAME, A.PATH AS PATH FROM DASH_MENU A LEFT JOIN DASH_MENU_AUTH B ON A.ID = B.PGID WHERE A.P_ID = @PGID GROUP BY A.ID,A.NAME,A.PATH';
            }
            else{
                query = 'SELECT A.NAME AS NAME, A.PATH AS PATH FROM DASH_MENU A LEFT JOIN DASH_MENU_AUTH B ON A.ID = B.PGID WHERE A.P_ID = @PGID AND B.EMP_CD = @EMP_CD';
            }
            
            console.log('GET MENU API Start~');

            return pool.request()
            .query('SELECT ID,NAME,ICON FROM DASH_MENU WHERE LV = 0 ORDER BY ID')
            .then(async result => {
                var len = result.recordset.length;

                for(var i=0; i<len; i++){
                    menu = new Object();
                    menu_h = new Object();
                    

                    menu_h.name = result.recordset[i].NAME;
                    menu_h.icon = result.recordset[i].ICON;

                    menu.header = new Object();
                    menu.header = menu_h;

                    menu.detail = new Array();
                    
                    var pgid = result.recordset[i].ID;
                    await pool.request()
                    .input('EMP_CD', id)
                    .input('PGID', pgid)
                    .query(query)
                    .then(result => {
                        
                        
                        var len2 = result.recordset.length;
                        
                        for(var j=0; j<len2; j++){
                            menu_d_temp = new Object();
                            menu_d_temp.name = result.recordset[j].NAME;
                            menu_d_temp.path = result.recordset[j].PATH;
                            menu.detail.push(menu_d_temp)
                        }
                        menuData.push(menu);
                    })
                }
                
                //console.log(menuData);

                res.json(menuData);
                res.end();     
            });
        });
        // ==============================================================================================================================

        // ===================================================== GET DASHBOARD DATA =====================================================
        app.get('/api/dashmenu/:type', function(req, res){
            
            var salesData = new Object();
            var series = new Array();
            var serie = new Object();
            var data = new Array();
            var tableData = new Array();
         
            return pool.request()
            .input('TYPE', req.params.type)
            .execute('DASH_TEST')
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

                pool.request()
                .input('TYPE', type)
                .execute('DASH_TEST2')
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

                    res.json(salesData);
                    res.end();
                });    
            });
        });
        // ===========================================================END=================================================================



        // ===================================================== ADMIN SELECT MENU ============================================================
        app.get('/api/a_selmenu', function(req, res){
            
            var menuData = new Array();
            var menu_h = new Object();

            console.log('Start a_selmanu!!');

            var query     = "SELECT (" ;
                query = query + "SELECT RTRIM(ID) id,lv,name, ";
                query = query + "CASE WHEN PATH IS NULL THEN '' ELSE PATH END AS path, ";
                query = query + "CASE WHEN ICON IS NULL THEN '' ELSE ICON END AS icon, ";
                query = query + "CASE WHEN P_ID IS NULL THEN '' ELSE RTRIM(P_ID) END AS p_id ";
                query = query + "FROM DASH_MENU ORDER BY ID FOR JSON PATH) AS menu ";


            return pool.request().query(query)
            .then(async result => {
                
                //var len = result.recordset.length;

                //for(var i=0; i<len; i++){
                //    menu_h = new Object();

                //    menu_h.id   = result.recordset[i].ID;
                //    menu_h.lv   = result.recordset[i].LV;
                //    menu_h.name = result.recordset[i].NAME;
                //    menu_h.path = result.recordset[i].PATH;
                //    menu_h.icon = result.recordset[i].ICON;
                //    menu_h.p_id = result.recordset[i].P_ID;

                //    menuData.push(menu_h);
                //}
                

                //res.json(menuData);
                res.send(result.recordset[0].menu);
                res.end();     
            });
        });
        // ==============================================================================================================================

        // ===================================================== ADMIN GET MENUTREE =====================================================
        app.get('/api/getMenutree', function(req, res){
            var menuData = new Array();
            var item = new Object();
            var child = new Array();

            var query = '';

            query = "SELECT RTRIM(ID) ID,NAME,ICON FROM DASH_MENU WHERE LV = 0 ";
            
            var query2 = '';
            query2 = "SELECT RTRIM(ID) ID,NAME,ICON FROM DASH_MENU WHERE P_ID = @P_ID ";

            return pool.request()
            .query(query)
            .then(async result => {
                var len = result.recordset.length;

                for(var i=0; i<len; i++){
                    item = new Object();

                    item.id    = result.recordset[i].ID;
                    item.text  = result.recordset[i].NAME;
                    item.icon  = result.recordset[i].ICON;
                    item.opened = true;
                    item.selected = false;

                    item.children = new Array();

                    var id = result.recordset[i].ID;
                    
                    await pool.request()
                    .input('P_ID', id)
                    .query(query2)
                    .then(result => {
                        var len2 = result.recordset.length;

                        for(var j=0; j<len2; j++){
                            var c_item = new Object();
                            
                            c_item.id    = result.recordset[j].ID;
                            c_item.text = result.recordset[j].NAME;
                            c_item.icon = 'ni ni-app';
                            item.selected = false;
                            item.children.push(c_item);
                        }
                    })

                    menuData.push(item);
                }

                res.json(menuData);
                res.end();     
            });
        });
        // ==============================================================================================================================

        // ===================================================== ADMIN AUTH USER LIST ===================================================
        app.get('/api/a_authuser/:id', function(req, res){
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
        // ==============================================================================================================================

        // ===================================================== ADMIN SELECT MENU ============================================================
        app.get('/api/a_selmenu', function(req, res){
            
            var menuData = new Array();
            var menu_h = new Object();

            console.log('Start a_selmanu!!');

            var query     = "SELECT (" ;
                query = query + "SELECT RTRIM(ID) id,lv,name, ";
                query = query + "CASE WHEN PATH IS NULL THEN '' ELSE PATH END AS path, ";
                query = query + "CASE WHEN ICON IS NULL THEN '' ELSE ICON END AS icon, ";
                query = query + "CASE WHEN P_ID IS NULL THEN '' ELSE RTRIM(P_ID) END AS p_id ";
                query = query + "FROM DASH_MENU ORDER BY ID FOR JSON PATH) AS menu ";


            return pool.request().query(query)
            .then(async result => {
                
                res.send(result.recordset[0].menu);
                res.end();     
            });
        });
        // ==============================================================================================================================

        // ===================================================== MENU INSERT ============================================================
        app.post('/api/a_inmenu', async function(req, res){

            console.log('a_inmenu api !');
        
            await pool.request()
            .input('ID', req.body.id)
            .input('LV', req.body.lv)
            .input('NAME', req.body.name)
            .input('PATH', req.body.path)
            .input('ICON', req.body.icon)
            .input('P_ID', req.body.p_id)
            .query('INSERT INTO DASH_MENU(ID,LV,NAME,PATH,ICON,P_ID) VALUES ( @ID, @LV, @NAME, @PATH, @ICON, @P_ID )')
            .then( res.end())
            .catch(err => {
                console.log(err.message);
            })
        });
        // ==============================================================================================================================

        // ===================================================== MENU UPDATE ============================================================
        app.post('/api/a_upmenu', async function(req, res){
            console.log('a_upmenu api !');
        
            await pool.request()
            .input('LV', req.body.lv)
            .input('NAME', req.body.name)
            .input('PATH', req.body.path)
            .input('ICON', req.body.icon)
            .input('P_ID', req.body.p_id)
            .input('ID', req.body.id)
            .query('UPDATE DASH_MENU SET LV=@LV, NAME=@NAME, PATH=@PATH, ICON=@ICON, P_ID=@P_ID WHERE ID=@ID')
            .then( res.end())
            .catch(err => {
                console.log(err.message);
            })
        });
        // ==============================================================================================================================
        // ===================================================== MENU DELETE ============================================================
        app.post('/api/a_delmenu', async function(req, res){
            console.log('a_delmenu api !');
        
            await pool.request()
            .input('ID', req.body.id)
            .query('DELETE DASH_MENU WHERE ID=@ID')
            .then( res.end())
            .catch(err => {
                console.log(err.message);
            })
        });
        // ==============================================================================================================================
            
        // ===================================================== SET USER AUTH ==========================================================
        app.post('/api/a_setauth', async function(req, res){
            console.log('a_setauth api !');

            var pgid = req.body.pgid;
            var users = req.body.users;
            var len = users.length;

            for(var i=0; i<len; i++){
                await pool.request()
                .input('EMP_CD', users[i])
                .input('PGID', pgid)
                .query("DELETE DASH_MENU_AUTH WHERE EMP_CD = RTRIM(@EMP_CD) AND PGID = @PGID ")
                .catch(err => {
                    console.log(err.message);
                })

                await pool.request()
                .input('EMP_CD', users[i])
                .input('PGID', pgid)
                .query("INSERT INTO DASH_MENU_AUTH VALUES (RTRIM(@EMP_CD),@PGID,'U','SYSTEM',1,1,1,1,1,0)")
                .catch(err => {
                    console.log(err.message);
                })
            }

            res.end();
        });
        // ==============================================================================================================================
        // ===================================================== AUTH DELETE ============================================================
        app.post('/api/a_delauth', async function(req, res){
            console.log('a_delauth api !');
            
            await pool.request()
            .input('EMP_CD', req.body.emp_cd)
            .input('PGID', req.body.pgid)
            .query('DELETE DASH_MENU_AUTH WHERE EMP_CD = @EMP_CD AND PGID = @PGID ')
            .then( res.end())
            .catch(err => {
                console.log(err.message);
            })
        });
        // ==============================================================================================================================

    });
}
