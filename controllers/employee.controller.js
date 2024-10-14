const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@M972004abc",
    database: "company"
})

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });


module.exports.index = (req, res) => {
    const sql = "SELECT * FROM employees";
    con.query(sql, (err, result, fields) => {
        res.json({
            code: 200,
            message: "success!",
            data: result
        })
    })
}

module.exports.insert = (req, res) => {
    const items = req.body;
    let sql = "INSERT INTO employees VALUES ";
    for (const item of items) {
        sql += `('${item.employee_id}', '${item.name}', '${item.salary}', '${item.department_id}'), `;
    }
    sql = sql.substring(0, sql.length - 2) + ";";
    con.query(sql, (err, result, fields) => {
        
        res.json({
            code: 200,
            message: "success!",
        })
    })
      console.log(sql);
}
