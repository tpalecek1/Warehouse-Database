var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.use('/', express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3275);
app.use(cors());
app.set('mysql', mysql);
app.use('/warehouse', require('./warehouse.js'));
app.use('/product', require('./product.js'));
app.use('/customer', require('./customer.js'));
app.use('/driver', require('./driver.js'));
app.use('/order', require('./order.js'));
app.use('/warehouse_product', require('./warehouse_product.js'));
app.use('/index', require('./index.js'));

app.get('/', function(req, res, next){
	res.render('home');
	});
	
	app.use(express.static('public'));
	
	app.listen(app.get('port'), function(){
	  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
	});
