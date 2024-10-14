const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MY_SQL_USER_NAME,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.DATABASE_NAME
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;