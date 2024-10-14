const conn = require("../configs/database");
const randomMockData = require("../helpers/randomMockData");

module.exports.index = (req, res) => {
    const sql = "SELECT * FROM employees";
    conn.query(sql, (err, result, fields) => {
        res.json({
            code: 200,
            message: "success!",
            data: result
        })
    })
}

module.exports.insert = (req, res) => {
    const employees = randomMockData.genarateMockEmployees(10);
    let sql = "INSERT INTO employees VALUES ";
    for (const employee of employees) {
        sql += `('${employee.employee_id}', '${employee.name}', '${employee.salary}', '${employee.department_id}'), `;
    }
    sql = sql.substring(0, sql.length - 2) + ";";
    conn.query(sql, (err, result, fields) => {
        
        res.json({
            code: 200,
            message: "success!",
        })
    })
      console.log(sql);
}
