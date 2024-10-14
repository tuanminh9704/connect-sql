const employeeRoutes = require("./employee.route");

module.exports = (app) => {
    app.use('/employees', employeeRoutes);
}
