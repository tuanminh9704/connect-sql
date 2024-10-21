const employeeRoutes = require("./employee.route");

module.exports = (app) => {
    // app.use();
    app.use('/employees', employeeRoutes);
}
