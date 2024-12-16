const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

const dbConnect = require('./config/db')
const routes = require('../src/routes/api/index')

const app = express();
dotenv.config()
dbConnect();

const HOST = process.env.HOST
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(morgan("dev"))
app.get("/", (req, res) => {
 res.status(200).json({msg:"⏳ Server is running"})
})
//c
app.use("/api", routes)

app.listen(PORT, console.log(`⏳ Server is Running at https://${HOST}/${PORT}`))

