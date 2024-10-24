const employeeRoutes = require("./employee.route");
const testRoute = require("./test.route");

module.exports = (app) => {
    // app.use();
    app.use('/employees', employeeRoutes);

    app.use("/test", testRoute);
}
