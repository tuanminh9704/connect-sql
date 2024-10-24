const express = require("express")
const router = express.Router();

const controller = require("../controllers/test.controller");

router.get("/t1", controller.test);

router.get("/t2", controller.test2);


module.exports = router;