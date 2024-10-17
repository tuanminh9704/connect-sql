const { query } = require("express");
const connection = require("../configs/database");
const randomMockData = require("../helpers/randomMockData");
const { get } = require("../routes/employee.route");


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

module.exports.insert = async (req, res) => {
    const conn = await connection.connection();
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
    const conn = await connection.connection();
    const userId = req.params.id;
    const employee = randomMockData.genarateMockEmployees(1);
    const values = employee.map(item => [item.employee_id, item.name, item.salary.toString(), item.department_id]);
    const money = 500;

    //start begintransaction
    await conn.beginTransaction();

    try {
        // insert new employee
        let sql = "INSERT INTO employees VALUES ";
        sql += `('${employee[0].employee_id}', '${employee[0].name}', '${employee[0].salary}', '${employee[0].department_id}'); `;
        const [newEmployee] = await conn.query(sql);
        
        //update money of employee tranfer money
        const sqlEmployeeTranfer = `UPDATE employees SET employees.salary = employees.salary - ? WHERE employees.employee_id = ?`;
        await conn.query(sqlEmployeeTranfer, [money, userId]);

        // update money of employee receive
        const employeeReceiveId = newEmployee.insertId.toString();
        const sqlEmployeeReceive = `UPDATE employees SET employees.salary = employees.salary - ? WHERE employees.employee_id = ?`;
        await conn.query(sqlEmployeeReceive, [money, employeeReceiveId]);

        res.json({
            code: 200,
            message: "Success!"
        })
        // commit 
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        // console.log(sql);
        res.json({
            code: 500,
            message: "Error!"
        })
    }
    
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        const conn = await connection.connection();
        const employeeId = req.params.id;
        console.log(employeeId);
        const sql = `DELETE FROM employees WHERE employee_id = ?`
        await conn.query(sql, [employeeId]);
        res.json({
            code: 200,
            message: "Success!",
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error!",
            error: error
        })
    }
}












