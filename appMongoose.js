const express = require("express")
const mongoose = require("mongoose")
const routes = require("./router")
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

mongoose.connect(
  "mongodb://localhost:27017/Trab-1-Chat",
  {
    useNewUrlParser: true
  }
)

app.use("/api", routes)

app.listen(3000)