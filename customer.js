module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomer(res, mysql, context, complete){
        mysql.pool.query("SELECT  id, firstName, lastName, address, city, state FROM Customer", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            context.jsscripts = ["customerJS.js", "deleteCustomer.js"];
            complete();
        });
    };
    //Display all customers on customer page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {}; 
       // context.jsscripts = ["deleteCustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customer', context);
            }

        }
    });

//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body)
        if(req.body.insert){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Customer (firstName, lastName, address, city, state) VALUES (?,?,?,?,?)";
            var inserts = [req.body.firstName, req.body.lastName, req.body.address, req.body.city, req.body.state];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/customer');
                }
            });
        }
        else if(req.body.select){
            var mysql = req.app.get('mysql');
            var sql = "SELECT  id, firstName, lastName, address, city, state FROM Customer";
            var inserts = {};
            if(req.body.searchVal != ''){
                sql += " WHERE " + req.body.searchType + " LIKE ?";
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
                    context.customers  = results;
                    context.jsscripts = ["customerJS.js"];
                    res.render('customer', context);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE Customer SET firstName = ?, lastName = ?, address = ?, city = ?, state = ? WHERE id = ?";
            var inserts = [req.body.firstName, req.body.lastName, req.body.address, req.body.city, req.body.state, req.body.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/customer');
                }
            });
        }
        else{
            return;
        }
    });



/* Route to delete a person*/

router.delete('/:id', function(req,res){
	//	console.log("calling delete");
	console.log(req.params.id);
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM Customer WHERE id = ?";
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
