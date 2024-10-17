const { query } = require("express");
const connection = require("../configs/database");
const randomMockData = require("../helpers/randomMockData");
const { get } = require("../routes/employee.route");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();



module.exports.index = async (req, res) => {
    try {
        const allEmployees = await prisma.employees.findMany();
        res.json({
            code: 200,
            message: "Success!",
            data: allEmployees
        })
    } catch (error) {
        res.status(500),json({
            code: 500,
            message: "Error!",
            error: error,
        })
    }

}

module.exports.insert = async (req, res) => {
    try {
        const employees = randomMockData.genarateMockEmployees(3);
        const insertEmployees = await prisma.employees.createMany({
            data: employees
        })
        res.json({
            code: 200,
            message: "Success!",
            data: insertEmployees
        })

    } catch (error) {
        res.json({
            code: 500,
            message: "Error!",
            error: error
        })
    }

}

module.exports.transferMoney = async (req, res) => {
    try {
        const userId = req.params.id;
        const employee = randomMockData.genarateMockEmployees(1)[0];
        const money = 500;
        const employeeRecord = await prisma.employees.findMany({
            where: {
                employee_id: userId
            }
        })
        const transaction = prisma.$transaction( async (prisma)  => {
            //insert 1 employee
            const insertNewEmployee = await prisma.employees.create({
                data: employee,
            })
    
            const employeeTranfer = await prisma.employees.update({
                where: {
                    employee_id: userId,
                },
                data: {
                    salary: (employeeRecord[0].salary - money).toString(),
                }
            })
    
            const employeeRecive = await prisma.employees.update({
                where: {
                    employee_id: employee.employee_id
                },
                data: {
                    salary: (employee.salary + money).toString(),
                }
            })
        })

        res.json({
            code: 200,
            message: "Transfer success!"
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Transfer fail!",
            error: error
        })
    }
   

    
}

module.exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeDelete = await prisma.employees.delete({
            where: {
                employee_id: employeeId
            }
        })
        res.json({
            code: 200,
            message: "Success!",
            data: employeeDelete
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error!",
            error: error
        })
    }
}
















