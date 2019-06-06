module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getWarehouse_product(res, mysql, context, complete, query, inserts){
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.warehouse_product = results;
            context.jsscripts = ["warehouse_productJS.js", "deleteWarehouse_Product.js"];
            complete();
        });
    };
    //Display all customers on customer page
    router.get('/', function(req, res){
        console.log(req.query);
        var callbackCount = 0;
        var context = {};
        context.whID = [req.query.whID];
        context.jsscripts = ["warehouse_productJS.js"];
        var query =  "SELECT  warehouseID, productID, quantity FROM Warehouse_Product WHERE warehouseID = (?)";
        var inserts = [req.query.whID];
        var mysql = req.app.get('mysql');
        getWarehouse_product(res, mysql, context, complete, query, inserts);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('warehouse_product', context);
            }

        }
    });

//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body);
        if(req.body.addProduct){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Warehouse_Product (warehouseID, productID, quantity) VALUES (?,?,?)";
            var inserts = [req.body.warehouseID, req.body.productID, req.body.quantity];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/warehouse_product?whID='+req.body.warehouseID);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE Warehouse_Product SET quantity = ? WHERE warehouseID = ? AND productID = ?";
            var inserts = [req.body.quantity, req.body.warehouseID, req.body.productID];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/warehouse_product?whID='+req.body.warehouseID);
                }
            });
        }
        else{
            return;
        }
    });
    
router.delete('/:id', function(req,res){
	//	console.log("calling delete");
	//console.log(req.params.id);
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM Warehouse_Product WHERE id = ?";
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
