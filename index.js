const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 3000;

const router = require("./routes/index.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

