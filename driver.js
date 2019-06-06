module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getDriver(res, mysql, context, complete){
        mysql.pool.query("SELECT id, firstName, lastName, currCity, currState FROM Driver", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.driver = results;
            context.jsscripts = ["driverJS.js","deleteDriver.js"];
            complete();
        });
    };

    //Display all drivers on driver page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["static.js"];
       // context.jsscripts = ["deleteDriver.js"];
	var mysql = req.app.get('mysql');
        getDriver(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('driver', context);
            }
        }
    });

//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body)
        if(req.body.insert){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Driver (firstName, lastName, currCity, currState) VALUES (?,?,?,?)";
            var inserts = [req.body.firstName, req.body.lastName, req.body.currCity, req.body.currState];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/driver');
                }
            });
        }
        else if(req.body.select){
            var mysql = req.app.get('mysql');
            var sql = "SELECT  id, firstName, lastName, currCity, currState FROM Driver";
            var inserts = {};
            if(req.body.searchVal != ''){
                sql += " WHERE " + req.body.searchType + " LIKE (?)";
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
                    context.driver  = results;
                    context.jsscripts = ["driverJS.js"];
                    res.render('driver', context);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE Driver SET firstName = ?, lastName = ?, currCity = ?, currState = ? WHERE id = ?";
            var inserts = [req.body.firstName, req.body.lastName, req.body.currCity, req.body.currState, req.body.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/driver');
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
	var sql = "DELETE FROM Driver WHERE id = ?";
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
