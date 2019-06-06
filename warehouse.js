module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getWarehouse(res, mysql, context, complete){
        mysql.pool.query("SELECT  id, address, city, state, size FROM Warehouse", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.warehouse = results;
            context.jsscripts = ["warehouseJS.js", "deleteWarehouse.js"];
            complete();
        });
    };   

    //Display all warehouses on warehouse page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["static.js"];
        var mysql = req.app.get('mysql');
        getWarehouse(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('warehouse', context);
            }

        }
    });

//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body);
        if(req.body.insert){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Warehouse (address, city, state, size) VALUES (?,?,?,?)";
            var inserts = [req.body.address, req.body.city, req.body.state, req.body.size];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/Warehouse');
                }
            });
        }
        else if(req.body.select){
            var mysql = req.app.get('mysql');
            var sql = "SELECT  id, address, city, state, size FROM Warehouse";
            var inserts = {};
            if(req.body.searchVal != ''){
                sql += " WHERE " + req.body.searchType + " = (?)";
                var inserts = [req.body.searchVal];
            }
            console.log(sql);
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    var context = {};
                    context.warehouse  = results;
                    context.jsscripts = ["warehouse.js"];
                    res.render('warehouse', context);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE Warehouse SET address = ?, city = ?, state = ?, size = ? WHERE id = ?";
            var inserts = [req.body.address, req.body.city, req.body.state, req.body.size, req.body.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/warehouse');
                }
            });
        }
        else{
            return;
        }
    });
    
router.delete('/:id', function(req,res){
	//	console.log("calling delete");
	console.log(req.params.id);
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM Warehouse WHERE id = ?";
	var inserts = [req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}
	});
});

	return router;
}();
