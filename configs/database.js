const mysql = require("mysql2/promise");

module.exports.connection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MY_SQL_USER_NAME,
            password: process.env.MY_SQL_PASSWORD,
            database: process.env.DATABASE_NAME,
            multipleStatements: true,
        })
        // console.log(connection);
        return connection;
    } catch (error) {
        console.log(error);
    }


}
