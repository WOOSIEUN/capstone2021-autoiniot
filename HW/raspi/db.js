var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '192.168.0.2',
	port: 3306,
	user: 'root',
	password: '',
	database: 'autoinven'
});
connection.connect();

module.exports = connection;
