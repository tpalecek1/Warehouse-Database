module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrder(res, mysql, context, complete){
        mysql.pool.query("SELECT id, status, productID, quantity, customerID, DATE_FORMAT(targetDel, '%Y-%m-%d') AS targetDel, driverID FROM `Order`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            context.jsscripts = ["orderJS.js", "deleteOrder.js"];
            complete();
        });
    };

    //Display all orders on order page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["static.js"];
        var mysql = req.app.get('mysql');
        getOrder(res, mysql, context, complete);
        mysql.pool.query("SELECT Customer.id FROM Customer", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results;
            complete();
        });
        mysql.pool.query("SELECT Driver.id FROM Driver", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.driver = results;
            complete();
        });
        mysql.pool.query("SELECT Product.id FROM Product", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results;
            complete();
        });
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('order', context);
            }

        }
    });


//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body);
        if(req.body.insert){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO `Order` (status, productID, quantity, customerID, targetDel, driverID) VALUES (?,?,?,?,?,?)";
            var inserts = [req.body.status, req.body.productId, req.body.quantity, req.body.customerId, req.body.targetDel, req.body.driverId];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/Order');
                }
            });
        }
        else if(req.body.select){
            var mysql = req.app.get('mysql');
            var sql = "SELECT id, status, productID, quantity, customerID, DATE_FORMAT(targetDel, '%Y-%m-%d') AS targetDel, driverID FROM `Order`";
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
                    context.order = results;
                    context.jsscripts = ["orderJS.js", "deleteOrder.js"];
                    res.render('order', context);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE `Order` SET customerID = ?, status = ?, productID = ?, quantity = ?, targetDel = ?, driverID = ? WHERE id = ?";
            if(req.body.driverID == ""){
                req.body.driverID = null;
            }
            if(req.body.customerID == ""){
                req.body.customerID = null;
            }
            var inserts = [req.body.customerID, req.body.status, req.body.productID, req.body.quantity, req.body.targetDel, req.body.driverID, req.body.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/order');
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
	var sql = "DELETE FROM `Order` WHERE `Order`.id = ?";
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
