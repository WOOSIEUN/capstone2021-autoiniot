var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    post: 3306,
    user: 'root',
    password: '',
});
connection.connect();

// db, 테이블 없는 경우
connection.query(`CREATE DATABASE IF NOT EXISTS autoinven;`);
connection.query(`USE autoinven;`);
connection.query(`
            CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(21) NOT NULL,
            password VARCHAR(17) NOT NULL,
            uname VARCHAR(11) NOT NULL,
            birthday DATE NOT NULL,
            gender VARCHAR(2) NOT NULL,
            email VARCHAR(50),
            phone VARCHAR(15) NOT NULL,
            PRIMARY KEY (id)
            );
        `);
connection.query(`
            CREATE TABLE IF NOT EXISTS warehouse (
            rfid VARCHAR(8) NOT NULL,
            id VARCHAR(21) NOT NULL,
            name VARCHAR(30),
            num INT(11),
            received TINYINT(1),
            picture VARCHAR(30),
            PRIMARY KEY (rfid),
            FOREIGN KEY (id) REFERENCES users(id)
            );
        `);
connection.query(`
            CREATE TABLE IF NOT EXISTS monitor (
            time TIMESTAMP NOT NULL,
            id VARCHAR(21) NOT NULL,
            temp TINYINT(1) NOT NULL,
            humid TINYINT(1) NOT NULL,
            fire TINYINT(1) NOT NULL,
            gas TINYINT(1) NOT NULL,
            PRIMARY KEY (time),
            FOREIGN KEY (id) REFERENCES users(id)
            );
        `);

module.exports = connection;
