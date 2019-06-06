var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host            : 'classmysql.engr.oregonstate.edu',
	user            : 'cs340_montalvd',
	password        : '7142',
	database        : 'cs340_montalvd'
});
module.exports.pool = pool;
