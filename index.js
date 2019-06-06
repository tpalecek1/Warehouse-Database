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
            complete();
        });
    };
    //Display all customers on customer page
    router.get('/', function(req, res){
        res.render('index');
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
                    res.redirect('warehouse');
                }
            });
        }
    });
    return router;
}();
