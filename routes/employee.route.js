const express = require("express")
const router = express.Router();

const controller = require("../controllers/employee.controller");

router.get("/", controller.index);

router.post("/insert", controller.insert);

router.post("/transfer/:id", controller.transferMoney);

router.delete("/delete/:id", controller.deleteEmployee);

module.exports = router;