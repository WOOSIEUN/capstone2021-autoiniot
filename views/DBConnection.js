var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    post: 3306,
    user: 'root',
    password: '',
    database: 'autoinven'
});

module.exports = connection;