const { query } = require("express");
const conn = require("../configs/database");
const randomMockData = require("../helpers/randomMockData");

module.exports.index = (req, res) => {
    const sql = "SELECT * FROM employees ?";
    conn.query(sql, (err, result, fields) => {
        if(err){
            throw err;
        }
        res.json({
            code: 200,
            message: "success!",
            data: result
        })
    })
}

module.exports.insert = (req, res) => {
    const employees = randomMockData.genarateMockEmployees(10);
    const values = employees.map(item => [item.employee_id, item.name, item.salary.toString(), item.department_id]);
    let sql = "INSERT INTO employees (employee_id, name, salary, department_id) VALUES ?";
    for (const employee of employees) {
        sql += `('${employee.employee_id}', '${employee.name}', '${employee.salary}', '${employee.department_id}'), `;
    }
    sql = sql.substring(0, sql.length - 2) + ";";
    conn.query(sql, [values], (err, result, fields) => {
        if(err){
            throw err;
        }
        res.json({
            code: 200,
            message: "success!",
        })
    })
      console.log(sql);
}

module.exports.transferMoney = async (req, res) => {
    const userId = req.params.id;
    const employee = randomMockData.genarateMockEmployees(1);
    const values = employee.map(item => [item.employee_id, item.name, item.salary.toString(), item.department_id]);
    let sql = "START TRANSACTION; INSERT INTO employees (employee_id, name, salary, department_id) VALUES ";
    const money = 6500;
    const sqlSelectEmployee = `SELECT * FROM employees WHERE employees.employee_id = '${userId}'; `; 
    
    sql += `('${employee[0].employee_id}', '${employee[0].name}', '${employee[0].salary}', '${employee[0].department_id}'), `;
    sql = sql.substring(0, sql.length - 2) + "; ";

    sql += `UPDATE employees SET employees.salary = employees.salary - ${money} WHERE employees.employee_id = '${userId}';
            UPDATE employees SET employees.salary = employees.salary + ${money} WHERE employees.employee_id = '${employee[0].employee_id}'; `;

    conn.query(sqlSelectEmployee, (err, result, fields) => {
        if(err){
            throw err;
        }
        else{
            if(parseInt(result[0].salary) >= money){
                sql += "COMMIT; "
                console.log("OK");
            }
            else{
                sql += " ROLLBACK; ";
            }
        }
        conn.query(sql, (err, result, fields) => {
            // if(err){
            //     throw err;
            // }
            res.json({
                code: 200,
                message: "success!"
            })
        })
    })

    // const {row} =  conn.query(sqlSelectEmployee);
    

}




