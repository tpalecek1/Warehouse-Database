module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProduct(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, size FROM Product", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.product = results;
            context.jsscripts = ["productJS.js", "deleteProduct.js"];
            complete();
        });
    };

    //Display all products on product page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["static.js"];
        var mysql = req.app.get('mysql');
        getProduct(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('product', context);
            }

        }
    });


//Add customer to the stuff

    router.post('/', function(req, res){
        console.log(req.body);
        if(req.body.insert){
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Product (name, size) VALUES (?,?)";
            var inserts = [req.body.name, req.body.size];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/product');
                }
            });
        }
        else if(req.body.select){
            var mysql = req.app.get('mysql');
            var sql = "SELECT id, name, size FROM Product";
            var inserts = {};
            if(req.body.searchVal != ''){
                sql += " WHERE name LIKE (?)";
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
                    context.product  = results;
                    context.jsscripts = ["productJS.js"];
                    res.render('product', context);
                }
            });
        }
        else if(req.body.update){
            var mysql = req.app.get('mysql');
            var sql = "UPDATE Product SET name = ?, size = ? WHERE id = ?";
            var inserts = [req.body.name, req.body.size, req.body.id];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/product');
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
	//console.log(req.params.id);
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM Product WHERE id = ?";
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
